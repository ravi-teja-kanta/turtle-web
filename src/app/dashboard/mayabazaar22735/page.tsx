'use client';

import { CartSummaryItemProps } from "@/app/checkout/page";
import { toINR } from "@/utils/currency";

type Order = {
    orderId: string,
    cart: CartSummaryItemProps[],
    status: OrderStatus,
    dunzoTaskId: string,
}

type OrderStatus = "CUSTOMER_CONFIRMED" | "RESTAURANT_CONFIRMED_PAYMENT_RECEIVED" | "ORDER_PICKED_UP" | "ORDER_DELIVERED" | "DUNZO_CANCELLED" | "RESTAURANT_CANCELLED";

export default function Dashboard() {

    const orders: Order[] = [
        {
            orderId: "cb026548",
            cart: [
                {
                    id: "s",
                    name: "Chicken Biryani",
                    quantity: 2,
                    cost: 35
                }
            ],
            status: "CUSTOMER_CONFIRMED",
            dunzoTaskId: ""
        },
        {
            orderId: "3",
            cart: [
                {
                    id: "sr",
                    name: "Paneer Biryani",
                    quantity: 1,
                    cost: 400
                }
            ],
            status: "CUSTOMER_CONFIRMED",
            dunzoTaskId: ""
        },
        {
            orderId: "4",
            cart: [
                {
                    id: "sr",
                    name: "Paneer Biryani asjkdn u aiysgd  uagsd uasud gausdg audaygsduhya",
                    quantity: 1,
                    cost: 400
                },
                {
                    id: "sr",
                    name: "Upma",
                    quantity: 5,
                    cost: 50
                },
                {
                    id: "sr",
                    name: "Paneer Biryani asjkdn u aiysgd",
                    quantity: 1,
                    cost: 400
                },
                {
                    id: "sr",
                    name: "Upma",
                    quantity: 5,
                    cost: 50
                }
            ],
            status: "CUSTOMER_CONFIRMED",
            dunzoTaskId: ""
        },
        {
            orderId: "3",
            cart: [
                {
                    id: "sr",
                    name: "Paneer Biryani",
                    quantity: 1,
                    cost: 400
                }
            ],
            status: "CUSTOMER_CONFIRMED",
            dunzoTaskId: ""
        }
    ]
    
    return (
        <div className="flex flex-col">
            <div className="text-xl p-4 border bg-gray-600 text-white font-semibold">Confirmed Orders</div>
            <div className="flex flex-wrap rounded p-4">
                {
                    orders.filter(o => o.status === "CUSTOMER_CONFIRMED").map(o => <ConfirmedOrderComponent key={o.orderId} {...o} />)
                }
            </div>
            <div className="text-xl p-4 border bg-gray-600 text-white font-semibold">Orders in Transit</div>
            <div className="flex flex-wrap rounded p-4">
                {
                    orders.filter(o => o.status === "CUSTOMER_CONFIRMED").map(o => <TransitOrderComponent key={o.orderId} {...o} />)
                }
            </div>
            
        </div>
    )
}

function ConfirmedOrderComponent(order: Order) {
    return (
        <div key={order.orderId} className="border p-2 w-1/3 flex flex-col my-2">
            <div className="font-semibold mx-auto">#{order.orderId}</div>
                
            <div className="flex flex-col p-2 space-y-2">
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
                    <div className=" border py-2 px-4 bg-green-700 text-center text-white font-semibold rounded">Payment Done</div>
                    <div className=" border py-2 px-4 text-red-700  text-center border-red-700  font-semibold rounded">Terminate</div>
                </div>
                
            </div>
            
        </div>
    )
}

function CartItem(item: CartSummaryItemProps) {
    return (
        <div className="flex rounded justify-between mx-2 border-t p-1">
            <div className="w-2/3">{item.name}</div>
            {/* <div>x</div> */}
            <div className="font-bold my-auto mx-auto">{item.quantity}</div>
        </div>
    )
}

function TransitOrderComponent(order: Order) {

    return (
        <div className="border p-2 w-1/3 flex flex-col my-2">
            <div className="mx-auto font-semibold">#{order.orderId}</div>
            <div className="">
                Dunzo Details
            </div>
        </div>
    )
}
