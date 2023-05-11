"use client";

import { toINR } from "@/utils/currency";
import Image from "next/image";
import { useState } from "react";
import {PlusIcon, MinusIcon} from "@heroicons/react/24/solid";

type MenuItemProps = {
    name: string,
    cost: number,
    image: string
}
export default function MenuItem(props: MenuItemProps) {
    const [quantity, setQuantity] = useState<number>(0);

    return (
        <div className="flex border px-2 py-4 justify-between shadow rounded-md space-x-2">
            <div className="flex flex-col w-1/2">
                <div className="text-gray-600 flex flex-wrap">{props.name}</div>
                <div>{ toINR(props.cost) }</div>
                {
                    quantity === 0 ?
                    <div className="flex justify-center mt-4 p-1 rounded-md text-center w-3/4 border-2 bg-green-700 text-white" onClick={()=>setQuantity(1)}>
                        <div className="">add</div>
                    </div>:
                    <div className="flex rounded-md text-center mt-4 p-1 w-3/4 border-2 justify-between">
                        <div className="my-auto bg-green-700 text-white rounded-l" onClick={() => {setQuantity(quantity + 1)}}><PlusIcon className="w-6 h-6 p-1" /></div>
                        <div className="my-auto px-2">{quantity}</div>
                        <div className="my-auto bg-green-700 text-white rounded-r" onClick={() => {setQuantity(quantity - 1)}}><MinusIcon className="w-6 h-6 p-1" /></div>
                    </div>
                }
                {/* <div className="rounded-md mt-4 px-6 py-1 text-center w-fit border-2 bg-green-700 text-white">
                    add
                </div> */}
            </div>
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
        </div>
    )
}