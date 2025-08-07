import { api } from "@/apps/constants/api";
import { useMutation } from "@tanstack/react-query";

export type GetVirtualAccountRequestBody = {
    applicationId: number;
    alias: string;
    customerName: string;
    customerEmail: string;
};

export type GetVirtualAccountResponseBody = {
    bankNameKor: string;
    accountNumber: string;
};

export const getVirtualAccount = async (payload: GetVirtualAccountRequestBody) => {
    const { data: response } = await api().post<BaseResponse<GetVirtualAccountResponseBody>>(
        "/virtual-account",
        payload
    );
    return response.data;
};

export const useVirtualAccount = () => {
    return useMutation({
        mutationFn: getVirtualAccount,
    });
};
