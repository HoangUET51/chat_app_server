import { Messages } from "@/entities/message";

class _ChatMessageRepository {
  async createChatMessage(chatId: string, senderId: string, message: string) {
    try {
      const newMessage = new Messages({
        chatId,
        senderId,
        message,
      });
      const result = await newMessage.save();
      return result;
    } catch (e) {
      return null;
    }
  }

  async getMessageByChatRoom(chatId: string) {
    try {
      const messagesChatRoom = await Messages.find({ chatId });
      if (!messagesChatRoom.length) {
        return;
      }
      return messagesChatRoom;
    } catch (e) {
      return null;
    }
  }
}

const ChatMessageRepository = new _ChatMessageRepository();

export default ChatMessageRepository;
