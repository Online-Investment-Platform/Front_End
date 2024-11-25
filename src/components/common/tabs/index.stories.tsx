import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "./index";

const meta: Meta<typeof Tabs> = {
  title: "Components/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  argTypes: {
    defaultValue: {
      control: "text",
      defaultValue: "tab1",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  args: {
    defaultValue: "tab1",
    children: (
      <>
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger rounded="md" buttonColor="red" value="tab2">
            Tab 2
          </TabsTrigger>
          <TabsTrigger buttonColor="blue" value="tab3">
            Tab 3
          </TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Tab1의 내용입니다.</TabsContent>
        <TabsContent value="tab2">Tab2의 내용입니다.</TabsContent>
        <TabsContent className="mt-23" value="tab3">
          Tab3의 내용입니다.
        </TabsContent>
      </>
    ),
  },
};
