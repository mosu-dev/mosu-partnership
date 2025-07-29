import { Spinner } from "@/apps/ui/Spinner";
import { Button } from "@/components/ui/button";
import { useLoadRegisterInfoDocs } from "@/hooks/useLoadRegisterInfoDocs";
import { Link, useSearchParams } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";

export default function HomePage() {
    const { registerInfoDocs, isPending } = useLoadRegisterInfoDocs();
    const [searchParams] = useSearchParams();

    if (isPending) return <Spinner />;

    if (!registerInfoDocs) throw new Error("만료된 폼");

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
