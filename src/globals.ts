/* eslint-disable @typescript-eslint/no-unused-vars, no-unused-vars */
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

interface ClickEvent {
  preventDefault: () => void;
}

interface CustomEventData extends Event {
  detail: string;
}
