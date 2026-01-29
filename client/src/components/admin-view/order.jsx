import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Dialog} from "@/components/ui/dialog.jsx";
import {useState} from "react";
import AdminOrderDetailsView from "@/components/admin-view/order_details.jsx";


function AdminOrdersView(){
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
console.log(openDetailsDialog);

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
                        <TableRow>
                            <TableCell className={"text-left"} >123456</TableCell>
                            <TableCell className={"text-left"} >1/28/2026</TableCell>
                            <TableCell className={"text-left"} >In Process</TableCell>
                            <TableCell className={"text-left"} >$1000</TableCell>
                            <TableCell className={"text-left"} >
                                <Dialog open={openDetailsDialog} onOpenChange={setOpenDetailsDialog} >
                                    <Button onClick = {() => setOpenDetailsDialog(true)} >View Details</Button>
                                    <AdminOrderDetailsView />
                                </Dialog>
                            </TableCell>

                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

export default AdminOrdersView;