// LoginForm.stories.tsx
import { Meta, StoryFn } from "@storybook/react";
import { within, userEvent } from "@storybook/testing-library";
import LoginForm from "./LoginForm";
import { handlers } from "../../../../mocks/handlers";
import { action } from "@storybook/addon-actions"; // For logging actions

export default {
  title: "Components/LoginForm",
  component: LoginForm,
  parameters: {
    msw: {
      handlers,
    },
  },
} as Meta;

const Template: StoryFn = (args) => <LoginForm {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const WithError = Template.bind({});
WithError.args = {};

Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  // Simulating user interaction
  await userEvent.type(
    canvas.getByRole("textbox", { name: /email/i }),
    "user@example.com",
  );
  await userEvent.type(canvas.getByLabelText("Password"), "password123");
  await userEvent.click(canvas.getByRole("button", { name: /sign in/i }));

  // Logging form submission for verification
  action("Form data")({
    email: "user@example.com",
    password: "password123",
  });

  // Use console.log for debug logging
  console.log("Form data submitted:", {
    email: "user@example.com",
    password: "password123",
  });
};
