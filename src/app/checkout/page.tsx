'use client';

import { toINR } from "@/utils/currency"
import useLocalStorage from "@/utils/useLocalStorage";
import { ArrowLeftIcon, ChevronDownIcon, CircleStackIcon, HomeIcon, HomeModernIcon, MapPinIcon, MinusIcon, PlusIcon, StopCircleIcon } from "@heroicons/react/24/solid"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import BillDetails from "./BillDetails";
import NewAddress, { getUserDetailsFromPhoneNumber } from "./NewAddress";
import axios from "axios";
import { getQuoteFromDunzo } from "@/entities/dunzoManager";
import { orderRepo } from "@/entities/orderRepo";
import { User } from "@/entities/userRepo";
import {v4 as uuid} from "uuid"


export type LatLong = {
    geoLat: number,
    geoLong: number
}
export type Address = {
    line1: string,
    line2: string,
    latLong: LatLong,
    city: string,
    pincode: string
}
export type UserDetails = {
    id?: string,
    phoneNumber: string,
    nameOfReceiver: string,
}

export type CartSummaryItemProps = {
    id?: string,
    name: string,
    cost: number,
    quantity: number
}


export default function CheckoutPage() {
    const [showNewAddressModal, setShowNewAddressModal] = useState(false);
    const router = useRouter();
    const [address, setAddress] = useLocalStorage<Address | undefined>("address", undefined);
    const [userDetails, setUserDetails] = useLocalStorage<UserDetails | undefined>("userDetails", undefined);
    const [deliveryETA, setETA] = useState<number>();
    const [cannotDeliver, setCannotDeliver] = useState<string | undefined>(undefined);
    const [cart, setCart] = useLocalStorage<CartSummaryItemProps[]>("cart", []);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        if (address) {
            let l: LatLong = {
                geoLat: 12.948500,
                geoLong: 77.627586
            }
            getQuoteFromDunzo(l)
                .then((d) => {
                    if (d.data.code) {
                        setCannotDeliver(d.data.message)
                    } else {
                        setETA(d.data.eta.dropoff)
                    }
                })
                .catch((e) => {
                    setCannotDeliver("Unable to deliver as of now.")
                })
        }
    }, [address])

    
    function postSubmit(user: User) {
        setShowNewAddressModal(false);

        setAddress(user.address);
        setUserDetails({
            id: user.id,
            nameOfReceiver: user.name,
            phoneNumber: user.phoneNumber
        });
    }
    
    
    return (
        <div className="flex flex-col space-y-2">
            <div className="flex space-x-4 pb-2" onClick={() => router.back()}>
                <ArrowLeftIcon className="w-6 h-6 text-gray-500" />
                <div className=" font-semibold">Mayabazaar Restaurant</div>
            </div>
            <div className="border flex flex-col rounded-lg space-y-4 p-4">
                {
                    cart.filter(i => i.quantity > 0).map(i => <CartSummaryItem key={i.id} {...i} />)
                }
            </div>
            <BillDetails total={getCartTotal()} />
            {
                (address !== undefined && userDetails !== undefined) ?
                <div className="flex flex-col z-10 fixed bg-white bottom-0 left-0 w-full px-4 py-2">
                    <div className="flex border-t py-2 justify-between space-x-4">
                        <div className="flex flex-col space-y-1">
                            {
                                (!cannotDeliver)?
                                <div className="flex">
                                    <div className="text-sm text-green-700 font-semibold">{deliveryETA} mins</div>
                                </div>
                                :
                                <div className="text-sm text-red-700 font-semibold">{cannotDeliver}</div>
                            }
                            
                            <div className=" text-gray-500 text-xs">{`${userDetails.nameOfReceiver}, ${address.line1}, ${address.line2}`}</div>
                        </div>
                        <div className="border my-auto px-2 rounded-lg text-xs text-green-700 border-green-700" onClick={() => {setShowNewAddressModal(true)}}>
                            change
                        </div>
                    </div>
                    {
                        !cannotDeliver && 
                        <div className="flex py-2 border-t justify-between">
                            <div className="flex flex-col border-dotted  my-auto">
                                <div className="text-xs text-gray-600">Final Amount</div>
                                <div className="font-semibold text-xl">
                                    {toINR(getCartTotal())}
                                </div>
                            </div>
                            <div className="flex space-x-2 border w-1/2 p-2 text-white bg-green-700 justify-center rounded" onClick={handleConfirm}>
                                {
                                    isLoading ? <div className="pointer-events-none">...loading</div>
                                    : <div className="font-semibold">Confirm Address</div>
                                }
                            </div>
                        </div>
                    }
                    
                </div>
                :
                <div className="flex border rounded-lg py-2 justify-center border-green-700 text-green-700 space-x-2" onClick={() => setShowNewAddressModal(true)}>
                    <PlusIcon className="w-5 h-5 my-auto" />
                    <div className="text-green-700">Add Address</div>
                </div>
            }
            

            {
                showNewAddressModal &&
                <NewAddress hide={() => setShowNewAddressModal(false)} onSubmit={(user) => postSubmit(user)} />
            }
            <div className="py-16"></div>
            
        </div>
    )

    async function handleConfirm() {
        setIsLoading(true);
        await orderRepo.insert({
            id: uuid(),
            userId: userDetails?.id!!,
            status: "CUSTOMER_CONFIRMED",
            cart
        });
        setCart([])
        alert("Your order has been confirmed. Mayabazaar will contact you in a few mins.")
        setIsLoading(false);
        router.push("/")
        
    }

    function CartSummaryItem({name, cost, quantity}: CartSummaryItemProps) {
        return (
            <div className="flex justify-between">

                <div className="w-2/3 text-left my-auto text-sm">{`${name}`}</div>                
                <div className="w-1/4 text-center text-gray-400 text-sm">{`x ${quantity}`}</div>
                <div className="w-1/4 text-right">{toINR(cost * quantity)}</div>
            </div>
        )
    }

    

    function getCartTotal() {
        return cart.reduce((acc, curr) => acc + (curr.quantity * curr.cost), 0)
    }

    
}