import { ErrorMessage } from "@/apps/ui/ErrorMessage";

import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useFormContext } from "react-hook-form";
import type { RegisterPartnerFormSchemaType } from "@/apps/models/RegisterPartnerFormSchema";

export const IdentificationField = () => {
    const {
        watch,
        setValue,
        formState: { errors },
    } = useFormContext<RegisterPartnerFormSchemaType>();

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^\d]/g, "").slice(0, 4);
        setValue("password", value);
    };

    return (
        <div className="space-y-2">
            <Label htmlFor="password" required>
                본인확인 비밀번호 (4자리)
            </Label>
            <Input
                id="password"
                type="password"
                value={watch().password}
                onChange={handlePasswordChange}
                placeholder="입금확인을 위한 4자리 숫자"
                maxLength={4}
            />
            {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
            <p className="text-sm text-gray-500">입금확인을 위한 비밀번호로 원하시는 4자리 숫자를 적어주세요</p>
        </div>
    );
};
