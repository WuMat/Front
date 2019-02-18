export const appReducer = (state, action) => {
  switch (action.type) {
    case "loginHandler": {
      return { isAuth: true };
    }
    case "logoutHandler": {
      localStorage.removeItem("token");
      localStorage.removeItem("expirationDate");
      localStorage.removeItem("user");
      return { isAuth: false };
    }
    default:
      break;
  }
};
