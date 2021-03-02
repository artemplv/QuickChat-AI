function navigate(path: string) {
  const pushStateEvent = new CustomEvent('_pushstate', { detail: path });
  window.dispatchEvent(pushStateEvent);
};
