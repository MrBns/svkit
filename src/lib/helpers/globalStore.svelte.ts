// export function Store<T>(initialValue: T) {
// 	let state = $state<T>(initialValue);
// 	return {
// 		get value() {
// 			return state;
// 		},
// 		set value(value: T) {
// 			state = value;
// 		},
// 		update(cb: (prev: T) => T) {
// 			cb(state as T);
// 		}
// 	};
// }

export class State<T> {
	/* @ts-expect-error should sailent the error */
	_state = $state<T>(null);

	constructor(arg: T) {
		this._state = arg;
	}

	get value(): T {
		return this._state;
	}
	set value(newValue: T) {
		this._state = newValue;
	}

	update(cb: (oldValue: T) => T) {
		cb(this._state);
	}
	set(newValue: T) {
		this._state = newValue;
	}
	get type() {
		return typeof this._state;
	}
}

/**
 * @deprecated it was a mistake to add this method. will remove in future release
 */
export function Derived<T>(expression: T) {
	const _value = $derived(expression);
	return {
		get value() {
			return _value;
		}
	};
}
export function DerivedBy<T>(expression: () => T) {
	const _value = $derived.by(expression);
	return {
		get value() {
			return _value;
		}
	};
}
