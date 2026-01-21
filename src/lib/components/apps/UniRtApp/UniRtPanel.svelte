<script lang="ts">
	import { uniRtParams } from "$lib/stores";

    function endScene(){
        $uniRtParams.endScene = true;
    }

</script>


<p>Panel</p>
<button onclick={() => {endScene()}}>End</button>
