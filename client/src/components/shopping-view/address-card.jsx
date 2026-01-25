import {Card, CardContent, CardFooter} from "@/components/ui/card.jsx";
import {Label} from "@/components/ui/label.jsx";
import {Button} from "@/components/ui/button.jsx";


function AddressCard({addressInfo, handleEditAddress , handleDeleteAddress }){
    return(
        <Card className="p-0" >
            <CardContent className="grid p-4 gap-4" >
                <Label>Address : {addressInfo?.address}</Label>
                <Label>City : {addressInfo?.city}</Label>
                <Label>Pincode : {addressInfo?.pincode}</Label>
                <Label>Phone : {addressInfo?.phone}</Label>
                <Label>Notes : {addressInfo?.notes}</Label>
            </CardContent>
            <CardFooter  className="p-3 pt-0 flex justify-between" >
                <Button onClick = {() => handleEditAddress(addressInfo)} >Edit</Button>
                <Button onClick={() => handleDeleteAddress(addressInfo)} >Delete</Button>
            </CardFooter>
        </Card>
    )
}

export default AddressCard;