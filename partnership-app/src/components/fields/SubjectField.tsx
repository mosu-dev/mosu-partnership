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
        <fieldset className="flex gap-2 w-full flex-col sm:flex-row">
            <div className="space-y-2 flex-1/2">
                <Label required>탐구 1</Label>
                <Select
                    value={watch("subjects")[0]}
                    onValueChange={(value) => {
                        const updatedSubjects = watch("subjects");
                        updatedSubjects[0] = value;
                        setValue("subjects", updatedSubjects);
                    }}
                >
                    <SelectTrigger className="w-full">
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
            </div>

            <div className="space-y-2 flex-1/2">
                <Label required>탐구 2</Label>
                <Select
                    value={watch("subjects")[1]}
                    onValueChange={(value) => {
                        const updatedSubjects = watch("subjects");
                        updatedSubjects[1] = value;
                        setValue("subjects", updatedSubjects);
                    }}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="두 번째 탐구 과목을 선택해주세요" />
                    </SelectTrigger>
                    <SelectContent>
                        {subject
                            .filter((subjectItem) => subjectItem !== watch("subjects")[0])
                            .map((subject) => (
                                <SelectItem key={subject} value={subject}>
                                    {subject}
                                </SelectItem>
                            ))}
                    </SelectContent>
                </Select>
            </div>

            {errors.subjects && <ErrorMessage>{errors.subjects.message}</ErrorMessage>}
        </fieldset>
    );
};
