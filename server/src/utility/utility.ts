export const genCacheKey = (pattern, values: { [key: string]: string | number }): string => {
    let result = pattern;
    for (const [key, value] of Object.entries(values)) {
        result = result.replace(key, value);
    }
    return result;
};
