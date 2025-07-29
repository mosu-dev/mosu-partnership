
import type { S3_FOLDER_NAMES } from "@/apps/constants/s3Folder";
import { useRef, useState, useCallback } from "react";

const UPLOAD_IMAGE_BASE_URL = import.meta.env.VITE_BASE_URL as string;

export type S3FolderName = keyof typeof S3_FOLDER_NAMES;

export type UploadFileToS3Response = {
    fileName: string;
    s3Key: string;
};

export async function uploadFileToS3(file: File, folderName: S3FolderName) {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${UPLOAD_IMAGE_BASE_URL}/s3?folderName=${encodeURIComponent(folderName)}`, {
        method: "POST",
        body: formData,
    });

    if (!response.ok) {
        throw new Error("Failed to upload file to S3");
    }

    const result = await response.json();
    return result.data;
}

type PENDING = "IDLE" | "PENDING" | "SUCCESS" | "ERROR";

export type UseUploadProfileImageOptions = {
    onSuccess?: (data: UploadFileToS3Response) => void;
};

export const useUploadProfileImage = ({ onSuccess }: UseUploadProfileImageOptions) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [isPending, setIsPending] = useState<PENDING>("IDLE");

    const [error, setError] = useState<string | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string>("");

    const handleFileChange = useCallback(
        async (event: React.ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files?.[0];
            if (!file) return;

            // 파일 타입 검증
            const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
            if (!allowedTypes.includes(file.type)) {
                setIsPending("ERROR");
                setError("JPG, PNG 파일만 업로드 가능합니다.");
                return;
            }

            // 파일 크기 검증 (10MB 제한)
            const maxSize = 10 * 1024 * 1024; // 10MB
            if (file.size > maxSize) {
                setIsPending("ERROR");
                setError("파일 크기는 10MB 이하만 가능합니다.");
                return;
            }

            try {
                setIsPending("PENDING");
                setError(null);

                const folderName: S3FolderName = "ADMISSION_TICKET_IMAGE";
                const data = await uploadFileToS3(file, folderName);

                setIsPending("SUCCESS");
                onSuccess?.(data);

                const objectUrl = URL.createObjectURL(file);
                setPreviewUrl(objectUrl);
            } catch (err) {
                if (err instanceof Error) {
                    setIsPending("ERROR");
                    setError(err.message);
                }
            }
        },
        [onSuccess]
    );

    const FileInput = useCallback(
        () => (
            <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/jpg,image/png"
                className="hidden"
                onChange={handleFileChange}
            />
        ),
        [handleFileChange]
    );

    return {
        isPending,
        FileInput,
        fileInputRef,
        previewUrl,
        error,
    };
};
