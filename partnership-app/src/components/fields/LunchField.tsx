import { ErrorMessage } from "@/apps/ui/ErrorMessage";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

import { useFormContext } from "react-hook-form";
import type { RegisterPartnerFormSchemaType } from "@/apps/models/RegisterPartnerFormSchema";

export const LunchField = () => {
    const {
        watch,
        setValue,
        formState: { errors },
    } = useFormContext<RegisterPartnerFormSchemaType>();

    return (
        <div className="space-y-3">
            <Label required>점심 도시락 신청 여부</Label>
            <RadioGroup
                value={watch().lunch ? "yes" : "no"}
                onValueChange={(value) => {
                    setValue("lunch", value === "yes");
                }}
            >
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="lunch-yes" />
                    <Label htmlFor="lunch-yes">네</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="lunch-no" />
                    <Label htmlFor="lunch-no">아니오</Label>
                </div>
            </RadioGroup>
            {errors.lunch && <ErrorMessage>{errors.lunch.message}</ErrorMessage>}
        </div>
    );
};
