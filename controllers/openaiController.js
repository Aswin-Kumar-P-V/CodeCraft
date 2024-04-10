const dotenv = require("dotenv");
dotenv.config();
const OpenAI = require("openai");
const openai = new OpenAI(process.env.OPENAI_API_KEY);

async function bugFixController(req, res) {
  try {
      const { text } = req.body;
      if (!text) {
          return res.status(400).json({
              message: "Missing 'text' property in the request body"
          });
      }

      const response1 = await openai.chat.completions.create({
        model: "gpt-3.5-turbo-0125",
        messages: [
          { role: "system", content: `only give the code , you are a coding expert. Here is a sample code :${text} fix any sort of bugs in this code` },
          { role: "user", content: text },
        ],
        temperature: 0.7,
      });
  
      if (
        response1
      ) {
        return res.status(200).json({
            message: "code fixed successfully",
            data: response1.choices[0].message.content});
      } else {
        throw new Error("No explanation available.");
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
    }
}


async function promtToCodeGeneratorController(req, res) {
  console.log(req.body);
  try {
    const { text, language } = req.body;

    if (!text || !language) {
      return res
        .status(400)
        .json({
          message:
            "Missing text or language properties in the request body.",
        });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-0125",
      messages: [
        {
          role: "system",
          content: `Generate and give only the code from the following prompt: ${text} in ${language}`,
        },
        { role: "user", content: text },
      ],
      temperature: 0.7,
    });

    if (response) {
      return res
        .status(200)
        .json({
          message: "Code generation successful",
          data: response.choices[0].message.content,
        });
    } else {
      return res.status(404).json({ message: "No code available" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function codeController(req, res) {
  console.log(req.body);
  try {
    const { code, language } = req.body;

    if (!code || !language) {
      return res
        .status(400)
        .json({
          message:
            "Missing 'code', 'language' properties in the request body.",
        });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-0125",
      messages: [
        {
          role: "system",
          content: `Generate the code only, Convert the following  code ${code} to ${language}:`,
        },
        { role: "user", content: code },
      ],
      temperature: 0.7,
    });

    if (response) {
      return res
        .status(200)
        .json({
          message: "Code conversion successful",
          data: response.choices[0].message.content,
        });
    } else {
      return res.status(404).json({ message: "No conversion available" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function explanationController(req,res) {
  console.log(req.body);
  try {
    const {text } = req.body;

    if (!text) {
      return res
        .status(400)
        .json({
          message:
            "Missing 'text' properties in the request body.",
        });
    }
    const response1 = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-0125",
      messages: [
        { role: "system", content: `Explain the following code${text}` },
        { role: "user", content: text },
      ],
      temperature: 0.7,
    });

    if (
      response1
    ) {
      return res.status(200).json({
          message: "Code conversion successful",
          data: response1.choices[0].message.content});
    } else {
      throw new Error("No explanation available.");
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function optimizationController(req,res) {
  console.log(req.body);
  try {
    const {text } = req.body;

    if (!text) {
      return res
        .status(400)
        .json({
          message:
            "Missing 'text' properties in the request body.",
        });
    }
    const response1 = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-0125",
      messages: [
        { role: "system", content: `you are a code optimizer,only give the code ,optimze the given code${text}` },
        { role: "user", content: text },
      ],
      temperature: 0.7,
    });

    if (
      response1
    ) {
      return res.status(200).json({
          message: "Code conversion successful",
          data: response1.choices[0].message.content});
    } else {
      throw new Error("No explanation available.");
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function commentsController(req, res) {
  try {
      const { text } = req.body;
      if (!text) {
          return res.status(400).json({
              message: "Missing 'text' property in the request body"
          });
      }

      const response1 = await openai.chat.completions.create({
        model: "gpt-3.5-turbo-0125",
        messages: [
          { role: "system", content: `only give the code , add comments to the given code so that to improve the codes readablity ${text}` },
          { role: "user", content: text },
        ],
        temperature: 0.7,
      });
  
      if (
        response1
      ) {
        return res.status(200).json({
            message: "comments added  successful",
            data: response1.choices[0].message.content});
      } else {
        throw new Error("No explanation available.");
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
    }
}

async function explanationController(req,res) {
  console.log(req.body);
  try {
    const {text } = req.body;

    if (!text) {
      return res
        .status(400)
        .json({
          message:
            "Missing 'text' properties in the request body.",
        });
    }
    const response1 = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-0125",
      messages: [
        { role: "system", content: `Explain the following code${text}` },
        { role: "user", content: text },
      ],
      temperature: 0.7,
    });

    if (
      response1
    ) {
      return res.status(200).json({
          message: "Code conversion successful",
          data: response1.choices[0].message.content});
    } else {
      throw new Error("No explanation available.");
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function optimizationController(req,res) {
  console.log(req.body);
  try {
    const {text } = req.body;

    if (!text) {
      return res
        .status(400)
        .json({
          message:
            "Missing 'text' properties in the request body.",
        });
    }
    const response1 = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-0125",
      messages: [
        { role: "system", content: `you are a code optimizer,only give the code ,optimze the given code${text}` },
        { role: "user", content: text },
      ],
      temperature: 0.7,
    });

    if (
      response1
    ) {
      return res.status(200).json({
          message: "Code conversion successful",
          data: response1.choices[0].message.content});
    } else {
      throw new Error("No explanation available.");
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function refactorController(req, res) {
  try {
      const { text } = req.body;
      if (!text) {
          return res.status(400).json({
              message: "Missing 'text' property in the request body"
          });
      }

      const response1 = await openai.chat.completions.create({
        model: "gpt-3.5-turbo-0125",
        messages: [
          { role: "system", content: `only give the code,I have a function that needs refactoring. Can you help me complete it?${text}` },
          { role: "user", content: text },
        ],
        temperature: 0.7,
      });
  
      if (
        response1
      ) {
        return res.status(200).json({
            message: "comments added  successful",
            data: response1.choices[0].message.content});
      } else {
        throw new Error("No explanation available.");
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
    }
}

async function chatController(req, res) {
  try {
    const { messages } = req.body;
    if (!messages) {
      return res.status(400).json({
        message: "Missing 'messages' property in the request body",
      });
    }

    const response1 = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-0125",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        ...messages,
      ],
      temperature: 0.7,
    });

    if (response1) {
      return res.status(200).json({
        message: "Chat completion successful",
        data: response1.choices[0].message.content,
      });
    } else {
      throw new Error("No chat response available.");
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function generateTitleController(req, res) {
  try {
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({
        message: "Missing 'title' property in the request body",
      });
    }

    const response1 = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-0125",
      messages: [
        {
          role: "system",
          content: `Write a 3 words title for the following prompt: ${title}`,
        },
        { role: "user", content: title },
      ],
      temperature: 0.7,
    });

    if (response1) {
      return res.status(200).json({
        message: "Title generation successful",
        data: response1.choices[0].message.content,
      });
    } else {
      throw new Error("No title available.");
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}
module.exports = { generateTitleController , chatController,codeController, explanationController , optimizationController , commentsController , refactorController, promtToCodeGeneratorController, bugFixController};

