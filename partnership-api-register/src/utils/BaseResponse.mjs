export class BaseResponse {
    constructor(statusCode, body) {
        this.statusCode = statusCode;
        this.body = body;
    }

    /**
     * @param {Number} statusCode
     * @param {Record<string,unknown>} body
     */
    static of(statusCode, body) {
        return new BaseResponse(statusCode, body);
    }
}
