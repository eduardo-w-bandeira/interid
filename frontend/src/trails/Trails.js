export function camelToSnake(str) {
    return str.replace(/([A-Z])/g, function (match) {
        return "_" + match.toLowerCase();
    });
}

export const pascalToKebab = (str) => {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
};

export const pageNameToKebab = (name) => {
    let removePageSuffix = name.replace('Page', '');
    return pascalToKebab(removePageSuffix);
};

export const getCredentials = () => {
    const accessToken = localStorage.getItem('access_token');
    const isLoggedIn = accessToken ? true : false;
    let userData = localStorage.getItem('user_data');
    if (userData) {
        userData = JSON.parse(userData);
    };
    return {
        isLoggedIn: isLoggedIn,
        refreshToken: localStorage.getItem('refresh_token'),
        accessToken: localStorage.getItem('access_token'),
        userData: userData
    };
};