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

import { RegisterFormSchema, RegisterSchema, type RegisterFormSchemaType, type RegisterSchemaType } from "@/models/RegisterFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegister } from "@/hooks/useRegister";
import { subject } from "@/constants/subjects";

const ErrorMessage = ({ children }: { children?: string }) => {
    return <p className="text-sm text-red-600">{children}</p>;
};

export default function FormPage() {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<RegisterSchemaType>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            orgName: "",
            password: "",
            userName: "",
            gender: "FEMALE",
            birth: "",
            phoneNumber: "",
            subject: "",
            subject2: "",
            lunch: false,
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
                s3Key: "", //몰랑
            });
        }
    };

    const onSubmit = async (data: RegisterFormSchemaType) => {
        try {
            const result = await requestRegister(data);
        } catch (error) {}
    };

    const onSubmitInvalid = (error: unknown) => {
        console.error("Form submission error:", error);
        alert("폼 제출에 오류가 발생했습니다. 다시 시도해주세요.");
        1;
    };

    const regions = ["서울", "부산", "대구", "인천", "광주", "대전", "울산", "세종", "경기", "강원", "충북", "충남", "전북", "전남", "경북", "경남", "제주"];

    return (
        <form onSubmit={handleSubmit(onSubmit, onSubmitInvalid)} className="space-y-6">
            {/* 제휴 업체명 */}
            <div className="space-y-2">
                <Label htmlFor="partnerCompany">제휴 업체명 *</Label>
                <Input id="partnerCompany" {...register("orgName")} placeholder="제휴 업체명을 입력해주세요" required />
                {errors.orgName && <ErrorMessage>{errors.orgName.message}</ErrorMessage>}
            </div>

            {/* 본인확인 비밀번호 */}
            <div className="space-y-2">
                <Label htmlFor="password">본인확인 비밀번호 (4자리) *</Label>
                <Input
                    id="password"
                    type="password"
                    {...register("password")}
                    value={watchField.password}
                    onChange={handlePasswordChange}
                    placeholder="입금확인을 위한 4자리 숫자"
                    maxLength={4}
                    required
                />
                {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
                <p className="text-sm text-gray-500">입금확인을 위한 비밀번호로 원하시는 4자리 숫자를 적어주세요</p>
            </div>

            {/* 이름 */}
            <div className="space-y-2">
                <Label htmlFor="name">이름 *</Label>
                <Input id="name" {...register("userName")} placeholder="성명을 입력해주세요" required />
                {errors.userName && <ErrorMessage>{errors.userName.message}</ErrorMessage>}
            </div>

            {/* 성별 */}
            <div className="space-y-2">
                <Label>성별 *</Label>
                <Select {...register("gender")}>
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
                        <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {watchField.birth ? format(new Date(watchField.birth), "yyyy년 MM월 dd일", { locale: ko }) : <span>생년월일을 선택해주세요</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar
                            mode="single"
                            selected={watchField.birth ? new Date(watchField.birth) : undefined}
                            {...register("birth")}
                            onSelect={(date) => setValue("birth", date?.toISOString().split("T")[0] || "")}
                            locale={ko}
                        />
                    </PopoverContent>
                </Popover>
                {errors.birth && <ErrorMessage>{errors.birth.message}</ErrorMessage>}
            </div>

            {/* 전화번호 */}
            <div className="space-y-2">
                <Label htmlFor="phoneNumber">전화번호 *</Label>
                <Input id="phoneNumber" {...register("phoneNumber")} value={watchField.phoneNumber} onChange={handlePhoneChange} placeholder="010-0000-0000" maxLength={13} required />
                {errors.phoneNumber && <ErrorMessage>{errors.phoneNumber.message}</ErrorMessage>}
            </div>

            {/* 탐구 1 */}
            <div className="space-y-2">
                <Label>탐구 1 *</Label>
                <Select {...register("subject")}>
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
                <Select {...register("subject2")}>
                    <SelectTrigger>
                        <SelectValue placeholder="두 번째 탐구 과목을 선택해주세요" />
                    </SelectTrigger>
                    <SelectContent>
                        {subject
                            .filter((subject) => subject !== watchField.subject)
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
                <RadioGroup value={watchField.lunch ? "true" : "false"} onValueChange={(value) => setValue("lunch", value === "true")}>
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
                <Select value={watchField.area} onValueChange={(value) => setValue("area", value)}>
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
                <Input id="testSchool" {...register("schoolName")} placeholder="응시할 학교명을 입력해주세요" required />
                {errors.schoolName && <ErrorMessage>{errors.schoolName.message}</ErrorMessage>}
            </div>

            {/* 수험표 사진 등록 */}
            <div className="space-y-2">
                <Label htmlFor="examPhoto">수험표 사진 등록 *</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <input id="examPhoto" type="file" accept="image/*" onChange={handleFileChange} className="hidden" required />
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
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 mb-4">
                신청서 제출
            </Button>
        </form>
    );
}
