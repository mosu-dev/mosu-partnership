import { api } from "@/apps/constants/api";
import { useQuery } from "@tanstack/react-query";

export type GetExamSchoolsResponse = Array<{
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

export const getExamSchools = async (areaName: string) => {
    const { data: response } = await api().get<BaseResponse<GetExamSchoolsResponse>>(`/exams?areaName=${areaName}`);
    return response.data;
};

export const useGetExamSchools = (areaName: string) => {
    return useQuery({
        queryKey: ["EXAM_SCHOOLS", areaName],
        queryFn: () => getExamSchools(areaName),
    });
};
