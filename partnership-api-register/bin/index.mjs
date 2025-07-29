import { handler } from "../src/index.mjs";

const registerPayload = {
    examDate: "2025-07-29",
    orgName: "모수학원",
    password: "1234",
    userName: "김모수",
    gender: "MALE",
    birth: "2000-01-01",
    phoneNumber: "010-1234-5678",
    subject: "생활과 윤리",
    subject2: "화학Ⅱ",
    lunch: true,
    area: "대구",
    schoolName: "대치중학교",
    admissionTicket: {
        fileName: "example.jpg",
        s3Key: "비공개 이미지를 처리하기 위한 키",
    },
};

// @ts-ignore
handler({
    httpMethod: "POST",
    body: JSON.stringify(registerPayload),
    headers: {
        "Content-Type": "application/json",
    },
});
