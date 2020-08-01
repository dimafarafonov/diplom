const default_state = {
  have_token: false,
  locations: [],
  position: {},
  comments: {},
};
export default function (state = default_state, action) {
  switch (action.type) {
    case "RETRIEVE_DATA": {
      const bool = action.payload;
      return Object.assign({}, state, { have_token: bool });
    }
    case "GET_LOCATIONS": {
      const locations = action.locations;
      return Object.assign({}, state, { locations: locations });
    }
    case "GET_COMMENTS": {
      const comments = action.comments;
      return Object.assign({}, state, { comments: comments });
    }
    case "CURRENT_POS": {
      const position = action.position;
      return Object.assign({}, state, { position: position });
    }
    default:
      return state;
  }
}
