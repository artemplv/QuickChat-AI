interface PlainObject {
  [key: string]: any;
}

interface ChatObject extends PlainObject {
  title: string,
  lastMessageTime: string,
  isLastMessageFromUser: boolean,
  lastMessageText: string,
  unreadMessagesCount?: number,
}

interface clickEvent {
  preventDefault: () => void;
}

interface CustomEventData extends Event {
  detail: string;
}
