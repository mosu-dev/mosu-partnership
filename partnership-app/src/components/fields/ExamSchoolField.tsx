import { useFormContext } from "react-hook-form";

import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

import type { RegisterPartnerFormSchemaType } from "@/apps/models/RegisterPartnerFormSchema";
import { useGetExamSchools } from "@/hooks/useGetExamSchools";
import { Spinner } from "@/apps/ui/Spinner";
import { ErrorMessage } from "@/apps/ui/ErrorMessage";
import { useRegisterDate } from "@/hooks/useRegisterDate";

export const ExamSchoolField = () => {
    const { formattedDate } = useRegisterDate();

    const {
        watch,
        setValue,
        formState: { errors },
    } = useFormContext<RegisterPartnerFormSchemaType>();

    const { isPending, data } = useGetExamSchools(watch("examArea"));

    return (
        <div className="space-y-2 flex-1/3">
            <Label htmlFor="testSchool" required>
                응시학교명
            </Label>
            <Select
                onValueChange={(value) => {
                    setValue("examApplication.examId", Number(value));
                }}
            >
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="응시 학교를 선택해주세요" />
                </SelectTrigger>
                <SelectContent>
                    {isPending ? (
                        <SelectItem value="pending">
                            <Spinner />
                        </SelectItem>
                    ) : (
                        data?.map(
                            (data) =>
                                data.examDate === formattedDate && (
                                    <SelectItem key={data.id} value={data.id.toString()}>
                                        {data.schoolName}
                                    </SelectItem>
                                )
                        )
                    )}
                </SelectContent>
            </Select>
            {errors.examApplication?.examId && <ErrorMessage>{errors.examApplication.examId.message}</ErrorMessage>}
        </div>
    );
};
