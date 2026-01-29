import {DialogContent} from "@/components/ui/dialog.jsx";
import {Label} from "@/components/ui/label.jsx";
import {Separator} from "@/components/ui/separator.jsx";
import CommonForm from "@/components/common/form.jsx";
import {useState} from "react";

const initialFormData = {
    status: ''
}
function AdminOrderDetailsView(){

    const [formData, setFormData] = useState(initialFormData);

    const handleUpdateStatus = (e) => {
        e.preventDefault();
    }

    return (
        <DialogContent className="sm:max-w-[600px]" >
            <div className="grid gap-6">
                <div className="grid gap-2">
                    <div className="flex mt-6 items-center justify-between">
                        <p className = "font-medium">Order ID</p>
                        <Label>123456</Label>
                    </div>
                    <div className="flex mt-2 items-center justify-between">
                        <p className = "font-medium">Order Date</p>
                        <Label>1/28/2026</Label>
                    </div>
                    <div className="flex mt-2 items-center justify-between">
                        <p className = "font-medium">Order Status</p>
                        <Label>In Process</Label>
                    </div>
                    <div className="flex mt-2 items-center justify-between">
                        <p className = "font-medium">Order Price</p>
                        <Label>$1000</Label>
                    </div>
                    <Separator />
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <div className="font-medium"> Order details </div>
                            <ul className="grid gap-3">
                                <li className="flex items-center justify-between">
                                    <span>Product One</span>
                                    <span>$100</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className={"grid gap-4"}>
                        <div className={"grid gap-2"}>
                            <div className={"font-medium"} >Shopping Info</div>
                            <div className={"grid gap-0.5 text-muted-foreground "}>
                                <span>Jhon Doe</span>
                                <span>Address</span>
                                <span>City</span>
                                <span>Pincode</span>
                                <span>Phone</span>
                                <span>Notes</span>

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
            </div>
        </DialogContent>
    )
}

export  default AdminOrderDetailsView;

