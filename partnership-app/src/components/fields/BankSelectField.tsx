import { useFormContext } from "react-hook-form";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { banks, type BankType } from "@/apps/constants/bankAlias";
import type { RegisterPartnerFormSchemaType } from "@/apps/models/RegisterPartnerFormSchema";
import { ErrorMessage } from "@/apps/ui/ErrorMessage";

export const BankSelectField = () => {
    const {
        setValue,
        watch,
        formState: { errors },
    } = useFormContext<RegisterPartnerFormSchemaType>();

    return (
        <fieldset className="space-y-2 w-full">
            <Label required>입금 은행</Label>
            <Select
                value={watch("bankAlias")}
                onValueChange={(value) => {
                    setValue("bankAlias", value as BankType);
                }}
            >
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="입금 은행명을 선택해주세요" />
                </SelectTrigger>
                <SelectContent>
                    {banks.map((bank) => (
                        <SelectItem key={bank.value} value={bank.value}>
                            {bank.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            {errors.bankAlias && <ErrorMessage>{errors.bankAlias.message}</ErrorMessage>}
        </fieldset>
    );
};
