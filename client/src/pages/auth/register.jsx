import {Link, useNavigate} from "react-router-dom";
import CommonForm from "@/components/common/form.jsx";
import {registerFormControls} from "@/config/index.js";
import {useDispatch, useStore} from "react-redux";
import {useState} from "react";
import {registerUser} from "@/store/auth_slice/index.js";
import {useToast} from "@/components/ui/use-toast.jsx";

const initialState = {
    username: "",
    email: "",
    password: "",
}


function AuthRegister() {
    const [formData, setFormdata] = useState(initialState);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {toast} = useToast();

    function onSubmit(event) {
        event.preventDefault();
        dispatch(registerUser(formData)).then((data) => {
            if (data?.payload?.success) {
                toast({
                    title: data?.payload?.message,
                })
            } else {
                toast({
                    title: data?.payload?.message,
                    variant: "destructive",
                })
            }
        })
    }

    return (
        <div className="mx-auto w-full max-w-md space-y-6 text-center">
            <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                    Create new account
                </h1>
                <p className="mt-2">
                    Already have an account
                    <Link className="font-medium ml-2 text-primary hover:underline" to="/auth/login">
                        Login
                    </Link>

                </p>
            </div>

            <CommonForm
                formControls={registerFormControls}
                buttonText={"Sign up"}
                formData={formData}
                setFormData={setFormdata}
                onSubmit={onSubmit}
            />
        </div>

    )
}

export default AuthRegister;
