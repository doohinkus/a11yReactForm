export const initialState = {
  fields: [{
       
            name: 0,
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
function filterFieldById({fields, name}){
    return fields.filter(field => field.name !== name);
}
function getFieldById({fields, name}){
    console.log("field by name>>", fields.filter(field => field.name === name)[0])
    return fields.filter(field => field.name === name)[0];
}

function updatedFieldData(state, action){
    return [
        ...filterFieldById({
            fields: state.fields, 
            name: action.payload.name
        }),
        
         {
             ...getFieldById({
                    fields: state.fields,
                    name: action.payload.name,
                }), 
                 ...action.payload
         }
    ]
}
function updatedErrorData(state, action){
    return [
        ...filterFieldById({
            errors: state.errors, 
            name: action.payload.name
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
                            name: action.payload.name,
                            errorMessage: action.payload.errorMessage || "Field error"
                        }
                    ]
                };
        default:
            return state    
    }
}