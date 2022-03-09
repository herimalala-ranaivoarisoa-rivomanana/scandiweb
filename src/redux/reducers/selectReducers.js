import {SELECT_LIST_SUCCESS, SELECT_LIST_REQUEST, SELECT_LIST_FAIL, 
} from '../constants/selectConstant'

function selectListReducer(state = {selects:[]}, action){
 switch (action.type){
     case SELECT_LIST_REQUEST:
         return {loading:true,selects:[]};
     case SELECT_LIST_SUCCESS:
         return {loading:false, selects:action.payload};
     case SELECT_LIST_FAIL:
         return {loading :false, error:action.payload}
     default:
         return state
 }
}

export {selectListReducer}