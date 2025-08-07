import type { RegisterPartnerFormSchemaType } from "@/apps/models/RegisterPartnerFormSchema";
import { ErrorMessage } from "@/apps/ui/ErrorMessage";

import { useFormContext } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export const EmailField = () => {
    const {
        register,
        formState: { errors },
    } = useFormContext<RegisterPartnerFormSchemaType>();

    return (
        <div className="space-y-2 w-full">
            <Label htmlFor="email" required>
                이메일
            </Label>
            <Input id="email" {...register("email")} placeholder="이메일을 입력해주세요" />
            {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>
    );
};
