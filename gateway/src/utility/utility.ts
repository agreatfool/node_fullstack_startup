import * as Joi from "@hapi/joi";
import {IResponse} from "../controller/router";

export const buildResponse = <T>(code: number, data: T) => {
    return {
        code,
        data,
    } as IResponse<T>;
};

export const validateWithJoi = async (schema: Joi.AnySchema, data: any): Promise<{ error: Error, value: any }> => {
    try {
        return {
            error: undefined,
            value: await schema.validateAsync(data),
        };
    } catch (err) {
        return {
            error: err,
            value: undefined,
        };
    }
};

export const validateWithJoiMulti = async (data: Array<{ schema: Joi.AnySchema, data: any }>): Promise<Error> => {
    for (const pattern of data) {
        const {error} = await validateWithJoi(pattern.schema, pattern.data);
        if (error) {
            return error;
        }
    }
    return undefined;
};
