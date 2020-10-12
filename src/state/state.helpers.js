import { addFieldError, clearFieldError } from '../state/form.duck';

export function handleBlur({fieldValues, errorMessage, validate, dispatch}){
  if(fieldValues && fieldValues.value && validate){
    if(validate(fieldValues.value)){
      return dispatch(addFieldError(
          {
            id: fieldValues.id, 
            errorMessage: errorMessage || "default error message"
          })
        );
    }
    return dispatch(clearFieldError({id: fieldValues.id}));
  }
  return
}