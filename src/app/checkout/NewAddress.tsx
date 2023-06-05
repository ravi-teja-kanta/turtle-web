import useLocalStorage from "@/utils/useLocalStorage";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Address, LatLong, UserDetails } from "./page";
import { supabase } from "../../lib/supabase/supabase";
import { User } from "@/entities/userRepo";


type NewAddressProps = {
    hide: () => void,
    onSubmit: (user: User) => void
}

export default function NewAddress(props: NewAddressProps) {
    const {handleSubmit, register, formState: { errors }} = useForm();
    const [address, setAddress] = useLocalStorage<Address | undefined>("address", undefined);
    const [latLong, setLatLong] = useState<LatLong>();
    const [userDetails, setUserDetails] = useLocalStorage<UserDetails | undefined>("userDetails", undefined);

    const [isLoading, setIsLoading] = useState<boolean>(false);

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
                            <input placeholder="Name of the receiver" defaultValue={userDetails?.nameOfReceiver} {...register("name")} required className="border w-full p-2 p rounded" type={"text"} />
                            {errors.phoneNumber && <div className="text-xs text-red-700">{"* Phone Number is 10 digits"}</div>}
                            <input placeholder="Phone Number" defaultValue={userDetails?.phoneNumber} {...register("phoneNumber", { validate: (n: number) => n.toString().length === 10 })} required className={`border w-full p-2 p rounded`} type={"number"} />
                            <input placeholder="House / Flat / Floor No." {...register("line1")} defaultValue={address?.line1} required className="border w-full p-2 p rounded" type={"text"} />
                            <input placeholder="Apartment / Area / Road" {...register("line2")} defaultValue={address?.line2} required className="border w-full p-2 p rounded" type={"text"} />
                            <div className="flex space-x-2">
                                <input placeholder="Pincode" {...register("pincode")} defaultValue={address?.pincode} required className="border w-full p-2 p rounded" type={"number"} />
                                <input placeholder="City" {...register("city")} value={"Hyderabad"} defaultValue={address?.city} required className="border w-full p-2 p rounded" type={"text"} />
                            </div>
                            <button type={"submit"} className="flex space-x-2 border py-2 text-white bg-green-700 justify-center rounded">
                                {
                                    isLoading ? <div className="pointer-events-none">...loading</div>
                                    : <div className="font-semibold">Confirm Address</div>
                                }
                            </button>
                        </form>
                    </div>
                </div>
        </div>
    )

    function onSubmit(fields: any) {
        if (!latLong) {
            throw Error("Unable to detect your location")
        } 
        setIsLoading(true);
        const updatedAddress = {
            ...address,
            line1: fields["line1"] + '',
            line2: fields["line2"] + '',
            latLong,
            city: fields["city"] + "",
            pincode: fields["pincode"] + "",
            
        } as Address;

        const updatedUserDetails = {
            ...userDetails,
            nameOfReceiver: fields["name"] + "",
            phoneNumber: fields["phoneNumber"] + ""
        } as UserDetails;

        addUserDetails(updatedUserDetails, updatedAddress)
            .then((u: User) => {
                setIsLoading(false);
                props.onSubmit(u);
            })
            .catch((e) => {
                throw Error(e.message)
            })
    }
}

export async function getUserDetailsFromPhoneNumber(phoneNumber: string) {        
    let { data: users, error } = await supabase
    .from<User>('users')
    .select("*")
    .eq('phoneNumber', phoneNumber)

    return users?.pop();
}


export async function addUserDetails(userDetails: UserDetails, address: Address) {
    const oldDetails = await getUserDetailsFromPhoneNumber(userDetails.phoneNumber);
    if (!oldDetails) {
        const { data, error } = 
            await supabase
                .from<User>('users')
                .insert([
                    { address: address, phoneNumber: userDetails.phoneNumber!!, name: userDetails.nameOfReceiver!! },
                ])
                .select()

        if (error) {
            console.error(error.message);
            throw Error("Unable to insert user details")
        }
        
        return data.pop()!!;

    } else {
        const { data, error } = 
                await supabase
                        .from<User>('users')
                        .update({ address: address, name: userDetails.nameOfReceiver!! })
                        .eq('phoneNumber', userDetails.phoneNumber)
                        .select()
        if (error) {
            console.error(error.message);
            throw Error("Unable to update user details")
        } 
        return data.pop()!!;
    }
}