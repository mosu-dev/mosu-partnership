import { Fragment } from "react/jsx-runtime";
import { Label } from "../ui/label";
import { subject } from "@/apps/constants/subjects";
import { ErrorMessage } from "@/apps/ui/ErrorMessage";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../ui/select";

import { useFormContext } from "react-hook-form";
import type { RegisterPartnerFormSchemaType } from "@/apps/models/RegisterPartnerFormSchema";

export const SubjectField = () => {
    const {
        watch,
        setValue,
        formState: { errors },
    } = useFormContext<RegisterPartnerFormSchemaType>();

    return (
        <Fragment>
            <div className="space-y-2">
                <Label required>탐구 1</Label>
                <Select
                    value={watch().subject}
                    onValueChange={(value) => {
                        setValue("subject", value);
                    }}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="첫 번째 탐구 과목을 선택해주세요" />
                    </SelectTrigger>
                    <SelectContent>
                        {subject.map((subject) => (
                            <SelectItem key={subject} value={subject}>
                                {subject}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {errors.subject && <ErrorMessage>{errors.subject.message}</ErrorMessage>}
            </div>

            <div className="space-y-2">
                <Label required>탐구 2</Label>
                <Select
                    value={watch().subject2}
                    onValueChange={(value) => {
                        setValue("subject2", value);
                    }}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="두 번째 탐구 과목을 선택해주세요" />
                    </SelectTrigger>
                    <SelectContent>
                        {subject
                            .filter((subjectItem) => subjectItem !== watch().subject)
                            .map((subject) => (
                                <SelectItem key={subject} value={subject}>
                                    {subject}
                                </SelectItem>
                            ))}
                    </SelectContent>
                </Select>
                {errors.subject2 && <ErrorMessage>{errors.subject2.message}</ErrorMessage>}
            </div>
        </Fragment>
    );
};
