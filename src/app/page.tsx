'use client';

import MenuItem from "./menu/MenuItem";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


export default function MenuPage() {
    const router = useRouter();
    const [checkoutList, setCheckoutList] = useState<{[id: string]: number}>({});
    const [count, setCount] = useState<number>();

    useEffect(() => {
        setCount(Object.keys(checkoutList).filter(k => checkoutList[k]!==0).length);
    }, [checkoutList])

    function addItem(id: string) {
        setCheckoutList((list) => {
            list[id] = (list[id] || 0) + 1;
            return {...list}
        })
    }
    function removeItem(id: string) {
        setCheckoutList((list) => {
            list[id] = (list[id] || 0) - 1;
            return {...list}
        })
    }

    function handleNext() {
        router.push("/checkout");
    }

    
    return (
        <div className="flex flex-col m-4 p-2">
            <div className="flex flex-col text-center space-y-2 px-6">
                <div className=" text-2xl font-bold text-gray-600 flex flex-wrap justify-center">Behroz Biryani</div>
                <div className="text-xs gray-400">4.1 Stars on Zomato</div>
            </div>
            <div className="flex flex-col mt-4 space-y-4 mb-10">
                <MenuItem id={"34"} add={(id) => addItem(id)} remove={(id) => removeItem(id)} name="Lazeez Bhuna Murgh (Chicken Dum Biryani Boneless - Serves 1)" cost={385} image={"https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/htra1ceo32gospqkqalp"} />
                <MenuItem id={"56"} add={(id) => addItem(id)} remove={(id) => removeItem(id)} name="Dum Gosht (Mutton Dum Biryani - Boneless - Serves 1)" cost={535} image={"https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/ocaq0qjsau8no0pnn4dl"} />
                <MenuItem id={"78"} add={(id) => addItem(id)} remove={(id) => removeItem(id)} name="Raan-E-Murgh Biryani (Chicken Whole Leg Biryani) (Serves 1)" cost={459} image={"https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/caeef7009cc017a14a4ab2f6083af7d8"} />
                <MenuItem id={"78"} add={(id) => addItem(id)} remove={(id) => removeItem(id)} name="Murgh Malai Kebab (6 Pcs)" cost={399} image={"https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/ef356baf40a5ae847f779f28d5b97a3d"} />
                <MenuItem id={"78"} add={(id) => addItem(id)} remove={(id) => removeItem(id)} name="Gosht-e-Haleem (Mutton Haleem- Serves 2)" cost={549} image={"https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/433f058364653f9323670ae157547031"} />
            </div>
            {
                count !== 0 &&
                <div className="flex border z-10 fixed bottom-0 left-0 px-4 py-2 mx-auto w-full bg-white  justify-between rounded shadow">
                    <div className="text-sm my-auto">
                        {count} items selected
                    </div>
                    <div className={`flex rounded-md w-1/2 my-auto py-2 border-2 bg-green-700 text-white justify-center font-bold`} onClick={handleNext}>
                        next
                        <ArrowRightIcon className="w-5 h-4 my-auto ml-1 font-bold" />
                    </div>
                </div>
            }
            
        </div>
    )
}