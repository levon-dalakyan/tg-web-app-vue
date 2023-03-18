import isObject from "lodash/isObject";
import isArray from "lodash/isArray";
import camelCase from "lodash/camelCase";
import snakeCase from "lodash/snakeCase";

export function keysToCamelCase(o) {
    if (isArray(o)) {
        return o.map((v) => keysToCamelCase(v));
    }

    if (isObject(o)) {
        const result = {};

        Object.keys(o).forEach(
            (v) => (result[camelCase(v)] = keysToCamelCase(o[v]))
        );

        return result;
    }

    return o;
}

export function keysToSnakeCase(o) {
    if (isArray(o)) {
        return o.map((v) => keysToSnakeCase(v));
    }

    if (isObject(o)) {
        const result = {};

        Object.keys(o).forEach(
            (v) => (result[snakeCase(v)] = keysToSnakeCase(o[v]))
        );

        return result;
    }

    return o;
}
