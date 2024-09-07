import debounce from './debounce.js';

/**
 * object of two number `breakpointName: [starting width, ending width];
 * condition: device width >= starting &&  device width <= ending;
 */
export type TBreakPoints = {
	'2xl': number;
	xl: number;
	lg: number;
	ml: number;
	md: number;
	sm: number;
	xs: number;
	default: number;
};

export interface BreakPointWatcherOptions {
	breakpoints: TBreakPoints;
	debounceDelay: number;
}

/**
 * ### Browser Exclusive API
 */
export default class BreakPointWatcher<T extends TBreakPoints> {
	/* Breakpoint must be in order Bigger to Smaller. Otherwise wont work. */
	breakpoints: T | undefined = undefined;
	currentBreakpoints = $state<(keyof T)[]>(['default']);

	/**
	 *
	 * @param breakpoints take an object of `number`. first value is starting range and second one is ending range of breakpoints;
	 */
	constructor(breakpoints: T) {
		this.breakpoints = breakpoints;

		if (typeof window !== 'undefined') {
			window.addEventListener('resize', debounce(this.checkBreakpoint.bind(this), 300));
		}
		this.checkBreakpoint();
	}

	private checkBreakpoint() {
		if (this.breakpoints !== undefined && typeof window !== 'undefined') {
			let activeBreakpoints: (keyof T)[] = [];

			Object.entries(this.breakpoints).forEach(([breakpoint, area]) => {
				if (window.matchMedia(`(min-width:${area}px)`).matches) {
					if (!activeBreakpoints.includes(breakpoint as keyof T)) {
						activeBreakpoints = [...activeBreakpoints, breakpoint as keyof T];
					}
				} else {
					activeBreakpoints = activeBreakpoints.filter((_v) => breakpoint !== _v);
				}
			});

			this.currentBreakpoints = activeBreakpoints;
		}
	}

	/* Check by key */
	is(key: keyof T): boolean {
		return this.currentBreakpoints.includes(key);
	}

	/* Call this function to Destroy */
	destroy() {
		if (window) {
			window.removeEventListener('resize', this.checkBreakpoint);
		}
	}
}
