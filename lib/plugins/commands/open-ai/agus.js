import "dotenv/config";
import { Collection } from "../../collection.js";
import OpenAI from "openai";
import { format } from "util";
export class Execute extends Collection {
  constructor(m, sock) {
    super("open-ai", {
      description: "Komunikasi dengan AI",
    });
    this.options = {
      permission: 1,
      setup: {
        group: false,
      },
    };
    this.command = ["agus"];
    this.execute = async () => {
      if (!m.query) return m.reply("Halo ada yang bisa Agus bantu?");
      try {
        const openai = new OpenAI({ apiKey: process.env.ASSISTEN });
        // const assistant = await openai.beta.assistants.create({
        //   name: "Agus",
        //   instructions: "Kamu adalah asisten virtual Agus Irawan",
        //   tools: [{ type: "code_interpreter" }],
        //   model: "gpt-3.5-turbo",
        // });
        const thread = await openai.beta.threads.create();
        await openai.beta.threads.messages.create(thread.id, {
          role: "user",
          content: m.query,
        });
        // Use runs to wait for the assistant response and then retrieve it
        const run = await openai.beta.threads.runs.create(thread.id, {
          assistant_id: "asst_5HJJY4GoEY1JcgbmFgdQxOt5",
          instructions: "Jawab menggunakan bahasa gaul, dan namamu adalah Agus",
        });
        let runStatus = await openai.beta.threads.runs.retrieve(
          thread.id,
          run.id
        );

        // Polling mechanism to see if runStatus is completed
        // This should be made more robust.
        while (runStatus.status !== "completed") {
          await new Promise((resolve) => setTimeout(resolve, 2000));
          runStatus = await openai.beta.threads.runs.retrieve(
            thread.id,
            run.id
          );
        }
        // await m.reply(format(runStatus))

        // Get the last assistant message from the messages array
        const messages = await openai.beta.threads.messages.list(thread.id);

        // Find the last message for the current run
        const lastMessageForRun = messages.data
          .filter(
            (message) =>
              message.run_id === run.id && message.role === "assistant"
          )
          .pop();

        // If an assistant message is found, console.log() it
        if (lastMessageForRun) {
          return m.reply(`${lastMessageForRun.content[0].text.value}`);
        }
      } catch (err) {
        return m.reply(format(err));
      }
    };
  }
}
