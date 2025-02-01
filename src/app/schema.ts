import { z } from 'zod';

const userSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  age: z.number().min(18, "You must be at least 18 years old."),
});

export default userSchema;
