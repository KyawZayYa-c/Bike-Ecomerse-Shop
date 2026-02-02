import './App.css'
import AuthLogin from "@/pages/auth/login.jsx";

import AuthRegister from "@/pages/auth/register.jsx";
import AuthLayout from "@/components/auth/layout.jsx";
import {Routes, Route} from "react-router-dom";
import AdminLayout from "@/components/admin-view/layout.jsx";
import AdminDashboard from "@/pages/admin-view/dashboard.jsx";
import Adminproducts from "@/pages/admin-view/products.jsx";
import AdminOrders from "@/pages/admin-view/orders.jsx";
import AdminFeatures from "@/pages/admin-view/features.jsx";
import ShoppingLayout from "@/components/shopping-view/layout.jsx";
import NotFound from "@/pages/not-found/index.jsx";
import ShoppingHome from "@/pages/shopping-view/home.jsx";
import ShoppingListing from "@/pages/shopping-view/listing.jsx";
import ShoppingCheckout from "@/pages/shopping-view/checkout.jsx";
import ShoppingAccount from "@/pages/shopping-view/account.jsx";
import CheckAuth from "@/components/common/check-auth.jsx";
import UnauthPage from "@/pages/unauth-page/index.jsx";
import {useDispatch, useSelector} from "react-redux";
import {checkAuth} from "@/store/auth_slice/index.js";
import {useEffect} from "react";
import { Skeleton } from "@/components/ui/skeleton"
import PaypalReturnPage from "@/pages/shopping-view/paypal-return.jsx";
import PaymentSuccessPage from "@/pages/shopping-view/payment-success.jsx";
import SearchProducts from "@/pages/shopping-view/search.jsx";



function App() {

    const {user, isAuthenticated, isLoading } = useSelector(state => state.auth);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(checkAuth())
    }, [dispatch])

    if(isLoading) return <Skeleton className="h-[600px] w-[600px] bg-black " />
    console.log(isLoading, user)
  return (
        <div className="flex flex-col overflow-hidden bg-white" >
            <Routes>
                <Route
                        path="/"
                        element= {
                    <CheckAuth isAuthenticated = { isAuthenticated} user = { user }  >

                    </CheckAuth>
                }
                    />

                <Route path="/auth" element={
                    <CheckAuth isAuthenticated = { isAuthenticated} user = { user }  >
                        <AuthLayout />
                    </CheckAuth>
                } >
                    <Route path="login" element ={< AuthLogin /> } />
                    <Route path="register" element ={< AuthRegister /> } />
                </Route>

                <Route path="/admin" element={
                    <CheckAuth isAuthenticated = { isAuthenticated } user = { user }  >
                        <AdminLayout />
                    </CheckAuth>
                } >
                    <Route path="dashboard" element={ <AdminDashboard /> } />
                    <Route path="products" element={ <Adminproducts /> } />
                    <Route path="orders" element={ <AdminOrders /> } />
                    <Route path="features" element={ <AdminFeatures /> } />
                </Route>

                <Route path="/shop" element={
                    <CheckAuth isAuthenticated = { isAuthenticated } user = { user }  >
                        <ShoppingLayout />
                    </CheckAuth>
                } >
                    <Route path="home" element={ <ShoppingHome /> } />
                    <Route path="listing" element={ <ShoppingListing /> } />
                    <Route path="checkout" element={ <ShoppingCheckout /> } />
                    <Route path="account" element={ <ShoppingAccount /> } />
                    <Route path="paypal-return" element={ <PaypalReturnPage /> } />
                    <Route path="payment-success" element={ <PaymentSuccessPage /> } />
                    <Route path="search" element={ <SearchProducts /> } />
                </Route>

                <Route path="/unauth-page" element={ <UnauthPage /> } />

                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
  )
}

export default App;

