import BreakPointWatcher from '$lib/helpers/breakpoints.svelte.js';

export const bpWatcher = new BreakPointWatcher({
	default: 0,
	xs: 420, // extra small
	sm: 640,
	md: 768,
	ml: 890,
	lg: 1024,
	xl: 1280,
	'2xl': 1536
});
