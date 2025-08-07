import { Input } from "../ui/input";
import { useRegisterDate } from "@/hooks/useRegisterDate";
import { Label } from "../ui/label";
import { useFormContext } from "react-hook-form";
import { type RegisterPartnerFormSchemaType } from "@/apps/models/RegisterPartnerFormSchema";

export const ExamDateField = () => {
    const { examYear, examMonth, examDate } = useRegisterDate();

    const { setValue } = useFormContext<RegisterPartnerFormSchemaType>();
    // setValue("examDate.year", examYear);
    // setValue("examDate.month", examMonth);
    // setValue("examDate.date", examDate);

    return (
        <div className="space-y-2 w-full">
            <Label required>응시 날짜</Label>
            <Input type="text" disabled value={`${examYear}년 ${examMonth}월 ${examDate}일`} />
        </div>
    );
};
