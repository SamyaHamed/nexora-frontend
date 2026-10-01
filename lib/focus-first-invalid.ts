/** Focuses the first control (in DOM order) whose name has an error. */
export function focusFirstInvalid(form: HTMLFormElement, names: string[]): void {
  for (const element of Array.from(form.elements)) {
    if (
      element instanceof HTMLElement &&
      "name" in element &&
      names.includes(String(element.name))
    ) {
      element.focus();
      return;
    }
  }
}
