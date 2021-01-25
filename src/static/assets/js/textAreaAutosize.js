const observe = function (element, event, handler) {
  element.addEventListener(event, handler, false);
};

function textAreaAutosize() {
  const text = document.querySelector('.message-textarea');
  function resize () {
    text.style.height = 'auto';
    text.style.height = text.scrollHeight + 'px';
  }

  function delayedResize() {
    window.setTimeout(resize, 0);
  }

  observe(text, 'change', resize);
  observe(text, 'cut', delayedResize);
  observe(text, 'paste', delayedResize);
  observe(text, 'drop', delayedResize);
  observe(text, 'keydown', delayedResize);
}
