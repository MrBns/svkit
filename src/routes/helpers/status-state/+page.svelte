<script lang="ts">
	import { StateWithStatus } from '$lib/helpers/globalStore.svelte.js';
	import { StatusState } from '$lib/helpers/index.js';
	import Button from 'internal/components/Button.svelte';
	import { onMount } from 'svelte';

	const stateWithStates = new StatusState();
	let stateValue = $state<number>(0);
	let { ...restProps }: {} = $props();

	onMount(() => {
		let interval = 1;
		let x = setInterval(() => {
			stateWithStates.set(10 * interval, 'loading');
			if (interval >= 10) {
				clearInterval(x);
			}

			interval++;
		}, 500);
	});

	$inspect(stateWithStates.progress);
</script>

<main class="container border-4 border-dashed border-purple-400 space-y-4 rounded-3xl p-10">
	<div class="">
		<p class="text-2xl font-bold mb-1.5 text-purple-400">Progress is</p>
		<input
			type="number"
			bind:value={stateValue}
			class="border border-purple-400 text-xl p-2 rounded-lg"
		/>
	</div>
	<h1 class="text-2xl">
		Default status is <strong class="">{stateWithStates.snapshot.status}</strong>
	</h1>

	<p class="">Loading Percent = <span class="text-3xl">{stateWithStates.progress}</span></p>

	{#if stateWithStates.isLoaded()}
		<p class="">loaded</p>
	{:else if stateWithStates.isLoading()}
		<p class="">Loading</p>
	{/if}

	{#if stateWithStates.isLoaded()}
		<Button class="bg-red-500" onclick={() => stateWithStates.set(0)}>Unset</Button>
	{:else}
		<Button onclick={() => stateWithStates.set(stateWithStates.snapshot.progress + 10)}
			>Set New Value</Button
		>
	{/if}
</main>
