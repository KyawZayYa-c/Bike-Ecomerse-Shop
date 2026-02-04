import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Dialog} from "@/components/ui/dialog.jsx";
import {useEffect, useState} from "react";
import AdminOrderDetailsView from "@/components/admin-view/order_details.jsx";
import {useDispatch, useSelector} from "react-redux";
import {getAllOrdersForAdmin, getOrderDetailsForAdmin, resetOrderDetails} from "@/store/admin/order-slice/index.js";
import {Badge} from "@/components/ui/badge.jsx";
import ShoppingOrderDetailsView from "@/components/shopping-view/order_details.jsx";


function AdminOrdersView(){
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
    const {orderList, orderDetails} = useSelector(state => state.adminOrder);
    const dispatch = useDispatch();

    function handleFetchOrderDetails(getId){
        dispatch(getOrderDetailsForAdmin(getId))
    }

    useEffect(() => {
        dispatch(resetOrderDetails());
        dispatch(getAllOrdersForAdmin());
    }, [dispatch]);

    useEffect(() => {
        if(orderDetails !== null)  setOpenDetailsDialog(true);

    }, [orderDetails]);
    return(
        <Card>
            <CardHeader>
                <CardTitle>All history</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead> Order ID </TableHead>
                            <TableHead> Order Date </TableHead>
                            <TableHead> Order Status </TableHead>
                            <TableHead> Order Price </TableHead>
                            <TableHead> <span className="sr-only">Details</span> </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            orderList && orderList.length > 0 ?
                                orderList.map(orderItem => (
                                    <TableRow key={orderItem._id} >
                                        <TableCell className={"text-left"} >{orderItem._id}</TableCell>
                                        <TableCell className={"text-left"} >{orderItem?.orderDate.split("T")[0]}</TableCell>
                                        <TableCell className={"text-left"} >
                                            <Badge className={`py-1 px-3 ${
                                                orderItem?.orderStatus === "confirmed"
                                                    ? "bg-green-500"
                                                    : orderItem?.orderStatus === "rejected"
                                                    ? "bg-red-700"
                                                    : "bg-black"
                                            }`}>
                                                {orderItem?.orderStatus}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className={"text-left"} >${orderItem?.totalAmount}</TableCell>
                                        <TableCell className={"text-left"} >
                                            <Button
                                                onClick={() => handleFetchOrderDetails(orderItem._id)}
                                            >
                                                View Details
                                            </Button>

                                        </TableCell>

                                    </TableRow>
                                ))
                                : null
                        }

                    </TableBody>
                </Table>
                <Dialog
                    open = {openDetailsDialog}
                    onOpenChange={() => {
                        setOpenDetailsDialog(false)
                        dispatch(resetOrderDetails());
                    }} >
                    { orderDetails && <AdminOrderDetailsView orderDetails={orderDetails}/>}
                </Dialog>
            </CardContent>
        </Card>
    )
}

export default AdminOrdersView;