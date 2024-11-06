/* eslint-disable */
// components/Carousel/Carousel.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import Carousel from "./index";
import { CarouselProps } from "./types";

type CarouselStoryProps = Omit<CarouselProps, "children">;

const meta = {
  title: "Components/Carousel",
  component: Carousel,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="max-w-5xl mx-auto bg-white p-4">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<CarouselStoryProps>;

// 샘플 카드 컴포넌트
const SampleCard = ({ isPositive }: { isPositive: boolean }) => (
  <div className={`${isPositive ? "bg-red-50" : "bg-blue-50"} p-6 rounded-lg`}>
    <h3 className="text-sm text-gray-600">코스닥 종합</h3>
    <p className="text-2xl font-bold my-2">35.33347,47</p>
    <div className={isPositive ? "text-red-500" : "text-blue-500"}>
      {isPositive ? "▲" : "▼"} 200.2%
    </div>
    <svg className="mt-4" width="100" height="40">
      <path
        d={
          isPositive
            ? "M0 35 L20 30 L40 25 L60 20 L80 15 L100 10"
            : "M0 10 L20 15 L40 25 L60 20 L80 30 L100 35"
        }
        stroke="currentColor"
        fill="none"
        className={isPositive ? "text-red-500" : "text-blue-500"}
        strokeWidth="2"
      />
    </svg>
  </div>
);

export const Default: Story = {
  args: {
    title: "주가 지수",
    autoPlay: true,
    autoPlayInterval: 3000,
    className: "w-full",
  },
  render: (args) => (
    <Carousel {...args}>
      <SampleCard isPositive={false} />
      <SampleCard isPositive={true} />
      <SampleCard isPositive={false} />
      <SampleCard isPositive={true} />
      <SampleCard isPositive={false} />
    </Carousel>
  ),
};

export const NoAutoPlay: Story = {
  args: {
    title: "주가 지수",
    autoPlay: false,
    className: "w-full",
  },
  render: (args) => (
    <Carousel {...args}>
      <SampleCard isPositive={false} />
      <SampleCard isPositive={true} />
      <SampleCard isPositive={false} />
    </Carousel>
  ),
};

export const FastAutoPlay: Story = {
  args: {
    title: "주가 지수",
    autoPlay: true,
    autoPlayInterval: 1000,
    className: "w-full",
  },
  render: (args) => (
    <Carousel {...args}>
      <SampleCard isPositive={false} />
      <SampleCard isPositive={true} />
      <SampleCard isPositive={false} />
      <SampleCard isPositive={true} />
    </Carousel>
  ),
};
