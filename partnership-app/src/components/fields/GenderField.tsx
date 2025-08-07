import { ErrorMessage } from "@/apps/ui/ErrorMessage";

import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

import { useFormContext } from "react-hook-form";
import type { RegisterPartnerFormSchemaType } from "@/apps/models/RegisterPartnerFormSchema";

export const GenderField = () => {
    const {
        watch,
        setValue,
        formState: { errors },
    } = useFormContext<RegisterPartnerFormSchemaType>();

    return (
        <div className="space-y-2">
            <Label required>성별</Label>
            <Select
                defaultValue="남자"
                value={watch("gender")}
                onValueChange={(value) => {
                    setValue("gender", value as "남자" | "여자");
                }}
            >
                <SelectTrigger>
                    <SelectValue placeholder="성별을 선택해주세요" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="남자">남성</SelectItem>
                    <SelectItem value="여자">여성</SelectItem>
                </SelectContent>
            </Select>
            {errors.gender && <ErrorMessage>{errors.gender.message}</ErrorMessage>}
        </div>
    );
};
