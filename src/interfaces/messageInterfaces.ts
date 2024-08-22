export interface ICreateMessageData {
  messageText: string
  receiverId: string
  senderId: string
}

export interface IUpdateMessageData extends Omit<ICreateMessageData, 'receiverId'> {
  messageId: string
}
