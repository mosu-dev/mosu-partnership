import { ErrorMessage } from "@/apps/ui/ErrorMessage";
import { useFormContext } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import type { RegisterPartnerFormSchemaType } from "@/apps/models/RegisterPartnerFormSchema";

export const PhoneNumberField = () => {
    const {
        watch,
        setValue,
        formState: { errors },
    } = useFormContext<RegisterPartnerFormSchemaType>();

    const formatPhoneNumber = (value: string) => {
        const numbers = value.replace(/[^\d]/g, "");
        if (numbers.length <= 3) return numbers;
        if (numbers.length <= 7) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
        return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatPhoneNumber(e.target.value);
        setValue("phoneNumber", formatted);
    };

    return (
        <div className="space-y-2">
            <Label htmlFor="phoneNumber" required>
                전화번호
            </Label>
            <Input
                id="phoneNumber"
                value={watch().phoneNumber}
                onChange={handlePhoneChange}
                placeholder="010-0000-0000"
                maxLength={13}
            />
            {errors.phoneNumber && <ErrorMessage>{errors.phoneNumber.message}</ErrorMessage>}
        </div>
    );
};
