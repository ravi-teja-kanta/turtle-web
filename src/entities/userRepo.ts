
import { Address } from "@/app/checkout/page";
import { buildBaseRepository } from "../lib/supabase/baseRepo";


export type User = {
    id: string,
    name: string,
    phoneNumber: string,
    address: Address
}
const userRepo = buildBaseRepository<User>("users");

export async function getUserDetails(userId: string) {
    return await userRepo.read(userId);
}