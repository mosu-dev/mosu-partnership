import { BaseResponse } from "./utils/BaseResponse.mjs";

/**
 * @param {import("aws-lambda").APIGatewayEvent} event
 * @returns {Promise<import("aws-lambda").APIGatewayProxyResult>}
 */
export async function handler(event) {
    const payload = JSON.parse(event.body || "{}");

    return BaseResponse.of(201, "파트너십 모의수능 신청이 성공적으로 접수되었습니다.", {
        data: payload,
    });
}
