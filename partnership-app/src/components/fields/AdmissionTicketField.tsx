import { Upload } from "lucide-react";
import { Label } from "../ui/label";
import { ErrorMessage } from "@/apps/ui/ErrorMessage";
import type { RegisterFormSchemaType } from "@/apps/models/RegisterFormSchema";
import { useFormContext } from "react-hook-form";
import { useUploadProfileImage } from "@/hooks/useImageUpload";
import { Spinner } from "@/apps/ui/Spinner";

export const AdmissionTicketField = () => {
    const {
        setValue,
        formState: { errors },
    } = useFormContext<RegisterFormSchemaType>();

    const {
        FileInput,
        isPending,
        error: uploadError,
        previewUrl,
    } = useUploadProfileImage({
        onSuccess: (data) => {
            setValue("admissionTicket", {
                fileName: data.fileName,
                s3Key: data.s3Key,
            });
        },
    });

    return (
        <div className="space-y-2">
            <Label htmlFor="examPhoto" required>
                수험표 사진 등록
            </Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <FileInput />
                {isPending === "IDLE" ? (
                    <div
                        className="cursor-pointer"
                        onClick={() => (document.querySelector('input[type="file"]') as HTMLInputElement)?.click()}
                    >
                        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                        <p className="text-xs text-gray-500 mt-2">JPG, PNG 파일만 업로드 가능</p>
                    </div>
                ) : isPending === "PENDING" ? (
                    <Spinner />
                ) : (
                    <div className="mt-4">
                        <img
                            src={previewUrl}
                            alt="수험표 미리보기"
                            className="mx-auto max-w-xs max-h-48 object-contain rounded border"
                        />
                    </div>
                )}
            </div>
            {uploadError && <ErrorMessage>{uploadError}</ErrorMessage>}
            {errors.admissionTicket && <ErrorMessage>{errors.admissionTicket.message}</ErrorMessage>}
        </div>
    );
};
