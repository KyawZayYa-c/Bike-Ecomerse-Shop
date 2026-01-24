import {Label} from "@radix-ui/react-label";
import {Input} from "@/components/ui/input.jsx";

import {Button} from "@/components/ui/button.jsx";
import {Textarea} from "@/components/ui/textarea.jsx";
import {Select, SelectContent, SelectItem, SelectValue, SelectTrigger } from "@/components/ui/select.jsx";

function CommonForm({formControls, formData, setFormData, onSubmit, buttonText , isBtnDisabled}){

    function renderInputsByComponentType(getControlItem){
        let element = null;
        const value = formData[getControlItem.name] || "";
        switch (getControlItem.componentType){
            case'input':
                element = (<Input className="h-10"
                    name = {getControlItem.name}
                    type={getControlItem.type}
                    id = {getControlItem.name}
                    placeholder={getControlItem.placeholder}
                    value = {value}
                    onChange = {event => setFormData({
                        ...formData,
                        [getControlItem.name]: event.target.value
                    })}
                />)
                break;
            case'select':
                element = (
                    <Select className="h-10" onValueChange={
                        (value) => setFormData({
                        ...formData,
                        [getControlItem.name] : value
                             })} value={value} >
                        <SelectTrigger className = 'w-full  ' >
                            <SelectValue placeholder = {getControlItem.label}/>
                        </SelectTrigger>
                        <SelectContent>
                            {
                                getControlItem.options && getControlItem.options.length > 0
                                ? getControlItem.options.map(optionItem => (
                                    <SelectItem key={optionItem.id} value={optionItem.id} >
                                        {optionItem.label}
                                    </SelectItem>
                                    ))
                                    : null
                            }
                        </SelectContent>
                    </Select>
                )
                break;
            case'textarea':
                element = (
                    <Textarea
                        name={getControlItem.name}
                        placeholder = {getControlItem.placeholder}
                        id = {getControlItem.id}
                        value = {value}
                        onChange = {event => setFormData({
                            ...formData,
                            [getControlItem.name]: event.target.value
                        })}
                    />

                )
                break;
        default :
            element =( <Input className="h-10"
                name = {getControlItem.name}
                type={getControlItem.type}
                id = {getControlItem.name}
                placeholder={getControlItem.placeholder}
                value = {value}
                onChange = {event => setFormData({
                    ...formData,
                    [getControlItem.name]: event.target.value
                })}
            />)
            break;
        }

        return element;
    }

    return (
        <div className="mx-auto w-full" >
            <form onSubmit={onSubmit} >
                <div className="flex flex-col gap-3 " >
                    {
                        formControls.map(controlItem => (
                            <div className="flex flex-col items-start  gap-1.5" key={controlItem.label}>
                                <Label className="mb-1" >{controlItem.label}</Label>
                                {
                                    renderInputsByComponentType(controlItem)
                                }
                            </div>
                        ))
                    }
                </div>
                <Button disabled={isBtnDisabled} type="submit" className='mt-4  w-full' >{buttonText || 'Submit'}</Button>
            </form>
        </div>

    )

}

export default CommonForm;
