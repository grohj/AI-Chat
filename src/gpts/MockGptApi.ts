import {GptApi} from "./GptApi.ts";


const RANDOM_SHIT = ["Once, you made promises. Better products for customers, more customers for brands, more brands that grow.",
    "And today? Most companies are still waiting for their investments in digital to pay off.",
    "But hey, digital, it’s not your fault. It was us, the people. We thought making everything digital would solve every problem. Instead, now every problem is digital."
]

export class MockGptApi implements GptApi<string, string> {

    async prompt(text: string, second:boolean) {
        if(second) return RANDOM_SHIT[Math.trunc(Math.random()*3)];
        await new Promise((res) => setTimeout(res, 3000));

        if (Math.random() > 0.7)
            throw 'Fuck';

        return `Prompted: ${text}\nResponse: ${RANDOM_SHIT[Math.trunc(Math.random()*3)]}`


    }

}