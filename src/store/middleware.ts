import types from "./actionTypes";


export const applyMiddleware = (dispatch) => (action) => {
  switch (action.type) {
    default:
      dispatch(action);
  }
};
