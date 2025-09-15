<script lang="ts">

    let varx = $state(0);

    function onClick(){
        varx++;
    }
</script>


<div class="w-full h-full border-1 border-white">
    Hola {varx}
    <button onclick={onClick}>add</button>
</div>