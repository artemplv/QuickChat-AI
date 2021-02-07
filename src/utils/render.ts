export function render(query: string, block: any): HTMLElement {
  const root: any = document.querySelector(query);
  root.appendChild(block.getContent());
  return root;
}
