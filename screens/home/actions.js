export const changeProps = prop => ({
    type: "CHANGE_PROP",
    payload: prop
  });
  export const setLastWritings = login => ({
    type: "SET_LAST_ELEMENT",
    login: login
  });
  export const setFetchedUsers = users => ({
    type: "SET_FETCHED_USERS",
    users: users
  });