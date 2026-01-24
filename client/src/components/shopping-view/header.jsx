import {Link, useNavigate} from "react-router-dom";
import {HousePlug, LogOut, Menu, ShoppingCart, UserCog} from "lucide-react";
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet.jsx";
import {Button} from "@/components/ui/button.jsx";
import {useDispatch, useSelector} from "react-redux";
import {shoppingViewHeaderMenuItems} from "@/config/index.js";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.jsx";
import {Avatar, AvatarFallback} from "@/components/ui/avatar.jsx";
import {logoutUser} from "@/store/auth_slice/index.js";
import UserCartWrapper from "@/components/shopping-view/cart-wrapper.jsx";
import {useEffect, useState} from "react";
import {fetchCartItems} from "@/store/shop/cart-slice/index.js";
import {Label} from "@/components/ui/label.jsx";

function MenuItmes(){
    const navigate = useNavigate();
    function handleNavigate(getCurrentMenuItem){
        sessionStorage.removeItem('filters');
        const currentFlters = getCurrentMenuItem.id !== 'home' ?
            {
                category : [getCurrentMenuItem.id]
            } : null

        sessionStorage.setItem('filters', JSON.stringify(currentFlters));
        navigate(getCurrentMenuItem.path);
    }

    return(
         <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row " >
             {
                 shoppingViewHeaderMenuItems.map(menuItem =>
                     <Label
                         onClick = {() => handleNavigate(menuItem)}
                         className="text-sm font-medium cursor-pointer "
                         key={menuItem.id}  >
                         {menuItem.label}
                     </Label>
                 )
             }
    </nav>
    )
}

function  HeaderRightContent(){
    const {user} = useSelector(state => state.auth);
    const {cartItems} = useSelector(state => state.shopCart);
    const [openCartSheet, setOpenCartSheet] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCartItems(user?.id))
    }, [dispatch]);

    function handleLogout(){
        dispatch(logoutUser());
    }

    return <div className="flex lg:items-center lg:flex-row flex-col gap-4" >
        <Sheet open={openCartSheet} onOpenChange = {() => setOpenCartSheet(false)} >
            <Button onClick={() => setOpenCartSheet(true)} variant="outline"  size="icon" >
                <ShoppingCart className=" w-6 h-6" />
                <span className="sr-only" >User cart</span>
            </Button>
            <UserCartWrapper
                cartItems={
                cartItems && cartItems.items && cartItems.items.length > 0 ? cartItems.items : []}   />
        </Sheet>

        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className="" >
                    <AvatarFallback className="bg-black w-15 h-15 flex items-center pb-6 justify-center rounded-full text-white font-extrabold" >
                        {user?.userName[0].toUpperCase()}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" className="w-50" >
                <DropdownMenuLabel>Logged in as {user?.userName} </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick = {() => navigate("/shop/account")}  >
                    <UserCog className="mr-3 h-4 w-4" />
                    Account
                </DropdownMenuItem>
                <DropdownMenuSeparator  />
                <DropdownMenuItem onClick = {handleLogout} >
                    <LogOut className="mr-3 h-4 w-4" />
                    Logout
                </DropdownMenuItem>
                <DropdownMenuSeparator />
            </DropdownMenuContent>

        </DropdownMenu>
    </div>
}

function ShoppingHeader(){
    const {isAuthenticated, user} = useSelector(state => state.auth);

    return(
        <header className="sticky top-0 z-40 w-full border-b bg-background " >
            <div className="flex h-16 items-center justify-between px-4 md:px-6" >
                <Link to="/shop/home" className="flex items-center gap-2" >
                <HousePlug className="h-6 w-6" />
                <span className="font-bold" >Ecommerce</span>
                 </Link>
                <Sheet>
                    <SheetTrigger asChild >
                        <Button variant="outline" size="icon" className="lg:hidden" >
                            <Menu className="h-6 w-6 " />
                            <span className="sr-only" >Toggle header menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-full max-w-xs p-4" >
                        <MenuItmes />
                        <HeaderRightContent />
                    </SheetContent>
                </Sheet>
                <div className="hidden lg:block">
                    <MenuItmes />
                </div>
                {isAuthenticated ? <div className="hidden lg:block" >
                    <HeaderRightContent  />
                </div> : null}
            </div>
        </header>
    )
}

export  default ShoppingHeader;
