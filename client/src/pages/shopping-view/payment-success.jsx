import {Card, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {Button} from "@/components/ui/button.jsx";
import {useNavigate} from "react-router-dom";


function PaymentSuccessPage(){
    const navigate = useNavigate();
    return(
        <Card className={"flex mt-5 items-start justify-start p-5"}>
            <CardHeader className={'w-full text-left p-0'}>
                <CardTitle className={'text-4xl'}>Payment is successfull...</CardTitle>
            </CardHeader>
            <Button
                onClick = {() => navigate('/shop/account')} >View Orders</Button>
        </Card>
    )
}

export default PaymentSuccessPage;