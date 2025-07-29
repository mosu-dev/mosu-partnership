import { ErrorMessage } from "@/apps/ui/ErrorMessage";

import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import type { RegisterFormSchemaType } from "@/apps/models/RegisterFormSchema";
import { useFormContext } from "react-hook-form";

export const GenderField = () => {
    const {
        watch,
        setValue,
        formState: { errors },
    } = useFormContext<RegisterFormSchemaType>();

    return (
        <div className="space-y-2">
            <Label required>성별</Label>
            <Select
                value={watch().gender}
                onValueChange={(value) => {
                    setValue("gender", value as "MALE" | "FEMALE");
                }}
            >
                <SelectTrigger>
                    <SelectValue placeholder="성별을 선택해주세요" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="MALE">남성</SelectItem>
                    <SelectItem value="FEMALE">여성</SelectItem>
                </SelectContent>
            </Select>
            {errors.gender && <ErrorMessage>{errors.gender.message}</ErrorMessage>}
        </div>
    );
};
