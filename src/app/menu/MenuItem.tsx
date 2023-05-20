"use client";

import { toINR } from "@/utils/currency";
import Image from "next/image";
import { useEffect, useState } from "react";
import {PlusIcon, MinusIcon} from "@heroicons/react/24/solid";

type MenuItemProps = {
    id: string,
    name: string,
    cost: number,
    image: string,
    add: (id: string) => void,
    remove: (id: string) => void
}
export default function MenuItem(props: MenuItemProps) {
    const [quantity, setQuantity] = useState<number>(0);

    return (
        <div className="flex border px-2 py-4 justify-between shadow rounded-md space-x-2">
            <div className="rounded-md flex">
                <Image
                    src={props.image}
                    alt={""}
                    width={150}
                    height={150}
                    style={
                        {
                            borderRadius: '5%'
                        }
                    }
                />
            </div>
            <div className="flex flex-col w-1/2">
                <div className="text-gray-600 flex text-sm">{props.name}</div>
                <div className="font-semibold mt-1 text-sm">{ toINR(props.cost) }</div>
                {
                    quantity === 0 ?
                    <div className="flex justify-center mt-4 ml-auto p-1 rounded-md text-center w-3/4  bg-green-700 text-white" onClick={()=>{setQuantity(1); props.add(props.id)}}>
                        <div className="">add</div>
                    </div>:
                    <div className="flex rounded-md text-center mt-4 p-1 w-3/4 border justify-between ml-auto">
                        <div className="my-auto bg-green-700 text-white rounded-l" onClick={() => {setQuantity(quantity - 1); props.remove(props.id)}}><MinusIcon className="w-6 h-6 p-1" /></div>
                        <div className="my-auto px-2">{quantity}</div>
                        <div className="my-auto bg-green-700 text-white rounded-r" onClick={() => {setQuantity(quantity + 1); props.add(props.id)}}><PlusIcon className="w-6 h-6 p-1" /></div>
                    </div>
                }
            </div>
        </div>
    )
}