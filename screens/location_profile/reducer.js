const default_state = {
    comments:{}

  };

  export default function (state = default_state, action) {
    switch (action.type) {
    case "getComments": {
      const comments = action.comments;
      return Object.assign({}, state, { comments: comments });
    }
      default:
        return state;
    }
  }
