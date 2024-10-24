export function camelToSnake(str) {
    return str.replace(/([A-Z])/g, function(match) {
        return "_" + match.toLowerCase();
    });
}

export function keysToSnake(ob) {
    if (ob === null) {
        return ob;
    }

    if (Array.isArray(ob)) {
        return ob.map(keysToSnake);
    }

    return Object.keys(ob).reduce((accumul, key) => {
        const snakeKey = camelToSnake(key);
        accumul[snakeKey] = keysToSnake(ob[key]);
        return accumul;
    }, {});
}