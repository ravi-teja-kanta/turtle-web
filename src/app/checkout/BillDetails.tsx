import { toINR } from "@/utils/currency"

type BillDetailsProps = {
    total: number
}

export default function BillDetails(props: BillDetailsProps) {
    return (
        <div className="flex flex-col border rounded-lg p-4 space-y-2">
                <div className="font-semibold border-b border-dotted py-1 mb-1">Bill Details</div>
                <div className="flex border-dotted space-x-2 justify-between text-gray-600">
                    <div className="text-sm ">Item Total </div>
                    <div className="my-auto">
                        {toINR(props.total)}
                    </div>
                </div>
                <div className="flex border-dotted space-x-2 justify-between">
                    <div className="text-sm text-gray-600">Deliver Charges</div>
                    <div className="my-auto text-green-700">
                        {toINR(0)}
                    </div>
                    {/* <div className="my-auto text-green-700">
                        FREE
                    </div> */}
                </div>
                <div className="flex border-dotted space-x-2 justify-between">
                    <div className="text-sm text-gray-600">Packaging Charges</div>
                    <div className="my-auto text-green-700">
                        {toINR(0)}
                    </div>
                    {/* <div className="my-auto text-green-700">
                        FREE
                    </div> */}
                </div>
                <div className="flex space-x-2 pt-2 border-t border-dotted justify-between">
                    <div className="text-sm font-semibold">To Pay</div>
                    <div className="my-auto font-semibold">
                        {toINR(props.total)}
                    </div>
                </div>
            </div>
    )
}