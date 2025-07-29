import z from "zod";

export const RegisterFormSchema = z.object({
    examDate: z.string().min(1, { message: "응시 날짜를 선택해주세요." }),
    orgName: z.string().min(1, { message: "제휴 업체명을 입력해주세요." }),
    password: z.string().min(1, { message: "본인확인을 위한 비밀번호를 입력해주세요." }),
    userName: z.string().min(1, { message: "이름을 입력해주세요." }),
    gender: z.enum(["MALE", "FEMALE"], { message: "성별을 선택해주세요." }),
    birth: z.string().min(1, { message: "생년월일을 입력해주세요." }),
    phoneNumber: z.string().min(1, { message: "전화번호를 입력해주세요." }),
    subject: z.string().min(1, { message: "탐구 과목을 선택해주세요." }),
    subject2: z.string().min(1, { message: "탐구 과목을 선택해주세요." }),
    lunch: z.boolean({ message: "점심 여부를 선택해주세요." }),
    area: z.string().min(1, { message: "응시 지역을 선택해주세요." }),
    schoolName: z.string().min(1, { message: "학교명을 입력해주세요." }),
    admissionTicket: z.object({
        fileName: z.string().min(1, { message: "수험표 사진을 업로드해주세요" }),
        s3Key: z.string().min(1, { message: "수험표 사진을 업로드해주세요" }),
    }),
});
export const RegisterSchema = RegisterFormSchema.omit({
    examDate: true,
});
export type RegisterSchemaType = z.infer<typeof RegisterSchema>;
export type RegisterFormSchemaType = z.infer<typeof RegisterFormSchema>;
