import useLocalStorage from "@/utils/useLocalStorage";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Address, LatLong } from "./page";

type NewAddressProps = {
    hide: () => void,
    onSubmit: () => void
}

export default function NewAddress(props: NewAddressProps) {
    const {handleSubmit, register} = useForm();
    const [address, setAddress] = useLocalStorage<Address | undefined>("address", undefined);
    const [latLong, setLatLong] = useState<LatLong>();
    
    useEffect(() => {
        const location = window.navigator && window.navigator.geolocation
    
        if (location) {
            location.getCurrentPosition((position) => {
                
                setLatLong({
                geoLat: position.coords.latitude,
                geoLong: position.coords.longitude,
                })
            }, (error) => {
                    alert("Unable to get your location. Please give permission.")
            })
        }
    }, []);

    return (
        <div>
            <div className="absolute h-full w-full z-10 top-0 left-0 bg-gray-800 opacity-80" onClick={() => props.hide()}></div>
                <div className="absolute flex flex-col bottom-0 left-0 py-4 w-full bg-white z-10 px-4">
                    <div className="flex flex-col space-y-2">
                        <div className="font-semibold">Add New Address</div>
                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-2">
                            <input placeholder="Name of the receiver" {...register("name")} required className="border w-full p-2 p rounded" type={"text"} />
                            <input placeholder="Phone Number" {...register("phoneNumber")} required className="border w-full p-2 p rounded" type={"number"} />
                            <input placeholder="House / Flat / Floor No." {...register("line1")} defaultValue={address?.line1} required className="border w-full p-2 p rounded" type={"text"} />
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
    )

    function onSubmit(fields: any) {
        if (latLong) {
            setAddress((address) => {
                return {
                    ...address,
                    line1: fields["line1"] + '',
                    line2: fields["line2"] + '',
                    latLong,
                    city: fields["city"] + "",
                    pincode: fields["pincode"] + "",
                    nameOfReceiver: fields["name"] + "",
                    phoneNumber: fields["phoneNumber"] + ""
                }
            })
        }
        props.onSubmit()
    }
}