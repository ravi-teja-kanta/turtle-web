'use client';

import { toINR } from "@/utils/currency"
import { ArrowLeftIcon, CircleStackIcon, HomeIcon, HomeModernIcon, MapPinIcon, MinusIcon, PlusIcon, StopCircleIcon } from "@heroicons/react/24/solid"
import { useState } from "react";
import { useForm } from "react-hook-form"
type CheckoutProps = {
    
}

type LatLong = {
    geoLat: number,
    geoLong: number
}
type Address = {
    line1: string,
    line2: string,
    latLong: LatLong,
}
type DeliveryDetails = {
    phoneNumber: string,
    nameOfReceiver: string,
    address: Address
}

function a() {

}
export default function CheckoutPage(props: CheckoutProps) {
    const [showNewAddressModal, setShowNewAddressModal] = useState(false);
    const [hasSelectedAddress, setHasSelectedAddress] = useState(false);

    const {handleSubmit, register} = useForm()
    
    function onSubmit(p: any) {
        alert(JSON.stringify(p));
        setShowNewAddressModal(false);
        setHasSelectedAddress(true);
    }

    return (
        <div className="flex flex-col space-y-2">
            <div className="flex space-x-4 pb-2">
                <ArrowLeftIcon className="w-6 h-6 text-gray-500" />
                <div className=" font-semibold">Mayabazaar Restaurant</div>
            </div>
            <div className="border flex flex-col rounded-lg p-4 space-y-4">
                {/* <div className="font-semibold border-b border-dotted py-1">Cart</div> */}
                <div className="flex justify-between">
                    {/* <div className="mt-1 mr-2"><StopCircleIcon className="w-4 h-4 text-red-700"/></div> */}
                    <div className="w-2/3 text-left my-auto text-sm">Chicken Boneless Biriyani paneer Nanana</div>
                    <div className="w-1/4 text-center text-gray-400 text-sm my-auto">{"x 2"}</div>
                    <div className="w-1/4 text-right my-auto">{toINR(359)}</div>
                </div>
                <div className="flex justify-between">
                    {/* <div className="mt-1 mr-2"><StopCircleIcon className="w-4 h-4 text-green-700"/></div> */}
                    <div className="w-2/3 text-left my-auto text-sm">Chicken Boneless Biriyani</div>
                    <div className="w-1/4 text-center text-gray-400 text-sm my-auto">x2</div>
                    <div className="w-1/4 text-right my-auto">{toINR(359)}</div>
                </div>
                <div className="flex justify-between">
                    {/* <div className="mt-1 mr-2"><StopCircleIcon className="w-4 h-4 text-green-700"/></div> */}
                    <div className="w-2/3 text-left my-auto text-sm">Chicken Boneless Biriyani</div>
                    <div className="w-1/4 text-center text-gray-400 text-sm my-auto">x2</div>
                    <div className="w-1/4 text-right my-auto">{toINR(359)}</div>
                </div>
                <div className="flex justify-between">
                    {/* <div className="mt-1 mr-2"><StopCircleIcon className="w-4 h-4 text-green-700"/></div> */}
                    <div className="w-2/3 text-left my-auto text-sm">Chicken Boneless Biriyani</div>
                    <div className="w-1/4 text-center text-gray-400 text-sm my-auto">x2</div>
                    <div className="w-1/4 text-right my-auto">{toINR(359)}</div>
                </div>
                
                
            </div>
            <div className="flex flex-col border rounded-lg p-4 space-y-2">
                <div className="font-semibold border-b border-dotted py-1 mb-1">Bill Details</div>
                <div className="flex border-dotted space-x-2 justify-between text-gray-600">
                    <div className="text-sm ">Item Total </div>
                    <div className="my-auto">
                        {toINR(1765)}
                    </div>
                </div>
                <div className="flex border-dotted space-x-2 justify-between">
                    <div className="text-sm text-gray-600">Deliver Charges</div>
                    <div className="my-auto text-green-700 font-bold">
                        FREE
                    </div>
                </div>
                <div className="flex border-dotted space-x-2 justify-between">
                    <div className="text-sm text-gray-600">Packaging Charges</div>
                    <div className="my-auto text-green-700 font-bold">
                        FREE
                    </div>
                </div>
                <div className="flex space-x-2 pt-2 border-t border-dotted justify-between">
                    <div className="text-sm font-semibold">To Pay</div>
                    <div className="my-auto font-semibold">
                        {toINR(1765)}
                    </div>
                </div>
            </div>
            
            {
                hasSelectedAddress ?
                <div className="flex flex-col z-10 fixed bottom-0 left-0 w-full px-4 py-2">
                    <div className="flex border-t py-2 justify-between space-x-4">
                        <div className="flex flex-col">
                            <div className="text-xs font-semibold">Delivering To</div>
                            <div className=" text-gray-500 text-xs">Ravi, 32/1 Ganesh Street, anakapalli aprtments, somajiguda</div>
                        </div>
                        <div className="my-auto border p-1 rounded-lg text-xs text-green-700 border-green-700" onClick={() => {setShowNewAddressModal(true)}}>
                            change
                        </div>
                    </div>
                    <div className="flex py-2 border-t justify-between">
                        <div className="flex flex-col border-dotted  my-auto">
                            <div className="text-xs text-gray-600">Final Amount</div>
                            <div className="font-semibold text-xl">
                                {toINR(1765)}
                            </div>
                        </div>
                        <div className=" w-1/2 py-2 text-center rounded font-semibold bg-green-700 text-white my-auto">
                            Proceed to Pay
                        </div>
                    </div>
                </div>
                :
                <div className="flex border rounded-lg py-2 justify-center border-green-700 text-green-700 space-x-2" onClick={() => setShowNewAddressModal(true)}>
                    <PlusIcon className="w-5 h-5 my-auto" />
                    <div className="text-green-700">Add Address</div>
                </div>
            }
            

            {
                showNewAddressModal &&
                <div>
                    <div className="absolute h-full w-full z-10 top-0 left-0 bg-gray-800 opacity-80" onClick={() => setShowNewAddressModal(false)} />
                        <div className="absolute flex flex-col bottom-0 left-0 py-4 w-full bg-white z-10 px-4">
                            <div className="flex flex-col space-y-2">
                                <div className="font-semibold">Add New Address</div>
                                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-2">
                                    <input placeholder="Name of the receiver" {...register("name")} required className="border w-full p-2 p rounded" type={"text"} />
                                    <input placeholder="House / Flat / Floor No." {...register("line1")} required className="border w-full p-2 p rounded" type={"text"} />
                                    <input placeholder="Apartment / Area / Road" {...register("line2")} required className="border w-full p-2 p rounded" type={"text"} />
                                    <div className="flex space-x-2">
                                        <input placeholder="Pincode" {...register("pincode")} required className="border w-full p-2 p rounded" type={"number"} />
                                        <input placeholder="City" {...register("city")} required className="border w-full p-2 p rounded" type={"text"} />
                                    </div>
                                    <button type={"submit"}  className="flex space-x-2 border py-2 text-white bg-green-700 justify-center rounded">
                                        <div className="font-semibold">Confirm Address</div>
                                    </button>
                                </form>
                            </div>
                        </div>
                </div>
            }
            
            
        </div>
    )
}