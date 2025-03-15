<script lang="ts">
	import { StateWithStatus } from '$lib/states/globalStore.svelte.js';
	import Button from '../../../internal/components/Button.svelte';

	const stateWithStates = new StateWithStatus<string | undefined>(undefined);
	let stateValue = $state<string>(' Hi. My name is Nazmul');
</script>

<main class="container border-4 border-dashed border-purple-400 space-y-4 rounded-3xl p-10">
	<input bind:value={stateValue} class="border text-xl p-2 rounded-lg" />
	<h1 class="text-2xl">
		default value is <strong class="">{stateWithStates.data}</strong> and <br /> type of {typeof stateWithStates.data}
	</h1>

	{#if stateWithStates.isCompleted()}
		<p class="">loaded</p>
	{:else if stateWithStates.isLoading()}
		<p class="">Loading</p>
	{/if}

	{#if stateWithStates.isCompleted()}
		<Button
			class="bg-red-500"
			onclick={() => stateWithStates.set({ data: undefined, status: 'loading' })}>Unset</Button
		>
	{:else}
		<Button
			onclick={() =>
				stateWithStates.set({
					status: 'loaded',
					data: stateValue
				})}>Set New Value</Button
		>
	{/if}
</main>
