import { useRegisterDate } from "@/hooks/useRegisterDate";
import { CheckCircle } from "lucide-react";

export default function SubmitSuccessPage() {
    const { examDate, examDay, examMonth, examYear } = useRegisterDate();
    return (
        <div className="flex flex-col min-h-dvh items-center ">
            <div className="text-center py-6">
                <div className="flex justify-center py-3">
                    <CheckCircle className="h-16 w-16 text-green-500" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900">신청이 완료되었습니다!</h1>
                <p className="text-lg text-gray-600">모의수능 신청이 성공적으로 접수되었습니다.</p>
            </div>
            <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-lg">
                    <div>
                        <p className="font-medium text-center text-2xl text-gray-900">시험 일정</p>
                        <p className="text-md text-gray-600">{`${examYear}년 ${examMonth}월 ${examDate}일 (${examDay})`}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
