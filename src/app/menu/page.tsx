import { toINR } from "@/utils/currency";
import Image from "next/image";
import MenuItem from "./MenuItem";
import { ArrowRightIcon } from "@heroicons/react/24/solid";

export default function MenuPage() {
    
    return (
        <div className="flex flex-col">
            <div className="flex flex-col text-center space-y-2 px-6">
                <div className=" text-2xl font-bold text-gray-600 flex flex-wrap justify-center">Mayabazaar Restaurant</div>
                <div className="text-xs gray-400">4.1 Stars on Zomato</div>
            </div>
            <div className="flex flex-col mt-4 space-y-4">
                <MenuItem name="Chicken Dum Biryani" cost={247} image={"https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/s3cootrdhb93xht1oadq"} />
                <MenuItem name="Chicken Boneless Biryani" cost={279} image={"https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/8141298d6e2fc40e01002cfda26b4d57"} />
                <MenuItem name="Chicken Boneless Biryani" cost={279} image={"https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/8141298d6e2fc40e01002cfda26b4d57"} />
                <MenuItem name="Chicken Boneless Biryani" cost={279} image={"https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/8141298d6e2fc40e01002cfda26b4d57"} />
                <MenuItem name="Chicken Boneless Biryani" cost={279} image={"https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/8141298d6e2fc40e01002cfda26b4d57"} />
            </div>
            <div className="flex border z-10 fixed bottom-0 left-0 px-4 py-2 mx-auto w-full bg-white  justify-between rounded shadow">
                <div className="text-sm my-auto">
                    3 items selected
                </div>
                <div className="flex rounded-md w-1/2 my-auto py-2 border-2 bg-green-700 text-white justify-center font-bold">
                    next
                    <ArrowRightIcon className="w-5 h-4 my-auto ml-1 font-bold" />
                </div>
            </div>
        </div>
    )
}