import { Spinner } from "@/apps/ui/Spinner";
import { Button } from "@/components/ui/button";
import { useLoadRegisterInfoDocs } from "@/hooks/useLoadRegisterInfoDocs";
import { MarkdownExpiredFormException } from "@/utils/MarkdownException";
import { Link, useSearchParams } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";

export default function HomePage() {
    const { registerInfoDocs, isPending } = useLoadRegisterInfoDocs({
        "register_1019.md": {
            examYear: 2025,
            examMonth: 10,
            examDate: 19,
            examDay: "일",
        },
        "register_1026.md": {
            examYear: 2025,
            examMonth: 10,
            examDate: 26,
            examDay: "일",
        },
        "register_1102.md": {
            examYear: 2025,
            examMonth: 11,
            examDate: 2,
            examDay: "일",
        },
    });
    const [searchParams] = useSearchParams();

    if (isPending) return <Spinner />;
    if (!registerInfoDocs) throw new MarkdownExpiredFormException();

    return (
        <Fragment>
            <article
                className="bg-white my-4 p-4 prose rounded-md border border-gray-200"
                dangerouslySetInnerHTML={{
                    __html: registerInfoDocs,
                }}
            />
            <Button asChild variant="default" className="w-full h-[48px]">
                <Link to={`/form/?${searchParams.toString()}`}>다음으로</Link>
            </Button>
        </Fragment>
    );
}
