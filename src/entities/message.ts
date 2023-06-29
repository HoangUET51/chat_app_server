import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    chatId: {
      type: String,
    },
    senderId: {
      type: String,
    },
    messsage: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export const Messages = mongoose.model("Message", messageSchema);
