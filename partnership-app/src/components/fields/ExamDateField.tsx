import { Input } from "../ui/input";
import { useRegisterDate } from "@/hooks/useRegisterDate";
import { Label } from "../ui/label";

export const ExamDateField = () => {
    const { examYear, examMonth, examDate } = useRegisterDate();

    return (
        <div className="space-y-2 flex-1/3">
            <Label required>응시 날짜</Label>
            <Input type="text" disabled value={`${examYear}년 ${examMonth}월 ${examDate}일`} className="w-full" />
        </div>
    );
};
