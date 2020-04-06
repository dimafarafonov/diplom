const default_state = {
  have_token: false,
};

export default function (state = default_state, action) {
  switch (action.type) {
    case "RETRIEVE_DATA": {
        console.log('action.type',action.payload)
      const bool = action.payload;
      return Object.assign({}, state, { have_token: bool });
    }
    default:
      return state;
  }
}
