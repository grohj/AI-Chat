# The OH-SO wonderful GPT arena

- Preconditions:
- If you wanna use ollama install ollama using `curl -fsSL https://ollama.com/install.sh | sh`
- Then install the `neural-chat` model using `ollama pull neural-chat`

- React + TS + Chakra UI
- To run `pnpm install` and `pnpm dev`
- Frontend is ready
- Prepared abstraction for GPT prompts, see `gpts/GptApi.ts`
- No backend, it is one-trick pony
- Streaming response from ollama works :) Now question goes to first Ollama it creates a response on which the second tries to create a follow up question.


- [What is looks like](./media/img.png)
- [What is looks like too](./media/img_1.png)
- 