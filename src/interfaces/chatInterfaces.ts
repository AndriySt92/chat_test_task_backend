export interface ICreateChatData {
  firstName: string
  lastName: string
  userId: string
}

export interface IUpdateChatData extends ICreateChatData {
  chatId: string
}
