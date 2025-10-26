---
title: "Building pi-assistant: A Tool-Calling Voice Assistant for Raspberry Pi"
description: "pi-assistant is a local, open-source voice assistant for Raspberry Pi that performs speech recognition, tool-calling, and smart home control entirely offline using efficient language models."
---

# Building pi-assistant: A Tool-Calling Voice Assistant for Raspberry Pi

---

**TL;DR**

-   **Code:** [github.com/alexander-fischer/pi-assistant](https://github.com/alexander-fischer/pi-assistant)
-   **What:** Local, privacy-friendly voice assistant for Raspberry Pi that answers questions, reports weather, and controls your smart home — all running offline on small, efficient language models.
-   **Tech stack:**

    -   Wake word detection: [openWakeWord](https://github.com/dscripka/openWakeWord)
    -   ASR: [nemo-parakeet-tdt-0.6b-v2](https://huggingface.co/nvidia/parakeet-tdt-0.6b-v2), [nvidia/canary-180m-flash](https://huggingface.co/nvidia/canary-180m-flash)
    -   Function calling: [Arch-Function 1.5B](https://huggingface.co/katanemo/Arch-Function-1.5B)
    -   Answer generation: [LFM2-8B-A1B](https://huggingface.co/LiquidAI/LFM2-8B-A1B)
    -   TTS: Piper

-   **Hardware:** Raspberry Pi 5 (16 GB RAM), Jabra Speak 410 (USB mic/speaker)

---

Voice assistants are everywhere, but most of them are tightly coupled with cloud services and closed ecosystems. Devices like Alexa constantly listen to your home environment and can intrude deeply into your privacy, since voice data is typically processed remotely. I wanted a voice assistant that actually runs on my own hardware, keeps my data private, and can be extended for my smart home. This was the motivation behind pi-assistant, a modular and privacy-friendly tool-calling voice assistant built for the Raspberry Pi. In this article, I’ll explain what pi-assistant can do, how it works, the hardware and software behind it, and share some insights from the development process.

## What is pi-assistant?

pi-assistant is an open-source framework designed to bring a fully functional voice assistant to the Raspberry Pi. It answers weather and general knowledge questions, and it can control smart home devices like Philips Hue, all processed locally with no need for cloud-based services. The assistant listens for a wake word, transcribes your speech into text, interprets the instruction using small and efficient language models, executes the corresponding tool, and speaks the answer out loud.

The core components work together as follows: Wake word detection is handled by [openWakeWord](https://github.com/dscripka/openWakeWord), which only activates the assistant when you say a trigger phrase like “Hey Jarvis.” This approach conserves system resources, as the device does not have to transcribe everything it hears. Once activated, speech is transcribed into text using small ASR models: [nemo-parakeet-tdt-0.6b-v2](https://huggingface.co/nvidia/parakeet-tdt-0.6b-v2) for English or [nvidia/canary-180m-flash](https://huggingface.co/nvidia/canary-180m-flash) for multilingual support. The transcription is passed to a function-calling language model, in this case [Arch-Function 1.5B](https://huggingface.co/katanemo/Arch-Function-1.5B), which interprets the request and decides which tool to use. These tools currently include weather information, Wikipedia lookups, and smart home control via Philips Hue. The tool’s response is then turned into natural language by [LFM2-8B-A1B](https://huggingface.co/LiquidAI/LFM2-8B-A1B) and spoken out loud using piper TTS. I also tested Kokoro models for TTS, but they proved too slow for practical use on the Raspberry Pi.

## Hardware Setup

For my setup, I used a Raspberry Pi 5 with 16GB RAM, which offers enough performance for real-time voice processing and lightweight models. Audio input and output are handled by a Jabra Speak 410, a simple but effective USB speaker and microphone combo.

![Raspberry Pi 5 and Jabra Speak 410 setup](/images/pi_jabra.jpeg)

## Workflow in Detail

When you interact with pi-assistant, the process begins with wake word detection. I chose [openWakeWord](https://github.com/dscripka/openWakeWord) for its efficiency and the ability to train custom models on your own voice samples, which helps improve accuracy. There’s a [training guide](https://github.com/dscripka/[openWakeWord]%28https://github.com/dscripka/openWakeWord%29/blob/main/notebooks/training_models.ipynb) available if you want to experiment with custom wake words. Once the wake word is detected, the assistant records your command and uses the ASR model to convert speech into text. These ASR models are specifically selected for their speed and resource efficiency on the Raspberry Pi.

Next, the text instruction is processed by [Arch-Function 1.5B](https://huggingface.co/katanemo/Arch-Function-1.5B). This small yet capable model is responsible for recognizing which action or “tool” to invoke, whether that’s checking the weather, answering a Wikipedia query, or controlling your Philips Hue lights. Arch-Function 1.5B manages to perform nearly as well as much larger models, which makes it a practical choice for edge devices.

Once the requested tool has provided its output, [LFM2-8B-A1B](https://huggingface.co/LiquidAI/LFM2-8B-A1B) generates a natural, spoken response. Piper is used for TTS because it delivers fast, intelligible speech with minimal latency. The entire process, from wake word to spoken answer, runs entirely on the Raspberry Pi, with no reliance on cloud APIs.

## Known Limitations

While pi-assistant is already functional, there are some flaws. Occasionally, the function-calling model gives generic fallback answers such as “I cannot provide this information,” even if a tool is available to handle the query. Improving this behavior is an ongoing process and may require further prompt engineering or fine-tuning of the models.

## Outlook: What's Next for pi-assistant?

The performance of pi-assistant on the Raspberry Pi 5 is robust, and for many queries and tasks it reaches response times and accuracy similar to commercial assistants such as Siri (at least prior to the Apple Intelligence update). The overall capabilities are limited by the computational resources of a single-board computer, but with efficient language models and optimized workflows, a significant portion of everyday assistant use cases can already be handled locally.

Looking ahead, I'm interested in exploring ways to expand the assistant's capabilities beyond current hardware boundaries. One area I'm planning to investigate is either connecting an external GPU to the Raspberry Pi or buying a Mac mini. This could open up new options for running even larger models or enabling more advanced features, which are currently out of reach due to hardware constraints.

You can find the pi-assistant source code and further documentation on [GitHub](https://github.com/alexander-fischer/pi-assistant). Contributions, feedback, and new ideas are always welcome!
