const default_state = {
    coords:{}
  };



  export default function(state = default_state, action){
    switch (action.type) {
      case "SET_COORDS": {
        const coords = action.coords;
        return Object.assign({}, state, {coords: coords });
      }
      default:
        return state;
    }
  };