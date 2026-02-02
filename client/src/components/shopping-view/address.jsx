import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import CommonForm from "@/components/common/form.jsx";
import {addressFormControls} from "@/config/index.js";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addNewAddress, deleteAddress, editaAddress, fetchAllAddresses} from "@/store/shop/address-slice/index.js";
import AddressCard from "@/components/shopping-view/address-card.jsx";
import {useToast} from "@/components/ui/use-toast.jsx";

const initialAddressFormData = {
    address : '',
    city : '',
    phone : '',
    pincode : '',
    notes : ''
}

function Address({currentSelectedAddress,setCurrentSelectedAddress}){
    const [formData , setFormData] = useState(initialAddressFormData);
    const [currentEditedId, setCurrentEditedId] = useState(null);
    const dispatch = useDispatch();
    const {user} = useSelector(state => state.auth);
    const {addressList} = useSelector(state => state.shopAddress);
    const {toast} = useToast();

    function handleManageAddress(event) {
        event.preventDefault();

        if(addressList.length >= 3 && currentEditedId === null){
            toast ({
                title : 'You can add max 3 address',
                variant : 'destructive'
            })
            return
        }

        currentEditedId !== null
            ? dispatch(
                editaAddress({
                    userId: user?.id,
                    addressId: currentEditedId,
                    formData,
                })
            ).then((data) => {
                if (data?.payload?.success) {
                    dispatch(fetchAllAddresses(user?.id));
                    setCurrentEditedId(null);
                    setFormData(initialAddressFormData);
                    toast({ title: "Address updated successfully." });
                }
            })
            : dispatch(
                addNewAddress({
                    ...formData, // address, city, phone စတာတွေကို ဖြန့်ချလိုက်တာ
                    userId: user?.id,
                })
            ).then((data) => {
                if (data?.payload?.success) {
                    dispatch(fetchAllAddresses(user?.id)); // userId ထည့်ပေးရမယ်
                    setFormData(initialAddressFormData);
                    toast({ title: "Address added successfully." });
                }
            });
    }

    function handleEditAddress(getCurrentAddress){
        setCurrentEditedId(getCurrentAddress?._id);
        setFormData({
            ...formData,
            address : getCurrentAddress?.address,
            city : getCurrentAddress?.city,
            phone : getCurrentAddress?.phone,
            pincode : getCurrentAddress?.pincode,
            notes : getCurrentAddress?.notes,

        })
    }

    function handleDeleteAddress(getCurrentAddress){

        dispatch(deleteAddress({userId : user?.id, addressId : getCurrentAddress._id}))
            .then(
            data => {
                if(data?.payload?.success){
                    dispatch(fetchAllAddresses(user?.id));
                    toast({ title: "Address deleted successfully." });
                }
            }
        )
    }

    useEffect(() => {
        dispatch(fetchAllAddresses(user?.id));
    }, [dispatch]);
    console.log("address LIst ", addressList);

    function isFormValid(){
        return Object.keys(formData).map(key => formData[key].trim() !== '').every(item =>  item);
    }


    return(
        <Card>
            <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2 gap-2 " >
                {
                    addressList && addressList.length > 0 ?
                        addressList.map((singleAddressItem) => (
                            <AddressCard
                                handleDeleteAddress={handleDeleteAddress}
                                addressInfo={singleAddressItem}
                                handleEditAddress={handleEditAddress}
                                setCurrentSelectedAddress = {setCurrentSelectedAddress}
                                currentSelectedAddress = {currentSelectedAddress}
                            />
                        )) : null
                }
            </div>
                <CardHeader>
                    <CardTitle className="text-left text-lg" >
                        {
                            currentEditedId !== null ? 'Edit Address' : 'Add New Address'
                        }
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <CommonForm
                        formControls={addressFormControls}
                        formData = {formData}
                        setFormData = {setFormData}
                        buttonText = {
                            currentEditedId !== null ? 'Edit' : 'Add'
                        }
                        onSubmit={handleManageAddress}
                        isBtnDisabled={!isFormValid()}
                        />
                </CardContent>
        </Card>
    )
}

export default Address;

//9:46