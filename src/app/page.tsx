'use client';

import MenuItemComponent from "./menu/MenuItem";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useLocalStorage from "@/utils/useLocalStorage";
import { CartSummaryItemProps } from "./checkout/page";
import { MenuItem, MayabazaarMenu } from "@/constants/mayabazaarMenu";
import Link from "next/link";


export default function MenuPage() {
    const router = useRouter();
    const [count, setCount] = useState<number>(0);
    const [cart, setCart] = useLocalStorage<CartSummaryItemProps[]>("cart", []);


    useEffect(() => {
        setCount(cart.filter(i => i.quantity !== 0).length);
    }, [cart])

    function addItem(id: string) {
        
        setCart((cart) => {
            let updatedCartItem = cart.filter(i => i.id === id).pop();
            if(!updatedCartItem || updatedCartItem.quantity === 0) {
                let menuItem = MayabazaarMenu.filter(mi => mi.id === id).pop();
                if(!menuItem) throw Error("Item does not exist in menu");
                updatedCartItem = {
                    id,
                    name: menuItem.name,
                    cost: menuItem.currentPrice,
                    quantity: 1
                }
            } else updatedCartItem.quantity = updatedCartItem.quantity + 1;
            return  [updatedCartItem, ...cart.filter(i => i.id != id) ]
        })
    }
    function removeItem(id: string) {
        setCart((cart) => {
            let updatedCartItem = cart.filter(i => i.id === id).pop();
            if(!updatedCartItem || updatedCartItem.quantity===0) throw Error("Trying to remove item which doesnt exist");
            updatedCartItem.quantity = updatedCartItem.quantity - 1;
            return  [updatedCartItem, ...cart.filter(i => i.id != id) ]
        })
    }

    function handleNext() {
        router.push("/checkout");
    }

    
    return (
        <div className="flex flex-col m-4 p-2">
            <div className="flex flex-col text-center space-y-2 px-6">
                <div className=" text-2xl font-bold text-gray-600 flex flex-wrap justify-center">Maya Bazaar Restaurant</div>
                <div className="text-xs gray-400">4.1 Stars on Zomato (1500+ reviews)</div>
            </div>
            <div className="flex flex-col mt-4 space-y-4 mb-10">
                {
                    MayabazaarMenu.map((i) => {
                        let itemInLocal = cart.filter(it => it.id === i.id).pop();
                        return <MenuItemComponent key={i.id} {...i} add={(id) => addItem(id)} remove={(id) => removeItem(id)} quantity={itemInLocal?.quantity} />
                    })
                }
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
            <div className='flex mx-auto space-x-2'>
                <Link href={"/terms-and-conditions"} className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600">Terms and Conditions</Link>
                <div>|</div>
                <Link href={"/privacy-policy"} className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600">Privacy Policy</Link>
            </div>
        </div>
    )

    
}