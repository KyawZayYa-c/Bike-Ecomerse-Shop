

import {Button} from "@/components/ui/button.jsx";
import {Minus, Plus, Trash} from "lucide-react";
import {useDispatch, useSelector} from "react-redux";
import {deleteCartItem, updateCartQuantity} from "@/store/shop/cart-slice/index.js";
import {useToast} from "@/components/ui/use-toast.jsx";

function UserCartItemsContent ({cartItems}){

    const {user} = useSelector((state) => state.auth);
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
                src={cartItems?.image}
                alt={cartItems?.title}
                className="w-20 h-20 rounded object-cover"
            />

            <div className="flex-1" >
                <h3 className="font-extrabold" >{cartItems?.title}</h3>
                <div className="flex items-center mt-1 gap-2 " >
                    <Button
                        variant="outline"
                        className="rounded-full"
                        size="icon"
                        disabled = {cartItems?.quantity <= 1}
                        onClick = {() => handleUpdateQuantity(cartItems, 'minus')}
                    >
                            <Minus className="w-8 h-8" />
                            <span className="sr-only">Decrease</span>
                    </Button>
                    <span className="font-semibold" >{cartItems?.quantity}</span>
                    <Button
                        variant="outline"
                        className="rounded-full"
                        size="icon"
                        onClick = {() => handleUpdateQuantity(cartItems, 'plus')}
                    >
                        <Plus className="w-8 h-8" />
                        <span className="sr-only">Increase</span>
                    </Button>
                </div>
            </div>

            <div clssName = "flex flex-col items-center">
                <p className="font-semibold">
                    ${((cartItems?.salePrice > 0 ? cartItems?.salePrice : cartItems?.price)*cartItems?.quantity).toFixed(2)}
                </p>

                <Trash onClick={() => handleCartItemDelete(cartItems)} className="cursor-pointer mt-1" size={20} />
            </div>

        </div>
    )
}

export default UserCartItemsContent;
