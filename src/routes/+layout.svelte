<script lang="ts">
	let { children } = $props();
	import '$lib/components/Toast/toast.scss';
	import './app.css';
</script>

{@render children()}
