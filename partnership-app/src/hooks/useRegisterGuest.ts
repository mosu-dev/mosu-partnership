import { api } from "@/apps/constants/api";
import type { RegisterPartnerFormSchemaType } from "@/apps/models/RegisterPartnerFormSchema";
import { useMutation } from "@tanstack/react-query";

export type RegisterGuestRequestBody = {
    orgName: string;
    gender: string;
    userName: string;
    birth: string;
    phoneNumber: string;
    examApplication: {
        examId: number;
        isLunchChecked: boolean;
    };
    subjects: string[];
    admissionTicket: {
        fileName: string;
        s3Key: string;
    };
};

export type RegisterGuestResponseBody = {
    applicationId: number;
};

export const registerGuestRequest = async (payload: RegisterPartnerFormSchemaType) => {
    const { data: response } = await api().post<BaseResponse<RegisterGuestResponseBody>>(
        "/applications/guest",
        payload
    );
    return response.data;
};

export const useRegisterGuest = () => {
    return useMutation({
        mutationFn: registerGuestRequest,
    });
};
