interface PlainObject {
  [key: string]: any;
}

interface ChatObject extends PlainObject {
  id: number;
  title: string;
  avatar: string;
  lastMessageTime?: string;
  isLastMessageFromUser?: boolean;
  lastMessageText?: string;
  unreadMessagesCount?: number;
}

interface clickEvent {
  preventDefault: () => void;
}

interface CustomEventData extends Event {
  detail: string;
}
