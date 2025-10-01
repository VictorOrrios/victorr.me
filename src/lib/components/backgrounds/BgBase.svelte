<script lang="ts">
	import { activeBackground } from "$lib/stores";

    let bg = $derived($activeBackground);
</script>

<bg.scene.component/>