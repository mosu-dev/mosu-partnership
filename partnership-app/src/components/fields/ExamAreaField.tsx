import { ErrorMessage } from "@/apps/ui/ErrorMessage";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

import { useFormContext } from "react-hook-form";
import type { RegisterPartnerFormSchemaType } from "@/apps/models/RegisterPartnerFormSchema";
import { useGetExamAreas } from "@/hooks/useGetExamAreas";
import { Spinner } from "@/apps/ui/Spinner";

export const ExamAreaField = () => {
    const {
        watch,
        setValue,
        formState: { errors },
    } = useFormContext<RegisterPartnerFormSchemaType>();

    const { isPending, data } = useGetExamAreas();

    return (
        <div className="space-y-2 flex-1/3">
            <Label required>응시 지역</Label>
            <Select value={watch("examArea")} onValueChange={(value) => setValue("examArea", value)}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="응시 지역을 선택해주세요" />
                </SelectTrigger>
                <SelectContent>
                    {isPending ? (
                        <SelectItem value="pending" disabled>
                            <Spinner />
                        </SelectItem>
                    ) : (
                        data?.map((region) => (
                            <SelectItem key={region} value={region}>
                                {region}
                            </SelectItem>
                        ))
                    )}
                </SelectContent>
            </Select>
            {errors.examArea && <ErrorMessage>{errors.examArea.message}</ErrorMessage>}
        </div>
    );
};
