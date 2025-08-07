import z from "zod";

export const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const VirtualAccountFormSchema = z.object({
    applicationId: z.number().min(1, "신청 ID를 입력해주세요."),
    alias: z.string().min(1, "입금 은행을 선택해주세요"),
    customerName: z.string().min(1, "이름을 입력해주세요."),
    customerEmail: z.string().regex(REGEX_EMAIL, "유효한 이메일 주소를 입력해주세요.").min(1, "이메일을 입력해주세요."),
});

export type VirtualAccountFormSchemaType = z.infer<typeof VirtualAccountFormSchema>;
