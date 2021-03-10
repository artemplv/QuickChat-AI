export function navigate(path: string) {
  const pushStateEvent = new CustomEvent('_pushstate', { detail: path });
  window.dispatchEvent(pushStateEvent);
};

declare global {
  interface Window {
      navigate: any;
  }
}

window.navigate = navigate;
