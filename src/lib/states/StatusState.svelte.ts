export type StatusState_Statuses =
	| 'loading'
	| 'completed'
	| 'failed'
	| 'initializing'
	| 'unloaded'
	| 'pending';

export class StatusState {
	#status = $state<StatusState_Statuses>('initializing');
	#error = $state<Error>();
	#progress = $state(0);
	#message = $state('');

	constructor(status: StatusState_Statuses = 'initializing', _progress = 0, _message = '') {
		this.#status = status;
		this.#progress = _progress;
		this.#message = _message;
	}

	/**
	 *	Checking if State is loading. this check either it is `initializing` or `loading`
	 * @returns
	 */
	isLoading(): boolean {
		return this.#status === 'initializing' || this.#status === 'loading';
	}

	/**
	 *	Checking if State is pending. this check either it is `initializing` or `loading`
	 * @returns
	 */
	isPending(): boolean {
		return this.#status === 'pending';
	}

	/**
	 *  checking if state is loaded. this checks either state is `loaded` or `failed`
	 * @returns
	 */
	isCompleted(): boolean {
		return this.#status === 'completed' || this.#status === 'failed';
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
	get message() {
		return this.#message;
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
	set(_progress: number = 1, _status: StatusState_Statuses = 'loading', _message = '') {
		// Reassigning message. No matter what is the status or progress;
		if (_message) {
			this.#message = _message;
		}

		if (_progress >= 100 || _status === 'completed') {
			this.#progress = 100;
			this.#status = 'completed';
		} else if (_progress <= 0) {
			this.#progress = 0;
			this.#status = 'loading';
		} else {
			this.#progress = _progress;
			this.#status = _status;
		}
	}

	/**
	 *### A quick way to set status. just the status.
	 *
	 * but since progress and status are relative. status changes will affect the progress.
	 * here is the map.
	 * - `completed -> 100` (progress)
	 * - `unloaded  ->   0` (progress)
	 * - any other status wont update the progress.
	 * @param _status status of state
	 */
	setStatus(_status: StatusState_Statuses) {
		if (_status === 'completed') {
			this.#progress = 100;
		} else if (_status === 'unloaded') {
			this.#progress = 0;
		}

		this.#status = _status;
	}

	/**
	 * Update "just the status".
	 * @param _message message of status
	 */
	setMessage(_message: string) {
		this.#message = _message;
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
