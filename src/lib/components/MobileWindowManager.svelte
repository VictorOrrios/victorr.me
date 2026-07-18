<script lang="ts">
	import { activeWindows } from '$lib/stores';
	import { fly, slide } from 'svelte/transition';
	import MobileWindow from './MobileWindow.svelte';
</script>


{#if $activeWindows.length > 0}
	<div
		class="absolute h-full w-full overflow-hidden z-30"
		in:fly={{ y: 100, opacity: 0, duration: 400 }}
		out:fly={{ y: 100, opacity: 0, duration: 400 }}
	>
		<MobileWindow type={$activeWindows[0].type} />
	</div>
{/if}
