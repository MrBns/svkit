import type { StateWithStatus_Statuses } from '../globalStore.svelte.js';

export class StatusState {
	#status = $state<StateWithStatus_Statuses>('initializing');
	#error = $state<Error>();
	#progress = $state(0);

	constructor(status: StateWithStatus_Statuses = 'initializing', _progress = 0) {
		this.#status = status;
		this.#progress = _progress;
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

	/**
	 *  check if status is `unloaded`;
	 * @returns
	 */
	isUnloaded(): boolean {
		return this.status === 'unloaded';
	}

	// It will return everything in a object. in a Static Value
	get snapshot() {
		return {
			status: $state.snapshot(this.#status),
			progress: $state.snapshot(this.progress)
		};
	}

	// Getter of `#status` property of class
	get status() {
		return this.#status;
	}

	get progress() {
		return this.#progress;
	}

	get error() {
		return this.#error;
	}

	/**
	 *	 track task progress and status
	 * @param _status status of the state
	 * @param _progress progress of the state
	 */
	set(_progress: number = 1, _status: StateWithStatus_Statuses = 'loading') {
		if (_progress >= 100 || _status === 'loaded') {
			this.#progress = 100;
			this.#status = 'loaded';
		} else if (_progress <= 0) {
			this.#progress = 0;
			this.#status = 'loading';
		} else {
			this.#progress = _progress;
			this.#status = _status;
		}
	}

	/**
	 * #### This is will set `error` property in the Class
	 * - Set status as failed
	 * - if you set `true` to second argument. it will set data as undefined. byDefault `true`
	 * - set message as same as error message
	 * @param error {Error}
	 */
	setError(error: Error) {
		this.#status = 'failed';
		this.#error = error;
	}
}
