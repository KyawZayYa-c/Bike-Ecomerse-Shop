import { Label } from "@/components/ui/label.jsx";
import { Separator } from "@/components/ui/separator.jsx";
import {
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from "@/components/ui/dialog.jsx";

import {Badge} from "@/components/ui/badge.jsx";
import {useSelector} from "react-redux";

function ShoppingOrderDetailsView({orderDetails}) {

    const {user} = useSelector((state) => state.auth);
    return (
        <DialogContent className="sm:max-w-[600px]">
            {/* ၁။ DialogHeader နှင့်အတူ Title/Description ထည့်ခြင်းဖြင့် Error ကို ရှင်းနိုင်ပါတယ် */}
            <DialogHeader>
                <DialogTitle>Order Details</DialogTitle>
                <DialogDescription>
                    Your order history and shipping information.
                </DialogDescription>
            </DialogHeader>

            <div className="grid gap-6">
                <div className="grid gap-2">
                    <div className="flex mt-2 items-center justify-between">
                        <p className="font-medium">Order ID</p>
                        <Label>{orderDetails?._id}</Label>
                    </div>
                    <div className="flex mt-2 items-center justify-between">
                        <p className="font-medium">Order Date</p>
                        <Label>{orderDetails?.orderDate?.split("T")[0]}</Label>
                    </div>
                    <div className="flex mt-2 items-center justify-between">
                        <p className="font-medium">Order Price</p>
                        <Label>${orderDetails?.totalAmount}</Label>
                    </div>
                    <div className="flex mt-2 items-center justify-between">
                        <p className="font-medium">Payment method</p>
                        <Label>{orderDetails?.paymentMethod}</Label>
                    </div>
                    <div className="flex mt-2 items-center justify-between">
                        <p className="font-medium">Payment status</p>
                        <Label>{orderDetails?.paymentStatus}</Label>
                    </div>
                    <div className="flex mt-2 items-center justify-between">
                        <p className="font-medium">Order Status</p>
                        <Label>
                            <Badge className={`py-1 px-3 ${
                                orderDetails?.orderStatus === "confirmed"
                                    ? "bg-green-500"
                                    : orderDetails?.orderStatus === "rejected"
                                        ? "bg-red-700"
                                        : "bg-black"
                            }`}>
                                {orderDetails?.orderStatus}
                            </Badge>
                        </Label>
                    </div>
                </div>

                    <Separator className="mt-2 mb-3" />

                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <div className="font-medium">Items Purchased</div>
                            <ul className="grid gap-3">
                                {
                                    orderDetails?.cartItems && orderDetails?.cartItems.length > 0 ?
                                        orderDetails?.cartItems.map((item) => (
                                            <li key={item._id} className="flex items-center justify-between">
                                                <span>Title : {item.title}</span>
                                                <span>Quantity : {item.quantity}</span>
                                                <span>Price : ${item.price}</span>
                                            </li>
                                        )) : null
                                }

                            </ul>
                        </div>
                    </div>

                    <Separator className="mt-2 mb-3" />

                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <div className="font-medium">Shipping Info</div>
                            <div className="grid gap-0.5 text-muted-foreground">
                                <span>{user.userName}</span>
                                <span>{orderDetails?.addressInfo?.address}</span>
                                <span>{orderDetails?.addressInfo?.city}</span>
                                <span>{orderDetails?.addressInfo?.pincode}</span>
                                <span>{orderDetails?.addressInfo?.phone}</span>
                                <span>{orderDetails?.addressInfo?.notes}</span>
                            </div>
                        </div>
                    </div>
                </div>

        </DialogContent>
    );
}

export default ShoppingOrderDetailsView;