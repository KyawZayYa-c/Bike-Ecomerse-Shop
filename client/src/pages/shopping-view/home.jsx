
import {

    ChevronLeftIcon,
    ChevronRightIcon,
    Bike,              // Super Bike အတွက်
    Cylinder,          // Naked Bike (အင်ဂျင်) အတွက်
    Map,               // Adventure (ခရီးသွား) အတွက်
    HardHat,           // Helmet (ဦးထုပ်) အတွက်
    ShieldCheck,       // Riding Gears (အကာအကွယ်) အတွက်
    Zap,               // Kawasaki/Power အတွက်
    Crown,             // Ducati/Premium အတွက်
    Trophy,            // Yamaha/Racing အတွက်
    Compass,           // BMW/Touring အတွက်
    CheckCircle        // Honda/Reliable အတွက်
} from "lucide-react";
import {Button} from "@/components/ui/button.jsx";
import {Card, CardContent} from "@/components/ui/card.jsx";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchAllFilteredProducts, fetchProductDetails} from "@/store/shop/products-slice/index.js";
import ShoppingProductTile from "@/components/shopping-view/product-tile.jsx";
import {useNavigate} from "react-router-dom";
import {addToCart, fetchCartItems} from "@/store/shop/cart-slice/index.js";
import {useToast} from "@/components/ui/use-toast.jsx";
import ProductDetailsDialog from "@/components/shopping-view/product-details.jsx";
import productDetails from "@/components/shopping-view/product-details.jsx";
import {getFeatureImages} from "@/store/common-slice/index.js";

const categoriesWithIcon = [
    { id: "superbike", label: "Super Bike", icon: Bike },
    { id: "nakedbike", label: "Naked Bike", icon: Cylinder },
    { id: "adventure", label: "Adventure", icon: Map },
    { id: "headwear", label: "Helmets", icon: HardHat },
    { id: "riding-gears", label: "Riding Gears", icon: ShieldCheck }
];

const brandsWithIcon = [
    { id: "kawasaki", label: "Kawasaki", icon: Zap },
    { id: "yamaha", label: "Yamaha", icon: Trophy },
    { id: "honda", label: "Honda", icon: CheckCircle },
    { id: "ducati", label: "Ducati", icon: Crown },
    { id: "bmw", label: "BMW", icon: Compass },
    { id: "alpinestars", label: "Alpinestars", icon: ShieldCheck }
];

function ShoppingHome(){
    const [currentSlide, setCurrentSlide] = useState(0);

    const {productList, productDetails} = useSelector(state => state.shopProducts);
    const {user} = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {toast} = useToast();
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
    const {featureImageList} = useSelector(state => state.commonFeature);


    function handleNavigateToListingPage(getCurrentItem, section){
        sessionStorage.removeItem('filters');
        const currentFilter = {
            [section] : [getCurrentItem.id]
        }
        sessionStorage.setItem('filters', JSON.stringify(currentFilter));
        navigate(`/shop/listing/`);
    }

    function handleGetProductDetails(getCurrentProductId){
        dispatch(fetchProductDetails(getCurrentProductId))
    }

    function handleAddtoCart(getCurrentProductId){
        console.log(getCurrentProductId);
        dispatch(addToCart(
                {
                    userId : user?.id,
                    productId : getCurrentProductId,
                    quantity : 1}
            )
        ).then((data) => {
            if(data?.payload?.success){
                dispatch(fetchCartItems(user?.id))
                toast({
                    title : "Product is added to cart",
                })
            }
        });
    }


    useEffect(() => {
        dispatch(getFeatureImages())
    }, [dispatch]);


    useEffect(() => {
        if(productDetails !== null) setOpenDetailsDialog(true);
    }, [productDetails]);

    useEffect(()=> {
        const timmer = setInterval(() => {
            setCurrentSlide((prevSlide) =>
                (prevSlide + 1) % featureImageList.length );
        }, 5000);
        return () => clearInterval(timmer);
    }, [featureImageList])

    useEffect(() => {
       dispatch(fetchAllFilteredProducts(
           {filterParams : {}, sortParams : 'price-lowtohigh'}))
    }, [dispatch]);

    return <div className="flex flex-col min-h-screen" >
                <div  className="relative w-full h-[600px] overflow-hidden" >
                    {
                        featureImageList && featureImageList.length > 1 ?
                            featureImageList.map((slide, index) => <img
                          src={slide.image}
                          key={slide._id}
                          className = {`${index === currentSlide ? 'opacity-100' : 'opacity-0'} absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
                        />) : null
                    }
                    <Button
                        onClick={() => setCurrentSlide(
                            prevSlide =>
                                (prevSlide -1 + featureImageList.length) % featureImageList.length)}
                        variant="outline"
                        size="icon"
                        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80">
                        <ChevronLeftIcon />
                    </Button>
                    <Button
                        onClick={() => setCurrentSlide(
                            prevSlide =>
                                (prevSlide +1 ) % featureImageList.length)}
                        variant="outline"
                        size="icon"
                        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80">
                        <ChevronRightIcon />
                    </Button>
                </div>
                <section className="py-12 bg-gray-50" >
                        <div className="container mx-auto px-4">
                            <h2 className="text-3xl font-bold text-center mb-8">
                                Shop by category
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                                {
                                    categoriesWithIcon.map((categoryItem) => (
                                        <Card
                                            onClick = {() => handleNavigateToListingPage(categoryItem, 'category')}
                                            key={categoryItem.id} className="cursor-pointer hover:shadow-lg transaction-shadow">
                                            <CardContent className="flex flex-col items-center justify-center p-6 ">
                                                <categoryItem.icon className="w-12 h-12 mb-4 text-primary"  />
                                                <span>{categoryItem.label}</span>
                                            </CardContent>
                                        </Card>
                                    ))
                                }
                            </div>
                        </div>
                </section>

                <section className="py-12 bg-gray-50" >
                    <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-8">
                        Shop by Brand
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {
                        brandsWithIcon.map((brandItem) => (
                            <Card
                                onClick = {() => handleNavigateToListingPage(brandItem, 'brand')}
                                key={brandItem.id} className="cursor-pointer hover:shadow-lg transaction-shadow">
                                <CardContent className="flex flex-col items-center justify-center p-6 ">
                                    <brandItem.icon className="w-12 h-12 mb-4 text-primary"  />
                                    <span>{brandItem.label}</span>
                                </CardContent>
                            </Card>
                            ))
                        }
                        </div>
                     </div>
                 </section>

                <section className="py-12" >
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-8">
                            Feature products
                        </h2>
                        <div className = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {
                                productList && productList.length > 0 ?
                                    productList.map(productItem =>
                                        <ShoppingProductTile
                                            product={productItem}
                                            handleGetProductDetails={handleGetProductDetails}
                                            handleAddtoCart={handleAddtoCart}
                                        />
                                    )
                                    :null
                            }
                        </div>
                    </div>
                </section>
        <ProductDetailsDialog
              open={openDetailsDialog}
              setOpen={setOpenDetailsDialog}
              productDetails={productDetails}
        />
    </div>;
}


export default ShoppingHome;

//8:39