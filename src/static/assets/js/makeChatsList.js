/**
 * Генерация HTML списка чатов
 * @param {Chat[]} chats
 */
function makeChatsList(chats) {
  const fragment = document.createDocumentFragment();
  const list = document.createElement('ul');

  chats.forEach((item) => {
    const {
      title,
      lastMessageTime,
      lastMessageText,
      unreadMessagesCount = 0,
      isLastMessageFromUser = false,
    } = item;

    const listItem = document.createElement('li');

    listItem.innerHTML = `
      <div class="chat-list-item__avatar"></div>
      <div class="chat-list-item__info">
        <div class="chat-list-item__name-container">
          <h4 class="chat-list-item__name">${title}</h4>
          <p class="chat-list-item__last-message-time">${lastMessageTime}</p>
        </div>

        <div class="chat-list-item__last-message-container">
          <p class="chat-list-item__last-message-text">
            <span class="last-message-from-user-label">Вы:&nbsp;</span>
            ${lastMessageText}
          </p>
          <div class="chat-list-item__unread-message-count">
            <span class="chat-list-item__unread-message-count-number">${unreadMessagesCount}<span>
          </div>
        </div>
      </div>
    `;

    listItem.classList.add("chat-list-item");

    if (!isLastMessageFromUser) {
      listItem.querySelector(".last-message-from-user-label").hidden = true;
    }

    if (unreadMessagesCount < 1) {
      listItem.querySelector(".chat-list-item__unread-message-count").hidden = true;
    }

    list.appendChild(listItem);
  });

  list.classList.add("chats-container__list");

  fragment.appendChild(list);

  document.querySelector(".chats-container").appendChild(fragment);
}

/**
 * @typedef {Chat}
 * @prop {string} title
 * @prop {string} lastMessageTime
 * @prop {string} lastMessageText
 * @prop {number} unreadMessagesCount
 * @prop {bool} isLastMessageFromUser
 */
 const sampleChats = [
   {
     title: 'Андрей',
     lastMessageTime: '10:49',
     lastMessageText: 'Изображение',
     unreadMessagesCount: 2,
   },
   {
     title: 'Киноклуб',
     lastMessageTime: '12:00',
     lastMessageText: 'стикер',
     isLastMessageFromUser: true,
   },
   {
     title: 'Илья',
     lastMessageTime: '15:12',
     lastMessageText: 'Друзья, у меня для вас особенный выпуск новостей!...',
     unreadMessagesCount: 4,
   },
   {
     title: 'Вадим',
     lastMessageTime: 'Пт',
     lastMessageText: 'Круто!',
     isLastMessageFromUser: true,
   },
   {
     title: 'тет-а-теты',
     lastMessageTime: 'Ср',
     lastMessageText: 'И Human Interface Guidelines и Material Design рекомендуют...',
   },
   {
     title: '1, 2, 3',
     lastMessageTime: 'Пн',
     lastMessageText: 'Миллионы россиян ежедневно проводят десятки часов свое...',
   },
   {
     title: 'Design Destroyer',
     lastMessageTime: 'Пн',
     lastMessageText: 'В 2008 году художник Jon Rafman  начал собирать...',
   },
   {
     title: 'Day.',
     lastMessageTime: '1 Мая 2020',
     lastMessageText: 'Так увлёкся работой по курсу, что совсем забыл его анонсир...',
   },
   {
     title: 'Стас Рогозин',
     lastMessageTime: '12 Апр 2020',
     lastMessageText: 'Можно или сегодня или завтра вечером.',
   },
 ];


makeChatsList(sampleChats);
