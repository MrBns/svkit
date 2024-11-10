import cuid2 from '@paralleldrive/cuid2';

export { isCuid, createId } from '@paralleldrive/cuid2';

export function cuid(length = 30) {
	const createId = cuid2.init({
		length: length
	});
	return createId();
}

export default function uid() {
	return globalThis.isSecureContext ? globalThis.crypto.randomUUID() : cuid();
}
