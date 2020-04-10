
const default_state = {
    current: "current",
    possible: "possible",
    login: "default",
    users:[]
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
      case "SET_FETCHED_USERS": {
        const users = action.users;
        return Object.assign({}, state, { users: users });
      }

      default:
        return state;
    }
  };


