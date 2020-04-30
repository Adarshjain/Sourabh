export function getSplicedArray<T>(arr: Array<T>, index: number): Array<T> {
    return [...arr.slice(0, index), ...arr.slice(index + 1)];
}

export function replaceArrayAt<T>(arr: Array<T>, index: number, value: T): Array<T> {
    return [...arr.slice(0, index), value, ...arr.slice(index + 1)];
}

export function pushToArray<T>(arr: Array<T>, value: T | Array<T>): Array<T> {
    if (Array.isArray(value)) {
        return [...arr, ...value];
    }
    return [...arr, value];
}

