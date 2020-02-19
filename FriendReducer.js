import { combineReducers } from "redux";
const default_state = {
    current: 'current',
    possible: 'possible'
}

const exampleReducer = (state = default_state, action) => {
    switch (action.type) {
        case 'CHANGE_PROP': {
            const current = action.payload
            return Object.assign({},state,{current:current});
        }

        default: return state
    }
};


export default combineReducers({
    example: exampleReducer,
})