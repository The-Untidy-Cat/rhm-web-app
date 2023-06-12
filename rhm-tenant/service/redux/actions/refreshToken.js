export const setRefreshToken = (refreshToken) => {
    return {
        type: "SET_REFRESH_TOKEN",
        refreshToken: refreshToken
    };
};

export const deleteRefreshToken = () => {
    return {
        type: "DELETE_REFRESH_TOKEN",
    };
};