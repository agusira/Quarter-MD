import 'dotenv/config'
import { Collection } from "../../collection.js";
import axios from "axios";
import {format} from 'util'

export class Execute extends Collection {
  constructor(m, sock, { newWASocket, db, store, Function, attribute }) {
    super("costume/function", {
      parameter: "<code>",
      description: "Run JavaScript code directly",
    });
    this.options = {
      permission: 1,
      setup: {
        group: false,
      },
      prefix: "gpt",
    };
    this.special = async (query) => {
      const ChatGPTRequest = async (text) => {
        const result = {
          success: false,
          data: "Aku gak tau",
          message: [],
        };
        return await axios({
          method: "post",
          url: "https://api.openai.com/v1/completions",
          data: {
            model: "text-davinci-003",
            prompt: text,
            max_tokens: 1000,
            temperature: 0,
          },
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            "Accept-Language": "in-ID",
            Authorization: process.env.OPENAI_API_KEY,
          },
        })
          .then((response) => {
            if (response.status == 200) {
              const { choices } = response.data;
              if (choices && choices.length) {
                result.success = true;
                result.data = choices[0].text;
              }
            } else {
              result.message = "Failed response";
            }

            return result;
          })
          .catch((error) => {
            result.message = format(error);
            return result;
          });
      };

      const response = await ChatGPTRequest(query);

      if (!response.success) {
        return m.reply(response.message);
      }

      return m.reply(`${response.data}\n\n`);
    };
  }
}
