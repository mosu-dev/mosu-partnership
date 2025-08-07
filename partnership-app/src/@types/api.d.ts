declare type BaseResponse<T> = {
    status: number;
    message: string;
    data: T;
};

declare type BaseExceptionResponse = {
    status: number;
    message: string;
    code: string;
};
