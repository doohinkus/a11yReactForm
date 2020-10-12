export const initialState = {
  fields: [{
       
            id: 0,
            type: "text",
            label: "",
            isReadyForValidation: false
        
   }],
   errors: [],
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
function filterFieldById({fields, id}){
    return fields.filter(field => field.id !== id);
}
function getFieldById({fields, id}){
    console.log("field by id>>", fields.filter(field => field.id === id)[0])
    return fields.filter(field => field.id === id)[0];
}

function updatedFieldData(state, action){
    return [
        ...filterFieldById({
            fields: state.fields, 
            id: action.payload.id
        }),
        
         {
             ...getFieldById({
                    fields: state.fields,
                    id: action.payload.id,
                }), 
                 ...action.payload
         }
    ]
}
function updatedErrorData(state, action){
    return [
        ...filterFieldById({
            errors: state.errors, 
            id: action.payload.id
        }),
        
         {
             ...getFieldById({
                    fields: state.fields,
                    id: action.payload.id,
                }), 
                 ...action.payload
         }
    ]
}

// ACTIONS
export const ACTIONS = {
  CHANGE_FIELD_VALUE: "CHANGE_FIELD_VALUE",
  VALIDATE_FIELD_VALUE: "VALIDATE_FIELD_VALUE",
  ADD_FIELD_ERROR: "ADD_FIELD_ERROR",
  CLEAR_FIELD_ERROR: "CLEAR_FIELD_ERROR",
}


// ACTION CREATORS
export function updateFieldValue({target}){
  return {
      type: ACTIONS.CHANGE_FIELD_VALUE,
      payload: {
        id: target.id,
        value: target.value,
        isReadyForValidation: true
      }
  }
}
export function addFieldError(payload){
  return {
      type: ACTIONS.ADD_FIELD_ERROR,
      payload: {
          id: payload.id,
          error: true,
          errorMessage: payload.errorMessage || null
      }
  }
}
export function clearFieldError(payload){
  return {
      type: ACTIONS.ADD_FIELD_ERROR,
      payload: {
          id: payload.id,
          error: false,
          errorMessage: null
      }
  }
}


// ROOT REDUCER
export const formReducer = (state, action) => {
    console.log(state, " ::: ", state.fields);

    switch (action.type) {
        case ACTIONS.CHANGE_FIELD_VALUE:
            case ACTIONS.CLEAR_FIELD_ERROR:
                return {
                    ...state,
                    fields: [...updatedFieldData(state, action)]
                };
            case ACTIONS.ADD_FIELD_ERROR:
                return {
                    ...state,
                    fields: [...updatedFieldData(state, action)],
                    // remove dups
                    errors: [
                        // ...updatedErrorData[state, action]
                        // ...state.errors,
                        {
                            id: action.payload.id,
                            errorMessage: action.payload.errorMessage || "Field error"
                        }
                    ]
                };
        default:
            return state    
    }
}