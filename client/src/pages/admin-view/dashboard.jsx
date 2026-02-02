import {useEffect, useState} from "react";
import ProductImageUpload from "@/components/admin-view/image_upload.jsx";
import {Button} from "@/components/ui/button.jsx";
import {useDispatch, useSelector} from "react-redux";
import {addFeatureImages, getFeatureImages} from "@/store/common-slice/index.js";


function AdminDashboard() {

    const [imageFile, setImageFile] = useState(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState("");
    const [imageLoadingState, setImageLoadingState] = useState(false);

    const dispatch = useDispatch();
    const {featureImageList} = useSelector(state => state.commonFeature)

    function handleUploadFeatureImage(){
        dispatch(addFeatureImages(uploadedImageUrl)).then(data =>
            {
                if(data?.payload?.success){
                    dispatch(getFeatureImages());
                    setImageFile(null);
                    setUploadedImageUrl("")
                }
            }
        )
    }

    useEffect(() => {
        dispatch(getFeatureImages())
    }, [dispatch]);

    console.log(featureImageList, 'featureImageList');


    return <div>
        <ProductImageUpload imageFile={imageFile}
                            setImageFile = {setImageFile}
                            uploadedImageUrl={uploadedImageUrl}
                            setUploadedImageUrl = {setUploadedImageUrl}
                            setImageLoadingState = {setImageLoadingState}
                            imageLoadingState={imageLoadingState}
                            isCustomStyling={true}
                            // isEditMode = {currentEditedId !== null}
        />
        <Button
            onClick={handleUploadFeatureImage}
            className={'mt-5 w-full'} >Upload</Button>

        <div className="flex flex-col gap-4 mt-5" >
            {
                featureImageList && featureImageList.length > 0 ?
                    featureImageList.map(featureImageItem =>
                        <div key={featureImageItem._id} className={'relative'} >
                            <img
                                src={featureImageItem.image}
                                className={"w-full h-[300px] object-cover rounded-t-lg"}
                            />
                        </div>
                    ) : <h1>No image</h1>

            }
        </div>
    </div>
}

export default AdminDashboard;
