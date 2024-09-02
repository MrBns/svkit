<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import { twMerge as m } from 'tailwind-merge';

	let {
		children,

		...restProps
	}: HTMLButtonAttributes & {
		class?: string;
		children: Snippet;
	} = $props();
</script>

<!--  -->
<button
	{...restProps}
	class={m(
		'px-6 py-2 text-gray-950 rounded-md border shadow shadow-gray-300 dark:shadow-gray-900 dark:border-slate-600 bg-white',
		restProps.class
	)}
>
	{@render children()}
</button>

<style lang="postcss">
</style>
