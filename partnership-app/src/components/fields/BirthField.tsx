import { CalendarIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { ErrorMessage } from "@/apps/ui/ErrorMessage";

import { useFormContext } from "react-hook-form";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import type { RegisterPartnerFormSchemaType } from "@/apps/models/RegisterPartnerFormSchema";

export const BirthField = () => {
    const {
        watch,
        setValue,
        formState: { errors },
    } = useFormContext<RegisterPartnerFormSchemaType>();

    const formatKoreaTime = (date?: Date) => {
        const krDate = date?.toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        });
        return krDate?.replace(/\. /g, "-").replace(/\.$/, "");
    };

    return (
        <div className="space-y-2">
            <Label required>생년월일</Label>
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {watch().birth ? (
                            format(new Date(watch().birth), "yyyy년 MM월 dd일", {
                                locale: ko,
                            })
                        ) : (
                            <span>생년월일을 선택해주세요</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                    <Calendar
                        mode="single"
                        selected={watch().birth ? new Date(watch().birth) : undefined}
                        onSelect={(date) => {
                            const dateString = formatKoreaTime(date);
                            setValue("birth", dateString || "");
                        }}
                        locale={ko}
                    />
                </PopoverContent>
            </Popover>
            {errors.birth && <ErrorMessage>{errors.birth.message}</ErrorMessage>}
        </div>
    );
};
