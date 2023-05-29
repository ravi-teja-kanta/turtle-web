'use client';

import { toINR } from "@/utils/currency"
import useLocalStorage from "@/utils/useLocalStorage";
import { ArrowLeftIcon, ChevronDownIcon, CircleStackIcon, HomeIcon, HomeModernIcon, MapPinIcon, MinusIcon, PlusIcon, StopCircleIcon } from "@heroicons/react/24/solid"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import BillDetails from "./BillDetails";
import NewAddress, { getUserDetails } from "./NewAddress";
import axios from "axios";

type CheckoutProps = {
    
}

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
    phoneNumber: string,
    nameOfReceiver: string,
}

export type CartSummaryItemProps = {
    id?: string,
    name: string,
    cost: number,
    quantity: number
}


export default function CheckoutPage(props: CheckoutProps) {
    const [showNewAddressModal, setShowNewAddressModal] = useState(false);
    const [hasSelectedAddress, setHasSelectedAddress] = useState(false);
    const router = useRouter();
    const [address, setAddress] = useLocalStorage<Address | undefined>("address", undefined);
    const [userDetails, setUserDetails] = useLocalStorage<UserDetails | undefined>("userDetails", undefined);
    const [deliveryETA, setETA] = useState<number>();
    const [cannotDeliver, setCannotDeliver] = useState<string | undefined>(undefined);
    const [cart, setCart] = useLocalStorage<CartSummaryItemProps[]>("cart", []);
    
    useEffect(() => {
        if (address) {
            getQuoteFromDunzo(address)
                .then((d) => {
                    if (d.data.code) {
                        setCannotDeliver(d.data.message)
                    } else {
                        setETA(d.data.eta.dropoff)
                    }
                })
                .catch((e) => {

                })
        }
    }, [address])

    
    function postSubmit(address: Address, userDetails: UserDetails) {
        setShowNewAddressModal(false);
        setHasSelectedAddress(true);
        // window.location.reload();

        setAddress(address);
        setUserDetails(userDetails);
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
                            <div className=" w-1/2 py-2 text-center rounded font-semibold bg-green-700 text-white my-auto">
                                Proceed to Pay
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
                <NewAddress hide={() => setShowNewAddressModal(false)} onSubmit={(address, userDetails) => postSubmit(address, userDetails)} />
                // <div>
                //     <div className="absolute h-full w-full z-10 top-0 left-0 bg-gray-800 opacity-80" onClick={() => setShowNewAddressModal(false)} />
                //         <div className="absolute flex flex-col bottom-0 left-0 py-4 w-full bg-white z-10 px-4">
                //             <div className="flex flex-col space-y-2">
                //                 <div className="font-semibold">Add New Address</div>
                //                 <form onSubmit={handleSubmit(postSubmit)} className="flex flex-col space-y-2">
                //                     <input placeholder="Name of the receiver" {...register("name")} required className="border w-full p-2 p rounded" type={"text"} />
                //                     <input placeholder="House / Flat / Floor No." {...register("line1")} required className="border w-full p-2 p rounded" type={"text"} />
                //                     <input placeholder="Apartment / Area / Road" {...register("line2")} required className="border w-full p-2 p rounded" type={"text"} />
                //                     <div className="flex space-x-2">
                //                         <input placeholder="Pincode" {...register("pincode")} required className="border w-full p-2 p rounded" type={"number"} />
                //                         <input placeholder="City" {...register("city")} required className="border w-full p-2 p rounded" type={"text"} />
                //                     </div>
                //                     <button type={"submit"}  className="flex space-x-2 border py-2 text-white bg-green-700 justify-center rounded">
                //                         <div className="font-semibold">Confirm Address</div>
                //                     </button>
                //                 </form>
                //             </div>
                //         </div>
                // </div>
            }
            <div className="py-16"></div>
            
        </div>
    )

    function CartSummaryItem({name, cost, quantity}: CartSummaryItemProps) {
        return (
            <div className="flex justify-between">
                {/* <div className="mt-1 mr-2"><StopCircleIcon className="w-4 h-4 text-red-700"/></div> */}
                <div className="w-2/3 text-left my-auto text-sm">{`${name}`}</div>
                {/* <div className="flex h-fit rounded-md text-center border justify-between">
                    <div className="bg-green-700 text-white rounded-l" onClick={() => {setQuantity(quantity - 1); props.remove(props.id)}}><MinusIcon className="w-6 h-6 p-1" /></div>
                    <div className="px-2">{quantity}</div>
                    <div className="bg-green-700 text-white rounded-r" onClick={() => {setQuantity(quantity + 1); props.add(props.id)}}><PlusIcon className="w-6 h-6 p-1" /></div>
                </div> */}
                <div className="w-1/4 text-center text-gray-400 text-sm">{`x ${quantity}`}</div>
                <div className="w-1/4 text-right">{toINR(cost * quantity)}</div>
            </div>
        )
    }

    function getCartTotal() {
        return cart.reduce((acc, curr) => acc + (curr.quantity * curr.cost), 0)
    }

    
}

async function getQuoteFromDunzo(address: Address) {
    try {
        return await axios.post("/api/quote",
        {
            "pickup_details": [
                {
                    "lat": 12.927923,
                    "lng": 77.627106,
                    "reference_id": "pickup-ref"
                } 
            ],
            "drop_details": [{
                "lat": address.latLong.geoLat,
                "lng": address.latLong.geoLong,
                "reference_id": "ref35"
            }]
        })
    } catch(e) {
        throw Error("Dunzo get quote failed");
    }
    
}