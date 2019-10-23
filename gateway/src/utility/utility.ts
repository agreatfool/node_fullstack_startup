import {IResponse} from "../controller/router";

export const buildResponse = <T>(code: number, data: T) => {
    return {
        code,
        data,
    } as IResponse<T>;
};
