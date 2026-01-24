import {Link} from "react-router-dom";
import CommonForm from "@/components/common/form.jsx";
import {loginFormControls, registerFormControls} from "@/config/index.js";
import {useDispatch, useStore} from "react-redux";
import {useState} from "react";
import {loginUser} from "@/store/auth_slice/index.js";
import {useToast} from "@/components/ui/use-toast.jsx";

const initialState = {
    email : "",
    password: "",
}


function AuthLogin() {
    const [formData, setFormdata] = useState(initialState);

    const dispatch = useDispatch();
    const {toast} = useToast();

    function  onSubmit(event){
        event.preventDefault();
        dispatch(loginUser(formData)).then( data => {
            if(data?.payload?.success){
                toast({
                    title : data?.payload?.message,
                })
            }else{
                toast({
                    title : data?.payload?.message,
                    variant: "destructive",
                })
            }
        })
    }
    return (
        <div className="mx-auto w-full max-w-md space-y-6 text-center" >
            <div className="text-center" >
                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                    Sign in to your account
                </h1>
                <p className="mt-2" >
                    Don't have an account
                    <Link className="font-medium ml-2 text-primary hover:underline" to ="/auth/register" >
                        Register
                    </Link>

                </p>
            </div>

            <CommonForm
                formControls={loginFormControls}
                buttonText = {"Sign In"}
                formData={formData}
                setFormData={setFormdata}
                onSubmit={onSubmit}
            />
        </div>

    )
}

export default AuthLogin ;
