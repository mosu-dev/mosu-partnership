import { Button } from "@/components/ui/button";

import { FormProvider, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRegister } from "@/hooks/useRegister";

import { useRegisterDate } from "@/hooks/useRegisterDate";

import { useNavigate, useSearchParams } from "react-router-dom";
import { type RegisterFormSchemaType, RegisterFormSchema } from "@/apps/models/RegisterFormSchema";
import { OrganizationNameField } from "@/components/fields/OrganizationNameField";
import { ExamDateField } from "@/components/fields/ExamDateField";
import { IdentificationField } from "@/components/fields/IdentificationField";
import { UserNameField } from "@/components/fields/UserNameField";
import { GenderField } from "@/components/fields/GenderField";
import { BirthField } from "@/components/fields/BirthField";
import { PhoneNumberField } from "@/components/fields/PhoneNumberField";
import { SubjectField } from "@/components/fields/SubjectField";
import { LunchField } from "@/components/fields/LunchField";
import { ExamAreaField } from "@/components/fields/ExamAreaField";
import { ExamSchoolField } from "@/components/fields/ExamSchoolField";
import { AdmissionTicketField } from "@/components/fields/AdmissionTicketField";

export default function FormPage() {
    const { examDate, examMonth, examYear } = useRegisterDate();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const methods = useForm<RegisterFormSchemaType>({
        resolver: zodResolver(RegisterFormSchema),
        mode: "onChange",
        defaultValues: {
            examDate: `${examYear}-${examMonth}-${examDate}`,
            orgName: "",
            password: "",
            userName: "",
            gender: "MALE",
            birth: "",
            phoneNumber: "",
            subject: "",
            subject2: "",
            lunch: true,
            area: "",
            schoolName: "",
            admissionTicket: {
                fileName: "",
                s3Key: "",
            },
        },
    });

    const { requestRegister, isPending } = useRegister();

    const onSubmit = async (data: RegisterFormSchemaType) => {
        try {
            await requestRegister(data);
            navigate(`/success?${searchParams.toString()}`);
        } catch (error) {
            console.error("Form submission error:", error);
        }
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
                <ExamDateField />
                <OrganizationNameField />
                <IdentificationField />
                <ExamAreaField />
                <ExamSchoolField />
                <UserNameField />
                <GenderField />
                <BirthField />
                <PhoneNumberField />
                <SubjectField />
                <LunchField />

                <AdmissionTicketField />

                <Button type="submit" className="h-[48px] w-full mb-4" disabled={isPending}>
                    {isPending ? "제출 중..." : "신청서 제출"}
                </Button>
            </form>
        </FormProvider>
    );
}
