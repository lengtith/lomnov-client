import { StoryFn, Meta } from "@storybook/react";
import InputField, { InputFieldProps } from "./InputField";
import { useState } from "react";

export default {
  title: "Components/InputField",
  component: InputField,
  argTypes: {
    label: { control: "text" },
    type: { control: "text" },
    error: { control: "text" },
    hasToggleIcon: { control: "boolean" },
    visible: { control: "boolean" },
  },
} as Meta;

const Template: StoryFn<InputFieldProps> = (args) => {
  const [isFocused, setIsFocused] = useState(false);
  const [visible, setVisible] = useState(args.visible || false);

  return (
    <InputField
      {...args}
      isFocused={isFocused}
      setIsFocused={setIsFocused}
      visible={visible}
      toggleVisibility={() => setVisible(!visible)}
    />
  );
};

// Define the individual stories
export const Default = Template.bind({});
Default.args = {
  label: "Email",
  type: "text",
  register: {},
  error: "",
};

export const WithError = Template.bind({});
WithError.args = {
  label: "Email",
  type: "text",
  register: {},
  error: "Invalid email address",
};

export const PasswordField = Template.bind({});
PasswordField.args = {
  label: "Password",
  type: "password",
  register: {},
  error: "",
  hasToggleIcon: true,
  visible: false,
};
