export const initialState = {
  fields: [{
       
            id: 0,
            type: "text",
            label: "",
            isReadyForValidation: false
            // rank: 0,
            // validationFunction: n => console.log(n),
            // error: false,
            // errorMessage: "",
            // value: "",
            // defaultClasses:[],
            // omvClasses:[],
        
   }],
   errors: [{
       field: {
           id: 0,
           rank: 0,
           errorMessage: ""
       }
   }],
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
    console.log("filed by id>>", fields.filter(field => field.id === id)[0])
    return fields.filter(field => field.id === id)[0];
}

// ACTIONS
export const ACTIONS = {
  CHANGE_FIELD_VALUE: "CHANGE_FIELD_VALUE",
  VALIDATE_FIELD_VALUE: "VALIDATE_FIELD_VALUE"
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
export function validateFieldValue({target, validationFunction}){

//   return {
//       type: ACTIONS.VALIDATE_FIELD_VALUE,
//       payload: {
//         id: target.id,
//         value: target.value,
//         isClean: false
//       }
//   }
}


// ROOT REDUCER
export const formReducer = (state, action) => {
    console.log(state, " ::: ", state.fields);

    switch (action.type) {
        case ACTIONS.CHANGE_FIELD_VALUE:
          return {
            ...state,
            fields: [
                ...filterFieldById({
                    fields: state.fields, 
                    id: action.payload.id
                }),
                
                 {
                     ...getFieldById({
                            fields: state.fields,
                            id: action.payload.id
                      }), 
                     ...action.payload
                 }
                
            ]
            
          };
        default:
            return state    
    }
}