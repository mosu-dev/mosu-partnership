import type { RegisterFormSchemaType } from "@/models/RegisterFormSchema";
import { useState } from "react";

export const useRegister = () => {
  const [isPending, setIsPending] = useState(false);

  const requestRegister = async (payload: RegisterFormSchemaType) => {
    setIsPending(true);
    try {
      const response = await fetch(
        "https://api-partnership.mosuedu.com/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("파트너십 모의수능 신청이 실패했습니다.");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error during registration:", error);
      throw error;
    } finally {
      setIsPending(false);
    }
  };

  return { requestRegister, isPending };
};
