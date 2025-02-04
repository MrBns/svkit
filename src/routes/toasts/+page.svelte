<script lang="ts">
	import toast from '$lib/components/Toast/index.js';
	import Button from 'internal/components/Button.svelte';
	import { bpWatcher } from 'internal/lib/brakpointWatcher.svelte.js';
	import { onMount } from 'svelte';
	const html = String.raw;

	onMount(() => {
		console.log(bpWatcher.is('lg'));
	});
	$inspect(bpWatcher.currentBreakpoints);
	$inspect(bpWatcher.is('lg'));
</script>

<main class="">
	<div class="container mx-auto flex gap-8">
		<div class="border-purple-500 border-2 p-4 border-dashed w-fit rounded-lg">
			<div class="">
				<p class="font-bold text-2xl text-purple-600 mb-4">Variants</p>
			</div>
			<Button
				onclick={() => toast.success('Success Alert ', { autoClose: false })}
				class="bg-green-500 text-white">Success</Button
			>
			<Button onclick={() => toast.error('Error Alert')} class="bg-red-500 text-white">Error</Button
			>
			<Button onclick={() => toast.info('Info toast alert')} class="bg-sky-500 text-white"
				>Info</Button
			>
			<Button onclick={() => toast.warning('Warning. be careful')} class="bg-yellow-500 text-white"
				>Warning</Button
			>
		</div>

		<div class="border-orange-500 space-y-5 border-2 p-4 border-dashed w-fit rounded-lg">
			<div class="">
				<p class="font-bold text-2xl text-orange-600 mb-4">positions</p>
			</div>
			<div class="space-x-3">
				<Button onclick={() => toast.success('Top Right. its a default toast', {})} class=""
					>Default - Top right</Button
				>
				<Button
					onclick={() =>
						toast.warning('Top Middle. Changed via options', { position: 'top-middle' })}
					class="">Top Middle</Button
				>
				<Button
					onclick={() => toast.info('Top Left. Changed via options', { position: 'top-left' })}
					class="">Top Left</Button
				>
			</div>
			<div class="space-x-3">
				<Button
					onclick={() =>
						toast.warning('Bottom right. options for changing', { position: 'bottom-right' })}
					class="">Bottom Right</Button
				>
				<Button onclick={() => toast.info('Bottom middle', { position: 'bottom-middle' })} class=""
					>Bottom Middle</Button
				>
				<Button onclick={() => toast.info('Bottom left', { position: 'bottom-left' })} class=""
					>Bottom Left</Button
				>
			</div>
		</div>

		<div class="border-orange-500 space-y-5 border-2 p-4 border-dashed w-fit rounded-lg">
			<div class="">
				<p class="font-bold text-2xl text-orange-600 mb-4">More Options</p>
			</div>
			<div class="space-x-3">
				<Button onclick={() => toast.success('Top Right. its a default toast', {})} class=""
					>Don't Auto close</Button
				>
				<Button
					onclick={() =>
						toast({
							html: html`
								<div class="max-w-md bg-white border-2 rounded-lg p-4 pr-6 space-y-3">
									<div class="">
										<p class="text-gray-600 text-sm rounded-3">
											This is a Custom Element Popup. I am using tailwindcss here. you can also.
										</p>
										<p class="text-gray-600 text-sm rounded-3">You can show whatever you want</p>
									</div>

									<input
										class="bg-gray-100 px-3 py-1 border border-sky-100 "
										placeholder="type something here"
									/>
									<div class="space-x-3">
										<button class="px-2 py-1 text-sm rounded-sm bg-red-400 text-white">Cancel</button>
										<button class="px-2 py-1 text-sm rounded-sm bg-sky-500 text-white">Submit</button>
									</div>
								</div>
							`,
							autoClose: false
						})}
					class="">Custom HTML</Button
				>
			</div>
		</div>
	</div>
</main>
