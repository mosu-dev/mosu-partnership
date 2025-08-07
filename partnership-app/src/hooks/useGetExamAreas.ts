import { api } from "@/apps/constants/api";
import { useQuery } from "@tanstack/react-query";

export type GetExamAreasResponseBody = Array<string>;

export const getExamAreas = async () => {
    const { data: response } = await api().get<BaseResponse<GetExamAreasResponseBody>>("/exams/areas");
    return response.data;
};

export const useGetExamAreas = () => {
    return useQuery({
        queryKey: ["EXAM_AREAS"],
        queryFn: getExamAreas,
    });
};
