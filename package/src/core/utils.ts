export function resolveValue<T, A = void>(
    valOrFunction: T | ((arg: A) => T),
    arg?: A,
): T {
    return typeof valOrFunction === "function"
        ? (valOrFunction as (arg: A) => T)(arg as A)
        : valOrFunction;
}

export function registerCustomElement(
    tagName: string,
    element: CustomElementConstructor,
): void {
    if (!customElements.get(tagName)) {
        customElements.define(tagName, element);
    }
}
