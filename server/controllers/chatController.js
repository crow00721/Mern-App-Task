import Chat from "../models/Chat.js";

export const saveChat = async (req, res) => {
  try {
    const { prompt, response } = req.body;

    const chat = new Chat({ prompt, response });
    await chat.save();

    res.json({ message: "Saved successfully ✅" });

  } catch (error) {
    res.status(500).json({ message: "Save Error" });
  }
};