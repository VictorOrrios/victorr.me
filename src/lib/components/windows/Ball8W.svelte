<script lang="ts">
	import Ball8App from "../apps/Ball8App.svelte";

	let { isMobile } = $props();

</script>


<div class="flex-1 overflow-hidden">
    <Ball8App isMobile={isMobile}/>
</div>