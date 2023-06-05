import { CartSummaryItemProps } from "@/app/checkout/page";
import { buildBaseRepository } from "@/lib/supabase/baseRepo";
import { supabase } from "@/lib/supabase/supabase";

export type Order = {
    id: string,
    userId: string,
    cart: CartSummaryItemProps[],
    status: OrderStatus,
    dunzoMetaData?: any,
}

export const orderRepo = buildBaseRepository<Order>("orders");

export type OrderStatus = "CUSTOMER_CONFIRMED" | "RESTAURANT_CONFIRMED_PAYMENT_RECEIVED" | "ORDER_PICKED_UP" | "ORDER_DELIVERED" | "DUNZO_CANCELLED" | "RESTAURANT_CANCELLED";

export async function updateOrderStatus(orderId: string, status: OrderStatus) {
    await orderRepo.updateById({
        id: orderId,
        status
    })
    
}

export async function updateOrder(order: Order) {
    await orderRepo.updateById({...order});
}

export async function getAllOrders() {
    const {data, error} =  await supabase.from<Order>("orders")
            .select("*")
            .or('status.eq.CUSTOMER_CONFIRMED,status.eq.RESTAURANT_CONFIRMED_PAYMENT_RECEIVED')
    if (error) {
        throw Error("Error in fetching all orders")
    }

    return data;
}