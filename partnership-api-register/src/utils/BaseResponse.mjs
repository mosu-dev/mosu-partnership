export class BaseResponse {
    static of(statusCode, message, { data }) {
        return {
            statusCode,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: statusCode, message, data }),
        };
    }
}
