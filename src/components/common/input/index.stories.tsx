/*eslint-disable*/

import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from ".";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    name: "default",
    placeholder: "입력해주세요",
  },
};

export const Email: Story = {
  args: {
    name: "email",
    type: "email",
    placeholder: "이메일 주소 입력",
  },
};

export const Password: Story = {
  args: {
    name: "password",
    type: "password",
    placeholder: "비밀번호 입력",
    height: "56px",
  },
};

export const Disabled: Story = {
  args: {
    name: "disabled",
    placeholder: "비활성화된 입력",
    disabled: true,
  },
};

export const WithError: Story = {
  args: {
    name: "error",
    placeholder: "에러 상태",
    error: "에러 메시지입니다.",
  },
};

export const WithEvents: Story = {
  args: {
    name: "events",
    placeholder: "이벤트 테스트",
    onBlur: (e) => console.log("Input lost focus:", e.target.value),
    onChange: (e) => console.log("Input value changed:", e.target.value),
  },
};

const schema = z.object({
  email: z.string().email("유효한 이메일 주소를 입력해주세요."),
});

type FormData = z.infer<typeof schema>;

// 별도의 컴포넌트로 React Hook Form 사용 예제를 분리
const FormWithHookForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        {...register("email")}
        type="email"
        placeholder="이메일 주소 입력"
        error={errors.email?.message}
      />
      <button type="submit" style={{ marginTop: "10px" }}>
        제출
      </button>
    </form>
  );
};

export const WithReactHookForm: Story = {
  render: () => <FormWithHookForm />,
};
