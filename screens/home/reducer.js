
const default_state = {
    current: "current",
    possible: "possible",
    login: "default"
  };

  export default function(state = default_state, action){
    switch (action.type) {
      case "CHANGE_PROP": {
        const current = action.payload;
        return Object.assign({}, state, { current: current });
      }
      case "SET_LAST_ELEMENT": {
        const login = action.login;
        return Object.assign({}, state, { login: login });
      }

      default:
        return state;
    }
  };


