<script lang="ts">
	import debounce from '$lib/helpers/debounce.js';
	import Button from '~internal/components/Button.svelte';

	let clickCount = $state(0);

	const handleClickDe = debounce((_e: MouseEvent & { currentTarget: HTMLButtonElement }) => {
		clickCount++;
	}, 250);
</script>

<div class="container mt-20">
	<div class="space-y-4">
		<h1 class="text-2xl font-bold">Debounce</h1>
		<Button onclick={handleClickDe}>Click</Button>
		{#if clickCount}
			<p>Clicked - {clickCount}</p>
		{/if}
	</div>
</div>
