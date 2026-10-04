export function dismissDetailsOnOutsideClick(details: HTMLDetailsElement | null) {
  if (!details) return;
  const document = details.ownerDocument;
  const dismiss = (event: Event) => {
    if (!event.composedPath().includes(details)) details.open = false;
  };
  document.addEventListener("click", dismiss, { capture: true });
  return () => document.removeEventListener("click", dismiss, { capture: true });
}
