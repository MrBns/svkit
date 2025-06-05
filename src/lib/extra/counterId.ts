const counterIDMap = new Map<string, number>();

/**
 * ## Unique id by digit.
 * it will grow as you as it.
 *
 * ⚠️ do not use infinite amount of key. keep it under 10,000; then memory size will be under 2MB;
 * @param scope any valid string are accepted. make it shorter to keep memory size small.
 * @returns
 */
export default function counterId(scope = 'cnt'): string {
	const currentCount = counterIDMap.get(scope) ?? 0;
	counterIDMap.set(scope, currentCount + 1);
	return scope + currentCount + 1;
}
