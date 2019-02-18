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
    case "checkLogin": {
      const token = localStorage.getItem("token");
      if (!token) {
        return appReducer(null, { type: "logoutHandler" });
      } else {
        return appReducer(null, { type: "loginHandler" });
      }
    }
    default:
      break;
  }
};
