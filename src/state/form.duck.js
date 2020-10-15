export const initialState = {
  fields: [],
//    errors: [],
   submitShape: function (){
       return {
           fields: [
               ...this.fields,
               // overwrite values here
            ]
    }
       // however java need variables
   }
}

// HELPERS
function filterFieldByName({fields, name}){
    return fields.filter(field => field.name !== name);
}
function getFieldByName({fields, name}){
    // console.log("field by name>>", fields.filter(field => field.name === name)[0])
    return fields.filter(field => field.name === name)[0];
}



function updatedFieldData(state, action){
    return [
        ...filterFieldByName({
            fields: state.fields, 
            name: action.payload.name
        }),
        
         {
             ...getFieldByName({
                    fields: state.fields,
                    name: action.payload.name,
                }), 
                 ...action.payload
         }
    ]
}

function removeFieldByName(state, action){
    return [
        ...filterFieldByName({
            fields: state.fields, 
            name: action.payload.name
        })
    ]
}


// ACTIONS
export const ACTIONS = {
  CHANGE_FIELD_VALUE: "CHANGE_FIELD_VALUE",
  VALIDATE_FIELD_VALUE: "VALIDATE_FIELD_VALUE",
  ADD_FIELD_ERROR: "ADD_FIELD_ERROR",
  CLEAR_FIELD_ERROR: "CLEAR_FIELD_ERROR",
  REMOVE_FIELD_VALUE: "REMOVE_FIELD_VALUE",
}


// ACTION CREATORS

export function initFieldValues({...props}){
  return {
      type: ACTIONS.CHANGE_FIELD_VALUE,
      payload: {
        ...props,
        children: props 
           && props.children 
           ? {...props.children.map(({props}) => ({...props}))} 
           : null

      }
  }
}

export function removeFieldValues({...props}){
    console.log("PROPS>>>>", ...props)
    return {
        type: ACTIONS.REMOVE_FIELD_VALUE,
        payload: {
        ...props
        }
    }
}

export function updateFieldValue({target}){
    // use props
  return {
      type: ACTIONS.CHANGE_FIELD_VALUE,
      payload: {
        name: target.name,
        value: target.value,
        isReadyForValidation: true
      }
    }
}

export function addFieldError(payload){
  return {
      type: ACTIONS.ADD_FIELD_ERROR,
      payload: {
          name: payload.name,
          error: true,
          errorMessage: payload.errorMessage || null
      }
  }
}
export function clearFieldError(payload){
  return {
      type: ACTIONS.ADD_FIELD_ERROR,
      payload: {
          name: payload.name,
          error: false,
          errorMessage: null
      }
  }
}


// ROOT REDUCER
export const formReducer = (state, action) => {
    // console.log(state, " ::: ", state.fields);

    switch (action.type) {
        case ACTIONS.CHANGE_FIELD_VALUE:
        case ACTIONS.CLEAR_FIELD_ERROR:
        case ACTIONS.ADD_FIELD_ERROR:
            return {
                ...state,
                fields: [...updatedFieldData(state, action)]
            };
        case ACTIONS.REMOVE_FIELD_VALUE:
            return {
                ...state,
                fields: [...removeFieldByName(state, action)]
            }
          
        //         return {
        //             ...state,
        //             fields: [...updatedFieldData(state, action)],
        //             // remove dups
        //             errors: [
        //                 ...state.errors.filter(error => error.name !== action.payload.name),
        //                 {
        //                     // name: action.payload.name,
        //                     // errorMessage: action.payload.errorMessage || "Field error"
        //                     ...action.payload
        //                 }
        //             ]
        //         };
        default:
            return state    
    }
}