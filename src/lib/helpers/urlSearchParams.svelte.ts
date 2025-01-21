/**
 * @deprecated Use the Builtin [`SvelteUrlSearchParam`](https://svelte.dev/docs/svelte/svelte-reactivity#SvelteURLSearchParams) class.
 */
export default class SvelteURLSearchParams implements URLSearchParams {
	private params = $state<URLSearchParams>(new URLSearchParams(''));

	get size(): number {
		return this.params.size;
	}

	constructor(_params?: string[][] | Record<string, string> | string | URLSearchParams) {
		this.params = new URLSearchParams(_params);
	}

	set(name: string, value: unknown) {
		const _newParams = new URLSearchParams(this.params);
		_newParams.set(name, String(value));
		this.params = _newParams;
	}

	get(name: string) {
		return this.params.get(name);
	}
	toString(): string {
		return this.params.toString();
	}
	has(key: string) {
		return this.params.has(key);
	}
	append(name: string, value: string): void {
		return this.params.append(name, value);
	}

	delete(name: string, value?: string): void {
		return this.params.delete(name, value);
	}
	// @ts-expect-error Silencing, Since this class is deprecated.
	entries(): IterableIterator<[string, string]> {
		return this.params.entries();
	}
	forEach(
		callbackfn: (value: string, key: string, parent: URLSearchParams) => void,
		thisArg?: unknown
	): void {
		return this.params.forEach(callbackfn, thisArg);
	}
	getAll(name: string): string[] {
		return this.params.getAll(name);
	}

	// @ts-expect-error Silencing, Since this class is deprecated.
	keys(): IterableIterator<string> {
		return this.params.keys();
	}
	sort(): void {
		return this.params.sort();
	}

	// @ts-expect-error Silencing, Since this class is deprecated.
	values(): IterableIterator<string> {
		return this.params.values();
	}

	// @ts-expect-error Silencing, Since this class is deprecated.
	[Symbol.iterator](): IterableIterator<[string, string]> {
		return this.entries();
	}
	[Symbol.dispose]() {}
}
