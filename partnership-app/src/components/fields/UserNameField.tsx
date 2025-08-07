import { ErrorMessage } from "@/apps/ui/ErrorMessage";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useFormContext } from "react-hook-form";
import type { RegisterPartnerFormSchemaType } from "@/apps/models/RegisterPartnerFormSchema";

export const UserNameField = () => {
    const {
        register,
        formState: { errors },
    } = useFormContext<RegisterPartnerFormSchemaType>();

    return (
        <div className="space-y-2 flex-2/3">
            <Label htmlFor="name" required>
                이름
            </Label>
            <Input id="name" {...register("userName")} placeholder="성명을 입력해주세요" />
            {errors.userName && <ErrorMessage>{errors.userName.message}</ErrorMessage>}
        </div>
    );
};
