import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import Dropdown from "./index";

const meta: Meta<typeof Dropdown> = {
  title: "Components/Dropdown",
  component: Dropdown,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Dropdown>;

// 스토리북 컴포넌트로 분리
function DropdownStory() {
  const [selectedValue, setSelectedValue] = useState("");

  return (
    <Dropdown
      selectedValue={selectedValue}
      onSelect={(value) => setSelectedValue(value as string)}
    >
      <Dropdown.Toggle />
      <Dropdown.Wrapper>
        <Dropdown.Item value="option1">옵션 1</Dropdown.Item>
        <Dropdown.Item value="option2">옵션 2</Dropdown.Item>
        <Dropdown.Item value="option3">옵션 3</Dropdown.Item>
      </Dropdown.Wrapper>
    </Dropdown>
  );
}

export const Default: Story = {
  render: () => <DropdownStory />,
};

function CustomToggleDropdown() {
  const [selectedValue, setSelectedValue] = useState("");

  return (
    <div className="w-64">
      <Dropdown
        selectedValue={selectedValue}
        onSelect={(value) => setSelectedValue(value as string)}
        className="w-200"
      >
        <Dropdown.Toggle>
          <div className="flex items-center">
            🌈 현재 선택: {selectedValue || "없음"}
          </div>
        </Dropdown.Toggle>
        <Dropdown.Wrapper>
          <Dropdown.Item value="red">🔴 레드</Dropdown.Item>
          <Dropdown.Item value="blue">🔵 블루</Dropdown.Item>
          <Dropdown.Item value="green">🟢 그린</Dropdown.Item>
        </Dropdown.Wrapper>
      </Dropdown>
    </div>
  );
}

export const WithCustomToggle: Story = {
  render: () => <CustomToggleDropdown />,
};

function PreSelectedDropdown() {
  const [selectedValue, setSelectedValue] = useState("option2");

  return (
    <div className="w-64">
      <Dropdown
        selectedValue={selectedValue}
        onSelect={(value) => setSelectedValue(value as string)}
      >
        <Dropdown.Toggle />
        <Dropdown.Wrapper>
          <Dropdown.Item value="option1">옵션 1</Dropdown.Item>
          <Dropdown.Item value="option2">옵션 2 (기본 선택)</Dropdown.Item>
          <Dropdown.Item value="option3">옵션 3</Dropdown.Item>
        </Dropdown.Wrapper>
      </Dropdown>
    </div>
  );
}

export const PreSelectedValue: Story = {
  render: () => <PreSelectedDropdown />,
};

function LongListDropdown() {
  const [selectedValue, setSelectedValue] = useState("");

  return (
    <div className="w-64">
      <Dropdown
        selectedValue={selectedValue}
        onSelect={(value) => setSelectedValue(value as string)}
      >
        <Dropdown.Toggle />
        <Dropdown.Wrapper className="max-h-48 overflow-y-auto">
          {Array.from({ length: 10 }, (_, i) => (
            <Dropdown.Item key={i} value={`option${i + 1}`}>
              긴 목록 옵션 {i + 1}
            </Dropdown.Item>
          ))}
        </Dropdown.Wrapper>
      </Dropdown>
    </div>
  );
}

export const LongList: Story = {
  render: () => <LongListDropdown />,
};
