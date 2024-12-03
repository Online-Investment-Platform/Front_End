import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import CheckButton from "./index";

const meta: Meta<typeof CheckButton> = {
  title: "Components/CheckButton",
  component: CheckButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof CheckButton>;

function CheckButtonStory() {
  const [checked, setChecked] = useState(false);
  const handleCheck = () => {
    setChecked((prev) => !prev);
  };
  return <CheckButton isChecked={checked} onChange={handleCheck} />;
}

export const Default: Story = {
  render: () => <CheckButtonStory />,
};
