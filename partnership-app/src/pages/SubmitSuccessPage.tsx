import imgComplete from "@/assets/img-complete.png";
import { useLocation } from "react-router-dom";

export default function SubmitSuccessPage() {
    const { bankNameKor, accountNumber } = useLocation().state;

    return (
        <div className="my-20 flex flex-col items-center gap-10">
            <img src={imgComplete} alt="신청 완료" className="mx-auto" width={180} height={180} />
            <div className="space-y-3 text-center">
                <h1 className="text-center text-2xl font-bold">모의수능 신청이 완료되었습니다</h1>

                <p className="text-md text-center text-[#909090] mb-0">
                    2일 내에 가상계좌로 입금완료시 신청이 완료됩니다.
                </p>
                <p>
                    계좌번호 : &nbsp;
                    <span className="font-semibold">
                        {accountNumber} ({bankNameKor})
                    </span>
                </p>
            </div>
        </div>
    );
}
