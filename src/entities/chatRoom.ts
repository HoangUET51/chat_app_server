import mongoose from "mongoose";

const chatRoomSchema = new mongoose.Schema(
  {
    userIds: Array,
  },
  {
    timestamps: true,
  },
);

export const ChatRooms = mongoose.model("ChatRoom", chatRoomSchema);
