import {Fragment, useEffect, useState} from "react";
import {Button} from "@/components/ui/button.jsx";
import {Sheet, SheetContent, SheetHeader, SheetTitle} from "@/components/ui/sheet.jsx";
import CommonForm from "@/components/common/form.jsx";
import {addProductFormElements} from "@/config/index.js";
import ProductImageUpload from "@/components/admin-view/image_upload.jsx";
import {useDispatch, useSelector} from "react-redux";
import {addNewProduct, deleteProduct, editProduct, fetchAllProducts} from "@/store/admin/products-slice/index.js";
import {useToast} from "@/components/ui/use-toast.jsx";
import AdminProductTile from "@/components/admin-view/product-tile.jsx";

const initialFormData = {
    image : null,
    title : '',
    description : '',
    category : '',
    brand : '',
    price : '',
    salePrice : '',
    totalStock : '',
}
function Adminproducts() {

    const [openCreateProductsDialog, setOpenCreateProductsDialog] = useState(false);
    const [formData, setFormData] = useState(initialFormData);
    const [imageFile, setImageFile] = useState(null);
    const [currentEditedId, setCurrentEditedId] = useState(null);


    const [uploadedImageUrl, setUploadedImageUrl] = useState("");
    const [imageLoadingState, setImageLoadingState] = useState(false);
    const {productList} = useSelector(state => state.adminProducts)
    const dispatch = useDispatch();
    const {toast} = useToast();

    function onSubmit(event){
        event.preventDefault();

        currentEditedId !== null ?
            dispatch(editProduct({
                id : currentEditedId, formData
            })).then((data) => {
                if(data?.payload?.success){
                    dispatch(fetchAllProducts());
                    setFormData(initialFormData);
                    setOpenCreateProductsDialog(false);
                    setCurrentEditedId(null);
                }
            })
        :
            dispatch(addNewProduct({
                ...formData,
                image : uploadedImageUrl,
            })).then((data) => {
                console.log(data);
                if(data?.payload?.success){
                    dispatch(fetchAllProducts())
                    setOpenCreateProductsDialog(false)
                    setImageFile(null);
                    setFormData(initialFormData)
                    toast({
                        title : 'Product added successfully.'
                    })
                }
            })
        }

    function handleDelete(getCurrentProductId ){
        console.log(getCurrentProductId);
        dispatch(deleteProduct(getCurrentProductId)).then((data) => {
            if(data?.payload?.success){
                dispatch(fetchAllProducts());
            }
        })
    }
    function isFormValid(){
        return Object.keys(formData)
            .map((key) => formData[key] !== "")
            .every((item) => item);
    }

    useEffect(() => {
        dispatch(fetchAllProducts())
    }, [dispatch]);
    //console.log(productList," : ", uploadedImageUrl, "Product List");

    return(
        <Fragment>
            <div className="mb-5 w-full flex justify-end">
                <Button onClick = {() => setOpenCreateProductsDialog(true)} >Add new Product</Button>
            </div>
            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4" >
                {
                    productList && productList.length > 0 ?
                        productList.map((productItem) => (
                            <AdminProductTile
                                key = {productItem._id}
                                setCurrentEditedId={setCurrentEditedId}
                                product={productItem}
                                setFormData = {setFormData}
                                setOpenCreateProductsDialog={setOpenCreateProductsDialog}
                                handleDelete = {handleDelete}
                            />
                        )) : null
                }
            </div>

            <Sheet open={openCreateProductsDialog}
                onOpenChange = {() => {
                setOpenCreateProductsDialog(false);
                setCurrentEditedId(null);
                setFormData(initialFormData);
            }
            } >
                <SheetContent side = "right" className="overflow-auto " >
                    <SheetHeader className="pb-0" >
                        <SheetTitle className="text-lg font-semibold" >{
                            currentEditedId !== null ? 'Edit Product' : 'Add New Product'
                        }</SheetTitle>
                    </SheetHeader>
                    <div className="px-4 py-0" >
                        <ProductImageUpload imageFile={imageFile}
                                            setImageFile = {setImageFile}
                                            uploadedImageUrl={uploadedImageUrl}
                                            setUploadedImageUrl = {setUploadedImageUrl}
                                            setImageLoadingState = {setImageLoadingState}
                                            imageLoadingState={imageLoadingState}
                                            isEditMode = {currentEditedId !== null}
                        />
                        <div className="py-6 " >
                            <CommonForm
                                onSubmit = {onSubmit}
                                formData={formData}
                                setFormData = {setFormData}
                                buttonText={currentEditedId !== null ? "Edit" : "Add"}
                                formControls = {addProductFormElements}
                                isBtnDisabled = {!isFormValid()}
                            />
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </Fragment>
        )

}

export default Adminproducts;

//4:52
