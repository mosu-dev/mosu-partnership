import { Button } from "@/components/ui/button";

import { FormProvider, useForm, type FieldErrors } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { useRegisterDate } from "@/hooks/useRegisterDate";

import { useNavigate } from "react-router-dom";

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
import { BankSelectField } from "@/components/fields/BankSelectField";
import { useVirtualAccount } from "@/hooks/useVirtualAccount";
import { EmailField } from "@/components/fields/EmailField";
import { toast } from "react-toastify";

export default function FormPage() {
    const { examYear, examMonth, examDate } = useRegisterDate();
    const navigate = useNavigate();

    const methods = useForm<RegisterPartnerFormSchemaType>({
        resolver: zodResolver(RegisterPartnerFormSchema),
        mode: "onChange",
        defaultValues: {
            examDate: {
                year: examYear,
                month: examMonth,
                date: examDate,
            },
            examApplication: {
                examId: -1,
                isLunchChecked: true,
            },
            birth: "",
            phoneNumber: "",
            subjects: ["", ""],
            admissionTicket: {
                s3Key: "",
                fileName: "",
            },
            email: "",
        },
    });

    const { isPending: isRegisterGuestPending, mutateAsync: registerGuest } = useRegisterGuest();
    const { isPending: isSignVirtualAccountPending, mutateAsync: signVirtualAccount } = useVirtualAccount();

    const isPending = isRegisterGuestPending || isSignVirtualAccountPending;

    const onSubmit = async (data: RegisterPartnerFormSchemaType) => {
        try {
            const registerGuestResponse = await registerGuest({
                orgName: data.orgName,
                gender: data.gender,
                userName: data.userName,
                birth: data.birth,
                phoneNumber: data.phoneNumber,
                examApplication: {
                    examId: data.examApplication.examId,
                    isLunchChecked: data.examApplication.isLunchChecked,
                },
                subjects: data.subjects,
                admissionTicket: {
                    fileName: data.admissionTicket.fileName,
                    s3Key: data.admissionTicket.s3Key,
                },
            });

            const signVirtualAccountResponse = await signVirtualAccount({
                applicationId: registerGuestResponse.applicationId,
                customerName: data.userName,
                alias: data.bankAlias,
                customerEmail: data.email,
            });

            navigate("/success", {
                state: {
                    bankNameKor: signVirtualAccountResponse.bankNameKor,
                    accountNumber: signVirtualAccountResponse.accountNumber,
                    isLunchBox: data.examApplication.isLunchChecked,
                },
            });
        } catch {
            alert("신청에 실패했습니다. 다시 시도해주세요.");
        }
    };

    const onInvalid = (errors: FieldErrors<RegisterPartnerFormSchemaType>) => {
        // 첫 번째 오류 메시지를 찾아서 toast로 표시
        const firstErrorKey = Object.keys(errors)[0];
        const firstError = errors[firstErrorKey as keyof typeof errors];

        if (firstError?.message) {
            toast.error(firstError.message);
        } else if (firstError && typeof firstError === "object") {
            const nestedErrors = firstError as Record<string, { message?: string }>;
            const nestedErrorKey = Object.keys(nestedErrors)[0];
            const nestedError = nestedErrors[nestedErrorKey];
            if (nestedError?.message) {
                toast.error(nestedError.message);
            }
        }
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit, onInvalid)} className="space-y-6">
                <fieldset className="flex flex-col gap-2 w-full sm:flex-row">
                    <ExamDateField />
                    <ExamAreaField />
                    <ExamSchoolField />
                </fieldset>

                <OrganizationNameField />

                <fieldset className="flex gap-2 w-full flex-col sm:flex-row">
                    <GenderField />
                    <UserNameField />
                </fieldset>

                <BirthField />
                <PhoneNumberField />
                <SubjectField />
                <LunchField />
                <AdmissionTicketField />
                <BankSelectField />
                <EmailField />

                <Button type="submit" className="h-[48px] w-full mb-4" disabled={isPending}>
                    {!isPending ? "신청하기" : <Spinner />}
                </Button>
            </form>
        </FormProvider>
    );
}
