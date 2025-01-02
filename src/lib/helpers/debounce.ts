export default function debounce<P extends unknown[] = [], R = unknown>(
	func: (...arg: P) => R,
	delay: number = 250
) {
	let timeOut: ReturnType<typeof setTimeout> | undefined;

	return function (...arg: P) {
		if (timeOut) clearTimeout(timeOut);
		timeOut = setTimeout(() => func(...arg), delay);
	};
}

export function debounceWithAbort<P extends unknown[] = [], R = unknown>(
	func: (signal: AbortController, ...arg: P) => R
) {
	let timeOut: ReturnType<typeof setTimeout> | undefined;
	let controller: AbortController | null = null;

	return function (...arg: P) {
		if (timeOut) {
			clearTimeout(timeOut);
			if (controller) {
				controller.abort();
			}
		}

		timeOut = setTimeout(() => {
			controller = new AbortController();
			func(controller, ...arg);
		});
	};
}
