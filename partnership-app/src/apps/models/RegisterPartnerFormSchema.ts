import { z } from "zod";

export const SUBJECT_VALUES = [
    "생활과 윤리",
    "윤리와 사상",
    "한국지리",
    "세계지리",
    "동아시아사",
    "세계사",
    "경제",
    "정치와 법",
    "사회와 문화",
    "물리학Ⅰ",
    "화학Ⅰ",
    "생명과학Ⅰ",
    "지구과학Ⅰ",
    "물리학Ⅱ",
    "화학Ⅱ",
    "생명과학Ⅱ",
    "지구과학Ⅱ",
];

export const RegisterPartnerFormSchema = z.object({
    examDate: z.object({
        year: z.number().int(),
        month: z.number().int(),
        date: z.number().int(),
    }),
    examArea: z.string({
        message: "응시 지역을 선택해주세요.",
    }),

    orgName: z.string().min(1, { message: "제휴 업체명을 입력해주세요." }),
    gender: z.enum(["남자", "여자"], { message: "성별을 선택해주세요." }),
    userName: z.string().min(1, { message: "이름을 입력해주세요." }),
    birth: z.string().min(1, { message: "생년월일을 입력해주세요." }),
    phoneNumber: z.string().min(1, { message: "전화번호를 입력해주세요." }),
    examApplication: z.object({
        examId: z.number({
            message: "응시 학교를 선택해주세요.",
        }),
        isLunchChecked: z.boolean({ message: "점심 여부를 선택해주세요." }),
    }),
    subjects: z.array(z.enum(SUBJECT_VALUES)).min(1, { message: "탐구 과목을 선택해주세요." }),
    admissionTicket: z.object({
        fileName: z.string(),
        s3Key: z.string(),
    }),
});

export type RegisterPartnerFormSchemaType = z.infer<typeof RegisterPartnerFormSchema>;
