import { remark } from "remark";
import html from "remark-html";

import rawRegisterInfoDocs from "@mosu/partnership-docs/모의수능 신청.md";
import { useLayoutEffect, useState } from "react";
import { useRegisterDate } from "./useRegisterDate";

export const useLoadRegisterInfoDocs = () => {
    const { examDate, examDay, examMonth, examYear } = useRegisterDate();

    const [isPending, setIsPending] = useState(true);
    const [registerInfoDocs, setRegisterInfoDocs] = useState<string>("");

    useLayoutEffect(() => {
        (async () => {
            try {
                const refundDate = new Date(examYear, examMonth - 1, examDate);
                refundDate.setDate(refundDate.getDate() - 7);

                const refundDueMonth = refundDate.getMonth() + 1;
                const refundDueDate = refundDate.getDate();

                const replacedRegisterInfoDocs = await remark()
                    .use(html)
                    .process(
                        rawRegisterInfoDocs
                            .replaceAll("{{examYear}}", examYear.toString())
                            .replaceAll("{{examMonth}}", examMonth.toString())
                            .replaceAll("{{examDate}}", examDate.toString())
                            .replaceAll("{{examDay}}", examDay)
                            .replaceAll("{{refundDueMonth}}", refundDueMonth.toString())
                            .replaceAll("{{refundDueDate}}", refundDueDate.toString())
                            .replaceAll("{{refundDueTime}}", "23:59:59")
                    );
                setRegisterInfoDocs(replacedRegisterInfoDocs.toString());
            } catch (error) {
                console.error("문서 처리 중 오류:", error);
            } finally {
                setIsPending(false);
            }
        })();
    }, [examDate, examDay, examMonth, examYear]);

    return {
        isPending,
        registerInfoDocs,
    };
};
