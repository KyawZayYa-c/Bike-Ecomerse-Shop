import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog.jsx";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden"; // ဒါလေး သုံးဖို့ လိုအပ်ပါတယ်
import { Label } from "@/components/ui/label.jsx";
import { Separator } from "@/components/ui/separator.jsx";
import CommonForm from "@/components/common/form.jsx";
import { useState } from "react";
import {Badge} from "@/components/ui/badge.jsx";
import {useDispatch, useSelector} from "react-redux";
import {getAllOrdersForAdmin, getOrderDetailsForAdmin, updateOrderStatus} from "@/store/admin/order-slice/index.js";
import { useToast} from "@/components/ui/use-toast.jsx";

const initialFormData = {
    status: ''
}

function AdminOrderDetailsView({orderDetails}) {
    const [formData, setFormData] = useState(initialFormData);
    const {user} = useSelector((state) => state.auth)
    const dispatch = useDispatch();
    const {toast} = useToast();

    const handleUpdateStatus = (e) => {
        e.preventDefault();
        console.log('Form Data => ', formData);
        const {status} = formData;
        dispatch(updateOrderStatus({id : orderDetails?._id, orderStatus : status}))
            .then(data => {
                if(data?.payload?.success){
                    dispatch(getOrderDetailsForAdmin(orderDetails?._id));
                    dispatch(getAllOrdersForAdmin());
                    setFormData(initialFormData);
                    toast({
                        title : data?.payload?.message,
                    })
                }
        })
    }

    return (
        // aria-describedby={undefined} ထည့်ခြင်းဖြင့် Description error ကိုပါ ပိတ်နိုင်ပါတယ်
        <DialogContent className="sm:max-w-[600px] h-screen overflow-hidden" aria-describedby={undefined}>

            {/* Error မတက်အောင် DialogTitle ကို VisuallyHidden နဲ့ အုပ်ပြီး ထည့်ထားပါတယ် */}
            <VisuallyHidden.Root>
                <DialogTitle>Admin Order Details</DialogTitle>
            </VisuallyHidden.Root>

            <div className="grid gap-3">
                <div className="grid gap-1">
                    <div className="flex items-center justify-between">
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


                    <Separator />


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

                    <div>
                        <CommonForm formControls={[{
                            label : "Order Status",
                            name  : "status",
                            componentType : "select",
                            options : [
                                {id : "pending", label : "Pending"},
                                {id : "inProcess", label : "In Process"},
                                {id : "inShipping" , label : "In Shipping"},
                                {id : "delivered", label : "Delivered"},
                                {id : "rejected", label : "Rejected"}
                            ]
                        }]}
                                    formData={formData}
                                    setFormData={setFormData}
                                    buttonText={'Update Order status'}
                                    onSubmit={handleUpdateStatus}
                        />
                    </div>
                </div>

        </DialogContent>
    )
}

export default AdminOrderDetailsView;