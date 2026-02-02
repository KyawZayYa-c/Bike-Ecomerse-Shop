

import {Button} from "@/components/ui/button.jsx";
import {Minus, Plus, Trash} from "lucide-react";
import {useDispatch, useSelector} from "react-redux";
import {deleteCartItem, updateCartQuantity} from "@/store/shop/cart-slice/index.js";
import {useToast} from "@/components/ui/use-toast.jsx";

function UserCartItemsContent ({cartItem}){

    const {user} = useSelector((state) => state.auth);
    const {cartItems} = useSelector((state) => state.shopCart);
    const {productList} = useSelector(state => state.shopProducts);
    const dispatch = useDispatch();
    const {toast} = useToast();

    function handleCartItemDelete(getCartItem){
        console.log("GetItem" ,getCartItem)
        dispatch(
            deleteCartItem(
                {userId : user?.id, productId : getCartItem?.productId || getCartItem?.id}
            )).then(data => {
                if(data?.payload?.success){
                    toast({
                        title : 'Cart Item is delete successfully'
                    })
                }
        })

    }

    function handleUpdateQuantity(getCartItem, typeOfAction){

        if(typeOfAction == 'plus'){
            let getCartItems = cartItems.items || [];

            if(getCartItems.length){
                const indexOfCurrentCartItem = getCartItems.findIndex(item => item.productId === getCartItem?.productId);
                const getCurrentProductIndex = productList.findIndex(product => product._id === getCartItem?.productId)
                const getTotalStock = productList[getCurrentProductIndex].totalStock;

                if(indexOfCurrentCartItem > -1){
                    const getQuantity = getCartItems[indexOfCurrentCartItem].quantity;
                    if(getQuantity + 1 > getTotalStock){
                        toast({
                            title : `Only ${getQuantity} quantity can be added for this item.`,
                            variant : 'destructive',
                        });
                        return;
                    }
                }

            }
        }

        const successMessage = typeOfAction === 'plus'
            ? 'Cart item added successfully'
            : 'Cart item reduced successfully';
        dispatch(updateCartQuantity({
            userId : user?.id,
            productId : getCartItem?.productId || getCartItem?.id,
            quantity : typeOfAction === 'plus' ? getCartItem?.quantity + 1 : getCartItem?.quantity -1
        })).then(data => {
            if(data?.payload?.success){
                toast({
                    title : successMessage
                })
            }
        })
    }

    return (
        <div className="flex items-center space-x-4" >
            <img
                src={cartItem?.image}
                alt={cartItem?.title}
                className="w-20 h-20 rounded object-cover"
            />

            <div className="flex-1" >
                <h3 className="font-extrabold" >{cartItem?.title}</h3>
                <div className="flex items-center mt-1 gap-2 " >
                    <Button
                        variant="outline"
                        className="rounded-full"
                        size="icon"
                        disabled = {cartItem?.quantity <= 1}
                        onClick = {() => handleUpdateQuantity(cartItem, 'minus')}
                    >
                            <Minus className="w-8 h-8" />
                            <span className="sr-only">Decrease</span>
                    </Button>
                    <span className="font-semibold" >{cartItem?.quantity}</span>
                    <Button
                        variant="outline"
                        className="rounded-full"
                        size="icon"
                        onClick = {() => handleUpdateQuantity(cartItem, 'plus')}
                    >
                        <Plus className="w-8 h-8" />
                        <span className="sr-only">Increase</span>
                    </Button>
                </div>
            </div>

            <div className = "flex flex-col items-center">
                <p className="font-semibold">
                    ${((cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price)*cartItem?.quantity).toFixed(2)}
                </p>

                <Trash onClick={() => handleCartItemDelete(cartItem)} className="cursor-pointer mt-1" size={20} />
            </div>

        </div>
    )
}

export default UserCartItemsContent;
