import { regions } from "@/apps/constants/regions";
import { ErrorMessage } from "@/apps/ui/ErrorMessage";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import type { RegisterFormSchemaType } from "@/apps/models/RegisterFormSchema";
import { useFormContext } from "react-hook-form";

export const ExamAreaField = () => {
    const {
        watch,
        setValue,
        formState: { errors },
    } = useFormContext<RegisterFormSchemaType>();

    return (
        <div className="space-y-2">
            <Label required>응시 지역</Label>
            <Select
                value={watch().area}
                onValueChange={(value) => {
                    setValue("area", value);
                }}
            >
                <SelectTrigger>
                    <SelectValue placeholder="응시 지역을 선택해주세요" />
                </SelectTrigger>
                <SelectContent>
                    {regions.map((region) => (
                        <SelectItem key={region} value={region}>
                            {region}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            {errors.area && <ErrorMessage>{errors.area.message}</ErrorMessage>}
        </div>
    );
};
