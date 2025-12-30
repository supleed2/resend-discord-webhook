import * as z from "zod";
import { Embed, Webhook } from "@teever/ez-hook";

const Email = z.object({
  created_at: z.coerce.date(),
  data: z.object({
    created_at: z.coerce.date(),
    from: z.string(),
    headers: z.array(z.object({
      name: z.string(),
      value: z.string()
    })).optional(),
    subject: z.string(),
    to: z.array(z.string()).nonempty()
  }),
  type: z.string()
});

export default {
  async fetch(request, env, ctx): Promise<Response> {
    if (request.method === "POST") {
      try {
        const text = await request.json();
        const email = Email.parse(text);
        const embed = new Embed()
          .addField("Type", email.type, true)
          .addField("Date & Time", email.created_at.toUTCString(), true)
          .addField("\u200B", "\u200B", true)
          .addField("From", email.data.from, true)
          .addField("To", email.data.to.join(", "), true)
          .addField("Subject", email.data.subject, false);
        await new Webhook(env.WEBHOOK_URL).addEmbed(embed).send();
      } catch (e) {
        console.error("Failed to parse email:", e);
        await new Webhook(env.WEBHOOK_URL).setContent(`Failed to parse email: ${e}`).send();
      }
    }
    return new Response(null, {
      status: 200
    });
  },
} satisfies ExportedHandler<Env>;
