export class BaseResponse {
    static of(statusCode, message, options = {}) {
        const { data } = options;
        return {
            statusCode,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: statusCode, message, data }),
        };
    }
}
