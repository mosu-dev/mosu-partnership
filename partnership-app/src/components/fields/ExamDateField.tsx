import { type RegisterFormSchemaType } from "@/apps/models/RegisterFormSchema";
import { useFormContext } from "react-hook-form";

export const ExamDateField = () => {
    const { register } = useFormContext<RegisterFormSchemaType>();

    return <input type="hidden" {...register("examDate")} value="2024-12-01" />;
};
