import {Card, CardContent, CardFooter} from "@/components/ui/card.jsx";
import {Label} from "@/components/ui/label.jsx";
import {Button} from "@/components/ui/button.jsx";


function AddressCard({addressInfo, handleEditAddress , handleDeleteAddress, currentSelectedAddress, setCurrentSelectedAddress }){

    return(
        <Card onClick = {
            setCurrentSelectedAddress ?
                () => setCurrentSelectedAddress(addressInfo) : null}


              className={`cursor-pointer p-0 border-2 ${
                  currentSelectedAddress?._id === addressInfo?._id
                      ? "border-red-600 shadow-lg" // ရွေးထားရင် အနားသတ်နီသွားမယ်
                      : "border-transparent"
              }`}
        >
            <CardContent className="grid p-4 gap-4" >
                <Label>Address : {addressInfo?.address}</Label>
                <Label>City : {addressInfo?.city}</Label>
                <Label>Pincode : {addressInfo?.pincode}</Label>
                <Label>Phone : {addressInfo?.phone}</Label>
                <Label>Notes : {addressInfo?.notes}</Label>
            </CardContent>
            <CardFooter  className="p-3 pt-0 flex justify-between" >
                <Button onClick = {(e) => {
                    e.stopPropagation();
                    handleEditAddress(addressInfo)
                }} >Edit</Button>
                <Button onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteAddress(addressInfo)
                }} >Delete</Button>
            </CardFooter>
        </Card>
    )
}

export default AddressCard;