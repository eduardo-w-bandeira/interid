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

export const loadPages = async (ignorePrivate = true) => {
    // Use import.meta.glob to import all .jsx files in the specified directory
    const pages = import.meta.glob('../pages/**/*.jsx');

    // Create an object to hold the component mappings
    const components = {};

    // Iterate over the pages object
    for (const path in pages) {
        // Extract the function name from the file path
        const functionName = path.split('/').pop().replace('.jsx', '');

        // Ignore private functions
        if (ignorePrivate && functionName.startsWith('_')) {
            continue;
        };

        // Dynamically import the component
        const module = await pages[path]();
        components[functionName] = module.default; // Assuming the default export is the component
    }

    return components;
};