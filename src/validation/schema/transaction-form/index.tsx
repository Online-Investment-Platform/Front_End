import { z } from "zod";

export const BuyFormSchema = z.object({
  count: z.number().min(1, "수량은 1주 이상이어야 합니다"),
  bidding: z.number().min(0, "호가는 0보다 커야 합니다"),
});

export type BuyFormData = z.infer<typeof BuyFormSchema>;
