import {Joi} from "common";
import {IResponse} from "../controller/router";
import {ApiService} from "../service/api";

export const buildResponse = <T>(code: number, data: T) => {
    return {
        code,
        data,
    } as IResponse<T>;
};

export const validateWithJoi = async (schema: Joi.AnySchema, data: any): Promise<{ error: Error, value: any }> => {
    try {
        return {
            error: null,
            value: await schema.validateAsync(data),
        };
    } catch (err) {
        return {
            error: err,
            value: null,
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
    return null;
};

export const getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const handleReconnecting = async (err: Error) => { // true: reconnected; false: not connection error | not connected
    if (err.message.indexOf("14 UNAVAILABLE: failed to connect to all addresses") !== -1) {
        console.log("Gateway::handleReconnect, gRPC connection failed, start reconnecting ...");
        try {
            await ApiService.connect();
            return true;
        } catch (err) {
            return false;
        }
    } else {
        return false;
    }
};
