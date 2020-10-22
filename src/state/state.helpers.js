import { addFieldError, clearFieldError, initFieldValues, updateFieldValue } from '../state/form.duck';

export function handleBlur({dispatch, ...props}){
  console.log("FIELD VALUEs>> ", props)
  if(props && props.value && props.validate){
    if(!props.validate(props.value)){
      return dispatch(addFieldError(
          {
            name: props.name, 
            errorMessage: props.errorMessage || "default error message"
          })
        );
    }
    return dispatch(clearFieldError({name: props.name}));
  }
  return
}

const isTypeFunction = ({validate}) => typeof validate === "function";
const isValidField = ({validate, value}) => {
  // console.log("value:::>", value, validate)
   if(value){
     return validate(value);
    }
   return false;
 }


export function isCleanSubmit({fields}){
  if(fields){
    console.log("FIELD VALUEs>> ", fields, fields[fields.length - 1].value)
    // check for values in fields with validate
    // make array with validations
    const validFields = fields
       .filter(isTypeFunction)
       .filter(isValidField);

    const requiredFields = fields
      .filter(isTypeFunction);
      
    console.log("ValidFields: ", validFields, "Required ", requiredFields);
    if (validFields.length === requiredFields.length){
      return true;
    }
  }
  return false;
}


export const fieldValues = (fields, props) => fields.filter((field) => field.name === props.name)[0];


export function addField({...props}, dispatch){
  dispatch(initFieldValues({...props}));
}

export function setReadytoValidateTrue({fields, dispatch, errorMessage}){
  fields.forEach(({name, value, validate, errorMessage}) => {
    console.log("name>>", name, " value>>", value);
    dispatch(updateFieldValue({name, isReadyForValidation: true}));
    if(validate){
      if(!value){
        dispatch(addFieldError(
          {
            name, 
            errorMessage // || "default error message"
          })
        );
      } else if(!validate(value)){
        dispatch(addFieldError(
            {
              name, 
              errorMessage //|| "default error message"
            })
          );
      }
      
      // return dispatch(clearFieldError({name}));
    }


  })
}