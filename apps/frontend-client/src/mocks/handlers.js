import { rest, http } from "msw";

console.log({ rest, http }); // To verify which is defined

export const handlers = [
  (rest || http).post("/api/login", (req, res, ctx) => {
    const { email, password, firstName, lastName, username } = req.body;
    if (
      email === "user@example.com" &&
      password === "password123" &&
      firstName === "John" &&
      lastName === "Doe" &&
      username === "johndoe"
    ) {
      return res(
        ctx.json({
          message: "Login successful",
          token: "123456",
        }),
      );
    }

    return res(ctx.status(403), ctx.json({ message: "Invalid credentials" }));
  }),
];
