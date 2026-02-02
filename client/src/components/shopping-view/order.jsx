import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.jsx";
import {Button} from "@/components/ui/button.jsx";
import ShoppingOrderDetailsView from "@/components/shopping-view/order_details.jsx";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAllOrdersByUserId, getOlderDetails, resetOrderDetails} from "@/store/shop/order-slice/index.js";
import {Badge} from "@/components/ui/badge.jsx";
import {Dialog} from "@radix-ui/react-dialog";

function ShoppingOrders(){

    const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
    const dispatch = useDispatch();
    const {user} = useSelector(state => state.auth);
    const {orderList, orderDetails} = useSelector(state => state.shopOrder)

    function handleFetchOrderDetails(getId){
        dispatch(getOlderDetails(getId));
    }

    useEffect(() => {
        dispatch(getAllOrdersByUserId(user?.id))
    }, [dispatch]);

    useEffect(() => {
        if(orderDetails !== null) setOpenDetailsDialog(true);
    }, [orderDetails]);
console.log("orderDetails", orderDetails);
    return(
        <Card>
            <CardHeader>
                <CardTitle>Order History</CardTitle>
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
                                            <Button onClick={() => handleFetchOrderDetails(orderItem._id)}>
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
                    { orderDetails && <ShoppingOrderDetailsView orderDetails={orderDetails}/>}
                </Dialog>
            </CardContent>
        </Card>
    )
}

export default ShoppingOrders;