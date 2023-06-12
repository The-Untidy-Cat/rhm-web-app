export const refreshToken = (refreshToken = null, action) => {
  switch (action.type) {
    case "SET_REFRESH_TOKEN":
      return refreshToken = action.refreshToken; 
    case "DELETE_REFRESH_TOKEN":
      return refreshToken = null;
    default:
      return refreshToken = null;
  }
};
export default refreshToken