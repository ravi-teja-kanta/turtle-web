'use client';

import { getUserDetailsFromPhoneNumber } from "@/app/checkout/NewAddress";
import { CartSummaryItemProps } from "@/app/checkout/page";
import { createTask } from "@/entities/dunzoManager";
import { getAllOrders, Order, orderRepo, OrderStatus, updateOrder, updateOrderStatus } from "@/entities/orderRepo";
import { getUserDetails } from "@/entities/userRepo";
import { toINR } from "@/utils/currency";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";



function getCartTotal(order: Order) {
    return order.cart.reduce((acc, curr) => acc + (curr.quantity * curr.cost), 0);
}


export default function Dashboard() {
    const [orders, setOrders] = useState<Order[]>([]);
    
    useEffect(() => {
        getAllOrders()
            .then((orders) => {
                console.log(orders)
                setOrders(orders);
            })
    }, [])
    return (
        (orders.length > 0) ? <div className="flex flex-col">
            <div className="text-xl p-4 border bg-gray-600 text-white font-semibold">Confirmed Orders</div>
            <div className="flex flex-wrap rounded p-4">
                {
                    orders.filter(o => o.status === "CUSTOMER_CONFIRMED").map(o => <ConfirmedOrderComponent key={o.id} {...o} />)
                }
            </div>
            <div className="text-xl p-4 border bg-gray-600 text-white font-semibold">Transit Orders</div>
            <div className="flex flex-wrap rounded p-4">
                {
                    orders.filter(o => o.status === "RESTAURANT_CONFIRMED_PAYMENT_RECEIVED").map(o => <TransitOrderComponent key={o.id} {...o} />)
                }
            </div>
        </div>
        : <div className="text-center mt-6 text-xl">You have no confirmed orders.</div>
    )
}

function ConfirmedOrderComponent(order: Order) {
    return (
        <div key={order.id} className="border p-2 w-1/3 flex flex-col my-2">
            <div className="font-semibold mx-auto">{order.id.split("-")[0]}</div>
                
            <div className="flex flex-col p-2 space-y-2 border-t">
                {/* <div className="flex justify-between text-sm mx-2">
                    <div>Item Name</div>
                    <div>Quantity</div>
                </div> */}
                {
                    order.cart.map(i => <CartItem key={i.id} {...i} />)
                }
            </div>
            <div className="flex mt-auto justify-between border-t pt-2">
                <div className="flex flex-col px-2">
                    <div className="text-xs my-auto ">Total:</div>
                    <div className="text-lg font-semibold">{toINR(order.cart.reduce((acc, curr) => acc + (curr.quantity * curr.cost), 0))}</div>
                </div>
                <div className="flex space-x-2">
                    <div className=" border py-2 px-4 bg-green-700 text-center text-white font-semibold rounded hover:cursor-pointer" onClick={async () => {await handlerPaymentDone(order)}}>
                        Payment Done
                    </div>
                    <div className=" border py-2 px-4 text-red-700  text-center border-red-700  font-semibold rounded hover:cursor-pointer">Cancel</div>
                </div>
            </div>
            
        </div>
    )
}

async function handlerPaymentDone(order: Order) {
    if (window.confirm(`Confirm that you received ${toINR(getCartTotal(order))}`)) {
        await createTaskInDunzo(order);
        location.reload()
    }
}
async function createTaskInDunzo(order: Order) {
    const userDetails = await getUserDetails(order.userId);
    const dunzoTaskResponse = (await createTask(order.id, userDetails))?.data;
    if (dunzoTaskResponse.state === "created") {
        await updateOrder({
            ...order,
            dunzoMetaData: dunzoTaskResponse,
            status: "RESTAURANT_CONFIRMED_PAYMENT_RECEIVED"
        })
        
    } else {
        alert("Unable to create task in dunzo." + dunzoTaskResponse.state)
    }
}

function CartItem(item: CartSummaryItemProps) {
    return (
        <div className="flex rounded space-x-2 mx-2 p-1 text-gray-600 font-medium">
            <div className="">{item.quantity}</div>
            <div className="text-gray-400">x</div>
            <div className="">{item.name}</div>
        </div>
    )
}

function TransitOrderComponent(order: Order) {
    async function handleButtonClick(status: OrderStatus) {
        await updateOrderStatus(order.id, status);
        location.reload();
    }
    return (
        <div className="border p-2 w-1/3 flex flex-col my-2 space-y-4">
                
                <div className="flex space-x-2 text-sm font-semibold">
                    <div>{order.dunzoMetaData.task_id}</div>
                </div>
                                    
            <div className="text-sm">
                Order Id: {order.id.split("-")[0]}
            </div>
            
            
            <div className="flex space-x-4 mt-4 justify-center ">
                <div className="p-1 border rounded text-center text-green-700 border-green-700 hover:cursor-pointer" onClick={async () => await handleButtonClick("ORDER_DELIVERED")}>
                    Delivered
                </div>
                <div className="p-1 border rounded text-center text-yellow-700 border-yellow-700 hover:cursor-pointer" onClick={async () => await handleButtonClick("DUNZO_CANCELLED")}>
                    Driver Cancelled
                </div>
                <div className="p-1 border rounded my-auto text-red-700 border-red-700 hover:cursor-pointer" onClick={async () => await handleButtonClick("RESTAURANT_CANCELLED")}>
                    Cancel
                </div>
            </div>
        </div>
    )
}
