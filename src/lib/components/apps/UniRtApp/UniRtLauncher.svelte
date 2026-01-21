<script lang="ts">
	import { SceneType } from "$lib/uni-rt/scene";

    let { startScene } = $props();

</script>


<p>Launcher</p>
<button onclick={() => startScene(SceneType.TESTPLANE)}>Elephant</button>
<button onclick={() => startScene(SceneType.CORNEL)}>Cornell</button>