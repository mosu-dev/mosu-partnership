import type { RegisterFormSchemaType } from "@/apps/models/RegisterFormSchema";
import { ErrorMessage } from "@/apps/ui/ErrorMessage";
import { useFormContext } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export const ExamSchoolField = () => {
    const {
        register,
        formState: { errors },
    } = useFormContext<RegisterFormSchemaType>();

    return (
        <div className="space-y-2">
            <Label htmlFor="testSchool" required>
                응시학교명
            </Label>
            <Input id="testSchool" {...register("schoolName")} placeholder="응시할 학교명을 입력해주세요" />
            {errors.schoolName && <ErrorMessage>{errors.schoolName.message}</ErrorMessage>}
        </div>
    );
};
