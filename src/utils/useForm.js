import { useState } from "react";
// button type="button" on form elements
export const useForm = (initialFormData={}) => {
    const [formData, updateFormData] = useState(initialFormData)

    const checkValidationError = () =>{
        const keys = Object.keys(formData)
        const isvalid = keys.every(key => {
            if(formData[key]?.errorMessage === ""){
                return true;
            }
            return false;
        })
        return isvalid;
    }


    const handleField = (e, schema) =>{
        let errorMessage = ""
        if(schema){
            try {
                schema.validateSync(e.target.value)
            } catch (error) {
                errorMessage = error.message
            }
        }


        
        updateFormData({
            ...formData, 
            [e.target.name]: {
                value: e.target.value,
                errorMessage,
            }
        })
    };

    return {formData, handleField, checkValidationError}
}