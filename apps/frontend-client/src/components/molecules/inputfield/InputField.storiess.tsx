// import React, { useState } from "react";
// import { Meta, StoryFn } from "@storybook/react";
// import InputField from "ms-ui-components/src/components/inputfield/InputField";

// export default {
//   title: "Components/InputField",
//   component: InputField,
//   argTypes: {
//     type: { control: "text" },
//     name: { control: "text" },
//     value: { control: "text" },
//     placeholder: { control: "text" },
//     error: { control: "text" },
//     className: { control: "text" },
//     onChange: { action: "changed" },
//   },
// } as Meta<typeof InputField>;

// const Template: StoryFn<typeof InputField> = (args) => {
//   const [value, setValue] = useState(args.value || "");
//   return (
//     <InputField
//       {...args}
//       value={value}
//       onChange={(e) => {
//         setValue(e.target.value);
//         args.onChange(e);
//       }}
//     />
//   );
// };

// export const Default = Template.bind({});
// Default.args = {
//   type: "text",
//   name: "example",
//   placeholder: "Enter text",
//   value: "",
//   error: "",
//   className: "",
// };

// export const Password = Template.bind({});
// Password.args = {
//   type: "password",
//   name: "password",
//   placeholder: "Enter password",
//   value: "",
//   error: "",
//   className: "",
// };
