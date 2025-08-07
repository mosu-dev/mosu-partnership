import { useLayoutEffect, useState } from "react";
import { remark } from "remark";
import html from "remark-html";

import { useRegisterDate } from "./useRegisterDate";

import { MarkdownNotFoundException } from "@/utils/MarkdownException";

import register1019Md from "../../../docs/register_1019.md?raw";
import register1026Md from "../../../docs/register_1026.md?raw";
import register1102Md from "../../../docs/register_1102.md?raw";

export const AvailableDocsPaths = ["register_1019.md", "register_1026.md", "register_1102.md"] as const;

export type RegisterDocsMap = Record<
    (typeof AvailableDocsPaths)[number],
    {
        examYear: number;
        examMonth: number;
        examDate: number;
        examDay: string;
    }
>;

const markdownFiles: Record<string, string> = {
    "register_1019.md": register1019Md,
    "register_1026.md": register1026Md,
    "register_1102.md": register1102Md,
};

export const useLoadRegisterInfoDocs = (registerDocsMap: RegisterDocsMap) => {
    const { examDate, examDay, examMonth, examYear } = useRegisterDate();

    const [isPending, setIsPending] = useState(true);
    const [registerInfoDocs, setRegisterInfoDocs] = useState<string>("");

    useLayoutEffect(() => {
        (async () => {
            try {
                const matchingDocPath = Object.keys(registerDocsMap).find((docPath) => {
                    const docInfo = registerDocsMap[docPath as keyof typeof registerDocsMap];
                    return (
                        docInfo.examYear === examYear &&
                        docInfo.examMonth === examMonth &&
                        docInfo.examDate === examDate
                    );
                });

                if (!matchingDocPath) throw new MarkdownNotFoundException();

                const registerInfoDocs = await remark().use(html).process(markdownFiles[matchingDocPath]);
                setRegisterInfoDocs(registerInfoDocs.toString());
            } catch (error) {
                console.error("문서 처리 중 오류:", error);
            } finally {
                setIsPending(false);
            }
        })();
    }, [examDate, examDay, examMonth, examYear, registerDocsMap]);

    return {
        isPending,
        registerInfoDocs,
    };
};
