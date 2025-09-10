<script lang="ts">
    let time = $state(new Date().toLocaleTimeString([]));
	$effect(() => {
		const interval = setInterval(() => {
			time = new Date().toLocaleTimeString([]);
		}, 1000);

		return () => clearInterval(interval);
	});
</script>

<span>{time}</span>