import { useSearchParams } from "react-router-dom";

const isValidDateFormat = (dateString: string): boolean => {
    return /^\d{4}-\d{2}-\d{2}$/.test(dateString);
};

const isValidDate = (year: number, month: number, date: number): boolean => {
    if (!year || !month || !date) return false;
    if (isNaN(year) || isNaN(month) || isNaN(date)) return false;

    const dateObj = new Date(year, month - 1, date);
    return dateObj.getFullYear() === year && dateObj.getMonth() === month - 1 && dateObj.getDate() === date;
};

const isFutureDate = (year: number, month: number, date: number): boolean => {
    const inputDate = new Date(year, month - 1, date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return inputDate >= today;
};

export const useRegisterDate = () => {
    const [searchParams] = useSearchParams();

    const exam = searchParams.get("date") || "";
    console.log("exam : ", exam);

    if (!isValidDateFormat(exam)) {
        throw new Error("날짜는 YYYY-MM-DD 형식이어야 합니다.");
    }

    const [examYear, examMonth, examDate] = exam.split("-").map(Number);
    console.log("examYear, examMonth, examDate : ", examYear, examMonth, examDate);

    if (!isValidDate(examYear, examMonth, examDate)) {
        throw new Error("유효하지 않은 날짜입니다.");
    }

    if (!isFutureDate(examYear, examMonth, examDate)) {
        throw new Error("시험 날짜는 오늘 이후여야 합니다.");
    }

    const examDay = (() => {
        const date = new Date(examYear, examMonth - 1, examDate);
        const days = ["일", "월", "화", "수", "목", "금", "토"];
        return days[date.getDay()];
    })();

    return {
        examYear,
        examMonth,
        examDate,
        examDay,
    };
};
