import { Button } from "@/components/ui/button";
import { useLoadRegisterInfoDocs } from "@/hooks/useLoadRegisterInfoDocs";
import { Link } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";

export default function HomePage() {
    const { registerInfoDocs } = useLoadRegisterInfoDocs({
        examYear: "2025",
        examMonth: "10",
        examDate: "19",
        examDay: "일",
        refundDueMonth: "10",
        refundDueDate: "12",
        refundDueTime: "23:59",
    });

    return (
        <Fragment>
            <article
                className="bg-white my-4 p-4"
                dangerouslySetInnerHTML={{
                    __html: registerInfoDocs,
                }}
            />
            <Button asChild variant="default" className="w-full h-[48px]">
                <Link to="/form" replace>
                    다음으로
                </Link>
            </Button>
        </Fragment>
    );
}
