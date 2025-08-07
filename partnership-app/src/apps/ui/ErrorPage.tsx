import imgFailed from "@/assets/img-failed.png";

export default function ErrorPage() {
    return (
        <main className="min-h-screen mx-auto p-4 w-full max-w-[640px]">
            <img src={imgFailed} alt="결제 실패" className="mx-auto my-12 mt-20" width={180} height={180} />

            <header className="text-center">
                <h1 className="text-2xl font-bold">잘못된 접근입니다</h1>
                <p>올바른 경로로 접근해주세요.</p>
            </header>
        </main>
    );
}
