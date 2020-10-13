import { addFieldError, clearFieldError } from '../state/form.duck';

export function handleBlur({fieldValues, errorMessage, validate, dispatch}){
  if(fieldValues && fieldValues.value && validate){
    if(validate(fieldValues.value)){
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

export const fieldValues = (fields, props) => fields.filter((field) => field.name === props.name)[0];
  