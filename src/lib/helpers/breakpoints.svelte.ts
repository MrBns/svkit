/**
 * object of two number `breakpointName: [starting width, ending width];
 * condition: device width >= starting &&  device width <= ending;
 */
export type TBreakPoints = {
	'2xl': [number, number];
	xl: [number, number];
	lg: [number, number];
	ml: [number, number];
	md: [number, number];
	sm: [number, number];
	xs: [number, number];
	default: [number, number];
};

export interface BreakPointWatcherOptions {
	breakpoints: TBreakPoints;
}

/**
 * ### Browser Exclusive API
 */
export default class BreakPointWatcher<T extends TBreakPoints> {
	/* Breakpoint must be in order Bigger to Smaller. Otherwise wont work. */
	breakpoints: T | undefined = undefined;
	currentBreakpoint = $state<keyof T>('default');

	/**
	 *
	 * @param breakpoints take an object of `[number, number]`. first value is starting range and second one is ending range of breakpoints;
	 */
	constructor(breakpoints: T) {
		this.breakpoints = breakpoints;

		window.addEventListener('resize', this.checkBreakpoint);
		this.checkBreakpoint();
	}

	private checkBreakpoint() {
		if (this.breakpoints !== undefined)
			Object.entries(this.breakpoints).forEach(([k, v]) => {
				const w = window.innerWidth;
				if (w >= v[0] && w <= v[1]) {
					this.currentBreakpoint = k as keyof T;
				}
			});
	}

	/* Check by key */
	is(key: keyof T): boolean {
		return $derived(this.currentBreakpoint === key);
	}

	/* Call this function to Destroy */
	destroy() {
		window.removeEventListener('resize', this.checkBreakpoint);
	}
}
