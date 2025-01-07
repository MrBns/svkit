export class State<T> {
	/* @ts-expect-error should silent the error */
	#state = $state<T>(null);

	constructor(arg: T) {
		this.#state = arg;
	}

	get value(): T {
		return this.#state;
	}
	set value(newValue: T) {
		this.#state = newValue;
	}

	get snapshot() {
		return $state.snapshot(this.#state);
	}

	update(cb: (oldValue: T) => T) {
		cb(this.#state);
	}
	set(newValue: T) {
		this.#state = newValue;
	}
	get type() {
		return typeof this.#state;
	}
}

// -------------------------------------
//			 State with Status
// ------------------------------------
export type StateWithStatus_Statuses = 'loading' | 'loaded' | 'failed' | 'initializing';

/**
 * ### Make a Svelte 5 Runes State with Status tracking.
 * statuses= `initializing` | `loading` | `loaded` | `failed`.
 *
 * constructor receive `defaultData`. default data is undefined. if you don't pass anything <br/>
 *
 * and `status` default status is initializing
 */
export class StateWithStatus<T> {
	#status = $state<StateWithStatus_Statuses>('initializing');
	#data?: T = $state(undefined);
	#message = $state<string>('');
	#error? = $state<Error | undefined>(undefined);

	constructor(
		defaultData: T | undefined = undefined,
		status: StateWithStatus_Statuses = 'initializing'
	) {
		this.#status = status;
		this.#message = '';
		this.#error = undefined;
		this.#data = defaultData;
	}

	/**
	 *	Checking if State is loading. this check either it is `initializing` or `loading`
	 * @returns
	 */
	isLoading(): boolean {
		return this.#status === 'initializing' || this.#status === 'loading';
	}

	/**
	 *  checking if state is loaded. this checks either state is `loaded` or `failed`
	 * @returns
	 */
	isLoaded(): boolean {
		return this.#status === 'loaded' || this.#status === 'failed';
	}

	/**
	 *  check if status is `failed`;
	 * @returns
	 */
	isFailed(): boolean {
		return this.#status === 'failed';
	}

	// It will return everything in a object. in a Static Value
	snapshot() {
		return {
			status: $state.snapshot(this.#status),
			data: $state.snapshot(this.#data),
			message: $state.snapshot(this.#message),
			error: $state.snapshot(this.#error)
		};
	}

	// Getter of `#data` property of class
	get data() {
		return this.#data;
	}

	// Getter of `#error` property of class
	get error() {
		return this.#error;
	}

	// Getter of `#message` property of class
	get message() {
		return this.#message;
	}

	// Getter of `#status` property of class
	get status() {
		return this.#status;
	}

	/**
	 *  setting whole state. taking argument as parameter
	 */
	set(newData: { status: StateWithStatus_Statuses; data?: T; message?: string; error?: Error }) {
		this.#data = newData.data;
		this.#error = newData.error;
		this.#status = newData.status;
		this.#message = newData.message || '';
	}

	/**
	 * Will Reset the state.
	 * - in first param you can specify the status. but by default it will be `loading`
	 * if you want more flexibility use set method. where you set everything.
	 */
	reset(status: StateWithStatus_Statuses = 'loading') {
		this.#data = undefined;
		this.#error = undefined;
		this.#message = '';
		this.#status = status;
	}

	/**
	 * #### This is will set `error` property in the Class
	 * - Set status as failed
	 * - if you set `true` to second argument. it will set data as undefined. byDefault `true`
	 * - set message as same as error message
	 * @param error {Error}
	 */
	setError(error: Error, resetData: boolean = true) {
		this.#status = 'failed';
		this.#error = error;
		this.#message = error.message;

		if (resetData) {
			this.#data = undefined;
		}
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
