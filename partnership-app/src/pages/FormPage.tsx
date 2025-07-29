import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { CalendarIcon, Upload } from "lucide-react";

import { useForm } from "react-hook-form";

import { RegisterFormSchema, type RegisterFormSchemaType } from "@/models/RegisterFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegister } from "@/hooks/useRegister";
import { subject } from "@/constants/subjects";
import { useRegisterDate } from "@/hooks/useRegisterDate";
import { regions } from "@/constants/regions";
import { ErrorMessage } from "@/apps/ui/ErrorMessage";

export default function FormPage() {
    const { examDate, examMonth, examYear } = useRegisterDate();
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<RegisterFormSchemaType>({
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
    const watchField = watch();

    const formatPhoneNumber = (value: string) => {
        const numbers = value.replace(/[^\d]/g, "");
        if (numbers.length <= 3) return numbers;
        if (numbers.length <= 7) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
        return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
    };
    const formatKoreaTime = (date?: Date) => {
        const krDate = date?.toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        });
        return krDate?.replace(/\. /g, "-").replace(/\.$/, "");
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatPhoneNumber(e.target.value);
        setValue("phoneNumber", formatted);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^\d]/g, "").slice(0, 4);
        setValue("password", value);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        if (file) {
            setValue("admissionTicket", {
                fileName: file.name,
                s3Key: "temp",
            });
        }
    };

    const onSubmit = async (data: RegisterFormSchemaType) => {
        try {
            await requestRegister(data);
        } catch (error) {
            console.error("Form submission error:", error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <input type="hidden" {...register("examDate")} value="2024-12-01" />
                {/* 제휴 업체명 */}
                <div className="space-y-2">
                    <Label htmlFor="partnerCompany">제휴 업체명 *</Label>
                    <Input id="partnerCompany" {...register("orgName")} placeholder="제휴 업체명을 입력해주세요" />
                    {errors.orgName && <ErrorMessage>{errors.orgName.message}</ErrorMessage>}
                </div>

                {/* 본인확인 비밀번호 */}
                <div className="space-y-2">
                    <Label htmlFor="password">본인확인 비밀번호 (4자리) *</Label>
                    <Input
                        id="password"
                        type="password"
                        value={watchField.password}
                        onChange={handlePasswordChange}
                        placeholder="입금확인을 위한 4자리 숫자"
                        maxLength={4}
                    />
                    {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
                    <p className="text-sm text-gray-500">입금확인을 위한 비밀번호로 원하시는 4자리 숫자를 적어주세요</p>
                </div>

                {/* 이름 */}
                <div className="space-y-2">
                    <Label htmlFor="name">이름 *</Label>
                    <Input id="name" {...register("userName")} placeholder="성명을 입력해주세요" />
                    {errors.userName && <ErrorMessage>{errors.userName.message}</ErrorMessage>}
                </div>

                {/* 성별 */}
                <div className="space-y-2">
                    <Label>성별 *</Label>
                    <Select
                        value={watchField.gender}
                        onValueChange={(value) => {
                            setValue("gender", value as "MALE" | "FEMALE");
                        }}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="성별을 선택해주세요" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="MALE">남성</SelectItem>
                            <SelectItem value="FEMALE">여성</SelectItem>
                        </SelectContent>
                    </Select>
                    {errors.gender && <ErrorMessage>{errors.gender.message}</ErrorMessage>}
                </div>

                {/* 생년월일 */}
                <div className="space-y-2">
                    <Label>생년월일 *</Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                className="w-full justify-start text-left font-normal bg-transparent"
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {watchField.birth ? (
                                    format(new Date(watchField.birth), "yyyy년 MM월 dd일", {
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
                                selected={watchField.birth ? new Date(watchField.birth) : undefined}
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

                {/* 전화번호 */}
                <div className="space-y-2">
                    <Label htmlFor="phoneNumber">전화번호 *</Label>
                    <Input
                        id="phoneNumber"
                        value={watchField.phoneNumber}
                        onChange={handlePhoneChange}
                        placeholder="010-0000-0000"
                        maxLength={13}
                    />
                    {errors.phoneNumber && <ErrorMessage>{errors.phoneNumber.message}</ErrorMessage>}
                </div>

                {/* 탐구 1 */}
                <div className="space-y-2">
                    <Label>탐구 1 *</Label>
                    <Select
                        value={watchField.subject}
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

                {/* 탐구 2 */}
                <div className="space-y-2">
                    <Label>탐구 2 *</Label>
                    <Select
                        value={watchField.subject2}
                        onValueChange={(value) => {
                            setValue("subject2", value);
                        }}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="두 번째 탐구 과목을 선택해주세요" />
                        </SelectTrigger>
                        <SelectContent>
                            {subject
                                .filter((subjectItem) => subjectItem !== watchField.subject)
                                .map((subject) => (
                                    <SelectItem key={subject} value={subject}>
                                        {subject}
                                    </SelectItem>
                                ))}
                        </SelectContent>
                    </Select>
                    {errors.subject2 && <ErrorMessage>{errors.subject2.message}</ErrorMessage>}
                </div>

                {/* 점심 도시락 신청 여부 */}
                <div className="space-y-3">
                    <Label>점심 도시락 신청 여부 *</Label>
                    <RadioGroup
                        value={watchField.lunch ? "yes" : "no"}
                        onValueChange={(value) => {
                            setValue("lunch", value === "yes");
                        }}
                    >
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="lunch-yes" />
                            <Label htmlFor="lunch-yes">네</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="lunch-no" />
                            <Label htmlFor="lunch-no">아니오</Label>
                        </div>
                    </RadioGroup>
                    {errors.lunch && <ErrorMessage>{errors.lunch.message}</ErrorMessage>}
                </div>

                {/* 응시 지역 */}
                <div className="space-y-2">
                    <Label>응시 지역 *</Label>
                    <Select
                        value={watchField.area}
                        onValueChange={(value) => {
                            setValue("area", value);
                        }}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="응시 지역을 선택해주세요" />
                        </SelectTrigger>
                        <SelectContent>
                            {regions.map((region) => (
                                <SelectItem key={region} value={region}>
                                    {region}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {errors.area && <ErrorMessage>{errors.area.message}</ErrorMessage>}
                </div>

                {/* 응시학교명 */}
                <div className="space-y-2">
                    <Label htmlFor="testSchool">응시학교명 *</Label>
                    <Input id="testSchool" {...register("schoolName")} placeholder="응시할 학교명을 입력해주세요" />
                    {errors.schoolName && <ErrorMessage>{errors.schoolName.message}</ErrorMessage>}
                </div>

                {/* 수험표 사진 등록 */}
                <div className="space-y-2">
                    <Label htmlFor="examPhoto">수험표 사진 등록 *</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <input
                            id="examPhoto"
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                        <Label htmlFor="examPhoto" className="cursor-pointer">
                            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                            <div className="text-sm text-gray-600">
                                {watchField.admissionTicket.fileName ? (
                                    <span className="text-green-600">{watchField.admissionTicket.fileName}</span>
                                ) : (
                                    <>
                                        <span className="font-medium text-blue-600">클릭하여 파일 선택</span>
                                        <span className="text-gray-500"> 또는 드래그하여 업로드</span>
                                    </>
                                )}
                            </div>
                            <p className="text-xs text-gray-500 mt-2">JPG, PNG 파일만 업로드 가능</p>
                        </Label>
                    </div>
                    {errors.admissionTicket && <ErrorMessage>{errors.admissionTicket.message}</ErrorMessage>}
                </div>

                {/* 제출 버튼 */}
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 mb-4" disabled={isPending}>
                    {isPending ? "제출 중..." : "신청서 제출"}
                </Button>
            </form>
        </div>
    );
}
