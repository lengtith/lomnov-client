import { Meta, StoryFn } from "@storybook/react";
import { within, userEvent } from "@storybook/testing-library";
import SignupForm from "./SignupForm";
import { handlers } from "../../../../mocks/handlers";
import { action } from "@storybook/addon-actions"; // For logging actions

export default {
  title: "Components/SignupForm",
  component: SignupForm,
  parameters: {
    msw: {
      handlers,
    },
  },
} as Meta;

const Template: StoryFn = (args) => <SignupForm {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const WithError = Template.bind({});
WithError.args = {};

Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  // Simulating user interaction
  await userEvent.type(
    canvas.getByRole("textbox", { name: /first name/i }),
    "John",
  );
  await userEvent.type(
    canvas.getByRole("textbox", { name: /last name/i }),
    "Doe",
  );
  await userEvent.type(
    canvas.getByRole("textbox", { name: /username/i }),
    "johndoe",
  );
  await userEvent.type(
    canvas.getByRole("textbox", { name: /email/i }),
    "john@example.com",
  );

  action("Form data")({
    firstname: "John",
    lastname: "Doe",
    email: "john@example.com",
    password: "password123",
  });

  await userEvent.type(canvas.getByLabelText("Password"), "password123");
  await userEvent.click(canvas.getByRole("button", { name: /register/i }));
  console.log("Form data submitted:", {
    email: "john@example.com",
    password: "password123",
  });
};
