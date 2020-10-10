export const initialState = {
  fields: [{
       
            id: 0,
            type: "text",
            label: "",
            // rank: 0,
            // validationFunction: n => console.log(n),
            // error: false,
            // errorMessage: "",
            // value: "",
            // defaultClasses:[],
            // omvClasses:[],
            // isClean: true
        
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


export const ACTIONS = {
  CHANGE_FIELD_VALUE: "CHANGE_FIELD_VALUE"
}
function filterFieldById({fields, id}){
    return fields.filter(field => field.id !== id);
}
function getFieldById({fields, id}){
    return fields.filter(field => field.id === id)[0];
}

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
                     id: action.payload.id,
                     value: action.payload.value
                 }
                
            ]
            
          };
        default:
            return state    
    }
}