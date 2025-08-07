import { Button } from "@/components/ui/button";

import { FormProvider, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { useRegisterDate } from "@/hooks/useRegisterDate";

import { useNavigate, useSearchParams } from "react-router-dom";

import { OrganizationNameField } from "@/components/fields/OrganizationNameField";
import { ExamDateField } from "@/components/fields/ExamDateField";
import { UserNameField } from "@/components/fields/UserNameField";
import { GenderField } from "@/components/fields/GenderField";
import { BirthField } from "@/components/fields/BirthField";
import { PhoneNumberField } from "@/components/fields/PhoneNumberField";
import { SubjectField } from "@/components/fields/SubjectField";
import { LunchField } from "@/components/fields/LunchField";
import { ExamAreaField } from "@/components/fields/ExamAreaField";
import { ExamSchoolField } from "@/components/fields/ExamSchoolField";
import { AdmissionTicketField } from "@/components/fields/AdmissionTicketField";
import { RegisterPartnerFormSchema, type RegisterPartnerFormSchemaType } from "@/apps/models/RegisterPartnerFormSchema";
import { Spinner } from "@/apps/ui/Spinner";
import { useRegisterGuest } from "@/hooks/useRegisterGuest";
import { useEffect } from "react";

export default function FormPage() {
    const { examDate, examMonth, examYear } = useRegisterDate();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const methods = useForm<RegisterPartnerFormSchemaType>({
        resolver: zodResolver(RegisterPartnerFormSchema),
        mode: "onChange",
        defaultValues: {
            examApplication: {
                examId: -1,
                isLunchChecked: true,
            },
        },
    });

    const { isPending } = useRegisterGuest();

    const onSubmit = async (data: RegisterPartnerFormSchemaType) => {
        try {
            navigate(`/success?${searchParams.toString()}`);
        } catch (error) {
            console.error("Form submission error:", error);
        }
    };

    const watchElements = methods.watch();
    console.log(watchElements);

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
                <fieldset className="flex gap-2 w-full">
                    <ExamDateField />
                    <ExamAreaField />
                    <ExamSchoolField />
                </fieldset>

                <OrganizationNameField />

                <UserNameField />
                <GenderField />
                <BirthField />
                <PhoneNumberField />
                <SubjectField />
                <LunchField />

                <AdmissionTicketField />
                <p className="text-red-400">*입금 완료 후 신청서를 제출하세요</p>

                <Button type="submit" className="h-[48px] w-full mb-4">
                    {isPending ? "신청하기" : <Spinner />}
                </Button>
            </form>
        </FormProvider>
    );
}
