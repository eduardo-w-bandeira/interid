export function camelToSnake(str) {
    return str.replace(/([A-Z])/g, function (match) {
        return "_" + match.toLowerCase();
    });
}

export const pascalToKebab = (str) => {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
};

export const getCredentials = () => {
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');
    const userDataStr = localStorage.getItem('user_data');
    let userData = null;
    if (userDataStr) {
        userData = JSON.parse(userDataStr);
    };
    return {
        accessToken: accessToken,
        refreshToken: refreshToken,
        userData: userData
    };
};