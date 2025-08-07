import { ErrorMessage } from "@/apps/ui/ErrorMessage";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useFormContext } from "react-hook-form";
import type { RegisterPartnerFormSchemaType } from "@/apps/models/RegisterPartnerFormSchema";

export const OrganizationNameField = () => {
    const {
        register,
        formState: { errors },
    } = useFormContext<RegisterPartnerFormSchemaType>();

    return (
        <div className="space-y-2">
            <Label htmlFor="partnerCompany" required>
                제휴 업체명
            </Label>
            <Input id="partnerCompany" {...register("orgName")} placeholder="제휴 업체명을 입력해주세요" />
            {errors.orgName && <ErrorMessage>{errors.orgName.message}</ErrorMessage>}
        </div>
    );
};
