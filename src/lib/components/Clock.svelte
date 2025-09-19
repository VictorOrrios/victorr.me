<script lang="ts">
    let time = $state('');
    
    function updateTime() {
        const now = new Date();
        const ms = now.getMilliseconds().toString().padStart(3, '0');
        time = now.toLocaleString() + '.' + ms;
    }

    $effect(() => {
		// 51 instead of 50 to make it jiggle more
        const interval = setInterval(updateTime, 51);
        updateTime();
        return () => clearInterval(interval);
    });
</script>

<span class="select-none">{time}</span>