import { BaseResponse } from "./utils/BaseResponse.mjs";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { isValidPayload } from "./utils/isValidPayload.mjs";

const MOSU_PARTNERSHIP_TABLE_NAME = "mosu-partnership";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

/**
 * @param {import("aws-lambda").APIGatewayEvent} event
 * @returns {Promise<import("aws-lambda").APIGatewayProxyResult>}
 */
export async function handler(event) {
    const payload = JSON.parse(event.body || "{}");

    if (!isValidPayload(payload)) {
        return BaseResponse.of(400, "잘못된 요청입니다. 필수 필드가 누락되었거나 잘못되었습니다.", {
            data: payload,
        });
    }

    try {
        const command = new PutCommand({
            TableName: MOSU_PARTNERSHIP_TABLE_NAME,
            Item: {
                id: crypto.randomUUID(),
                ...payload,
            },
        });
        await docClient.send(command);

        return BaseResponse.of(201, "파트너십 모의수능 신청이 성공적으로 접수되었습니다.", {
            data: payload,
        });
    } catch (error) {
        return BaseResponse.of(500, "서버 오류가 발생했습니다. 나중에 다시 시도해주세요.");
    }
}
