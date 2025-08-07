import { MarkdownEmptyDateException, MarkdownInvalidDateException } from "@/utils/MarkdownException";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

const DAYS = ["일", "월", "화", "수", "목", "금", "토"];

const isValidDateFormat = (dateString: string): boolean => {
    return /^\d{4}-\d{2}-\d{2}$/.test(dateString);
};

export const useRegisterDate = () => {
    const [searchParams] = useSearchParams();

    const dateValidation = useMemo(() => {
        const exam = searchParams.get("date") || "";

        if (!exam) throw new MarkdownEmptyDateException();
        if (!isValidDateFormat(exam)) throw new MarkdownInvalidDateException();

        return exam;
    }, [searchParams]);

    const [examYear, examMonth, examDate] = dateValidation.split("-").map(Number);

    const examDay = useMemo(() => {
        const date = new Date(examYear, examMonth - 1, examDate);
        return DAYS[date.getDay()];
    }, [examDate, examMonth, examYear]);

    return {
        examYear,
        examMonth,
        examDate,
        examDay,
        formattedDate: [
            examYear.toString(),
            examMonth.toString().padStart(2, "0"),
            examDate.toString().padStart(2, "0"),
        ].join("-"),
    };
};
