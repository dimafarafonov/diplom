const default_state = {
  have_token: false,
  locations:{},
  position:{}
};

export default function (state = default_state, action) {
  switch (action.type) {
    case "RETRIEVE_DATA": {
        // console.log('action.type',action.payload)
      const bool = action.payload;
      return Object.assign({}, state, { have_token: bool });
    }
    case "GET_LOCATIONS": {
    //console.log('action.locations',action.locations)
    const locations = action.locations;
    return Object.assign({}, state, { locations: locations });
  }
  case "CURRENT_POS": {
    const position = action.position;
    return Object.assign({}, state, { position: position });
  }
    default:
      return state;
  }
}
