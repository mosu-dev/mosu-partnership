import { api } from "@/apps/constants/api";
import { useQuery } from "@tanstack/react-query";

export type GetExamsResponseBody = Array<{
    id: number;
    schoolName: string;
    address: {
        zipcode: string;
        street: string;
        detail: string;
    };
    area: string;
    currentQuota: number;
    maxQuota: number;
    deadlineTime: string;
    examDate: string;
    lunch: {
        name: string;
        price: number;
    };
}>;

export const getExams = async () => {
    const { data: response } = await api().get<BaseResponse<GetExamsResponseBody>>("/exams/all");
    return response.data;
};

export const useGetExams = () => {
    return useQuery({
        queryKey: ["EXAMS"],
        queryFn: getExams,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        select: (data) => {},
    });
};
