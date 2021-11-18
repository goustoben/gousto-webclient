import {snakeCase} from "lodash";

function isObjectOrArray(childValue: any): boolean {
    return typeof childValue === 'object' || Array.isArray(childValue);
}

function conditionallyTransform(childValue: any, transformer: (string?: string) => string): any {
    return isObjectOrArray(childValue) ? recursivelyTransformPropertyNames(childValue, transformer) : childValue;
}

function recursivelyTransformPropertyNames(value: any, transformer: (string?: string) => string): any {
    if (Array.isArray(value)) {
        return value.map(childValue => conditionallyTransform(childValue, transformer));
    }

    if (typeof value === 'object') {
        return Object.entries(value).reduce((accumulator, [key, childValue]) => ({
            ...accumulator,
            [transformer(key)]: conditionallyTransform(childValue, transformer)
        }), {});
    }

    return value
}

export function withSnakeCaseProperties(value: any): any {
    return recursivelyTransformPropertyNames(value, snakeCase);
}
