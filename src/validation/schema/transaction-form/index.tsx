import { z } from "zod";

export const BuyFormSchema = z.object({
  count: z
    .number({
      required_error: "수량을 입력해주세요",
      invalid_type_error: "수량은 숫자여야 합니다",
    })
    .min(1, "수량은 1주 이상이어야 합니다"),

  bidding: z
    .number({
      required_error: "호가를 입력해주세요",
      invalid_type_error: "호가는 숫자여야 합니다",
    })
    .gt(0, "호가는 0보다 커야 합니다"),
});

export type BuyFormData = z.infer<typeof BuyFormSchema>;
