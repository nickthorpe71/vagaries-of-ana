import { z } from "zod";

export const messageValidator = z.object({
    id: z.string(),
    senderId: z.string(),
    text: z.string().min(1).max(1000),
    timestamp: z.number().int().positive(),
});

export const messageArrayValidator = z.array(messageValidator);

export type Message = z.infer<typeof messageValidator>;
