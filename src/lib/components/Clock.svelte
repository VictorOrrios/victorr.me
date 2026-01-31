<script lang="ts">
    let time = $state('');
    
    function updateTime() {
        const now = new Date();
        const day = now.getDate()
        const month = now.getMonth() + 1
        const year = now.getFullYear()

        const hours = String(now.getHours()).padStart(2, '0')
        const minutes = String(now.getMinutes()).padStart(2, '0')
        const seconds = String(now.getSeconds()).padStart(2, '0')

        const ms = now.getMilliseconds().toString().padStart(3, '0');

        time = `${day}/${month}/${year}, ${hours}:${minutes}:${seconds}.${ms}`
    }

    $effect(() => {
		// 51 instead of 50 to make it jiggle more
        const interval = setInterval(updateTime, 51);
        updateTime();
        return () => clearInterval(interval);
    });
</script>

<span class="select-none">{time}</span>