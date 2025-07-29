import { remark } from "remark";
import html from "remark-html";

import rawRegisterInfoDocs from "@mosu/partnership-docs/모의수능 신청.md";
import { useLayoutEffect, useState } from "react";

export type UseLoadRegisterInfoDocsOptions = {
    examYear: string;
    examMonth: string;
    examDate: string;
    examDay: string;

    refundDueMonth: string;
    refundDueDate: string;
    refundDueTime: string;
};

export const useLoadRegisterInfoDocs = ({ examYear, examMonth, examDate, examDay, refundDueMonth, refundDueDate, refundDueTime }: UseLoadRegisterInfoDocsOptions) => {
    const [registerInfoDocs, setRegisterInfoDocs] = useState<string>("");

    useLayoutEffect(() => {
        (async () => {
            const replacedRegisterInfoDocs = await remark()
                .use(html)
                .process(
                    rawRegisterInfoDocs
                        .replaceAll("{{examYear}}", examYear)
                        .replaceAll("{{examMonth}}", examMonth)
                        .replaceAll("{{examDate}}", examDate)
                        .replaceAll("{{examDay}}", examDay)
                        .replaceAll("{{refundDueMonth}}", refundDueMonth)
                        .replaceAll("{{refundDueDate}}", refundDueDate)
                        .replaceAll("{{refundDueTime}}", refundDueTime)
                );
            setRegisterInfoDocs(replacedRegisterInfoDocs.toString());
        })();
    }, [examDate, examDay, examMonth, examYear, refundDueDate, refundDueMonth, refundDueTime, registerInfoDocs]);

    return {
        registerInfoDocs,
    };
};
