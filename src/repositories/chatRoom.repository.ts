import { ChatRooms } from "@/entities/chatRoom";

class _ChatRoomRepository {
  async createChatRoom(userIds: number[]) {
    try {
      const availableRoom = await ChatRooms.findOne({
        userIds,
      });

      if (availableRoom) {
        return;
      }

      const newChatRoom = new ChatRooms({
        userIds: userIds,
      });

      const result = await newChatRoom.save();

      return result;
    } catch (error) {
      return null;
    }
  }

  async findUserChatRooms(userId: number | string) {
    try {
      const chatRooms = await ChatRooms.find({
        userIds: {
          $in: [userId],
        },
      });

      if (!chatRooms.length) {
        return;
      }

      return chatRooms;
    } catch (error) {
      return null;
    }
  }

  async findChatRooms(userIds: number[]) {
    try {
      const chatRooms = await ChatRooms.find({
        userIds: { $all: userIds },
      });
      if (!chatRooms.length) {
        return;
      }

      return chatRooms;
    } catch (error) {
      return null;
    }
  }
}

const ChatRoomRepository = new _ChatRoomRepository();

export default ChatRoomRepository;
