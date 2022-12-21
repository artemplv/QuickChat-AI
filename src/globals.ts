/* eslint-disable @typescript-eslint/no-unused-vars, no-unused-vars */
interface PlainObject {
  [key: string]: any;
}

interface ChatObject extends PlainObject {
  id: number;
  name: string;
  avatar?: string;
  lastMessage?: {
    userId: string;
    content: string;
    createdAt: string;
  };
  unreadMessagesCount?: number;
}

interface ClickEvent {
  preventDefault: () => void;
}

interface CustomEventData extends Event {
  detail: string;
}

interface SubmitEvent extends Event {
  readonly submitter: HTMLElement | null;
}
