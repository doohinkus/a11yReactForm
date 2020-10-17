import { addFieldError, clearFieldError, initFieldValues } from '../state/form.duck';

export function handleBlur({fieldValues, errorMessage, validate, dispatch}){
  console.log("FIELD VALUEs>> ", fieldValues)
  if(fieldValues && fieldValues.value && validate){
    if(!validate(fieldValues.value)){
      return dispatch(addFieldError(
          {
            name: fieldValues.name, 
            errorMessage: errorMessage || "default error message"
          })
        );
    }
    return dispatch(clearFieldError({name: fieldValues.name}));
  }
  return
}
export function isCleanSubmit({fieldValues, dispatch}){
  if(fieldValues){
    console.log("FIELD VALUEs>> ", fieldValues, fieldValues[fieldValues.length - 1].value)
    // check for values in fields with validate
    // make array with validations
    const hasValidFields = fieldValues
       .filter(({validate}) => typeof validate === "function")
       .map(({validate, value}) => {
        console.log("value:::>", value, validate)
         if(value){
           return validate(value);
          }
         return false;
       })

    console.log("hasValidFields: ", hasValidFields)
  }
  return false
}


export const fieldValues = (fields, props) => fields.filter((field) => field.name === props.name)[0];


export function addField({...props}, dispatch){
  dispatch(initFieldValues({...props}));
}

  