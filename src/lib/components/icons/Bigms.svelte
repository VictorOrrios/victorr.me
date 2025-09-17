<script lang="ts">
	import { selectedType } from "$lib/stores";
    const type:number = 5;
</script>

<div class="group p-4 flex flex-col items-center gap-2">
    <div class="h-[80px] w-[80px]">
        <div class="absolute h-[80px] w-[50px] border-2 overflow-hidden big-b {$selectedType === type ? 'active-b':'inactive-b'}">
            <span class="text-[400%]">b</span>
        </div>
        <div class="absolute h-[30px] w-[55px] mt-[10px] ml-[24px] border-2 border-white overflow-hidden text-right big-ms {$selectedType === type ? 'active-ms':'inactive-ms'}">
            <span class="text-[25px] w-full">ms</span>
        </div>
    </div>
    <p class="rounded-[3px] group-hover:bg-(--theme-color-dark)">bigms</p>
</div>

<style>

    span{
        margin-top: -10%;
    }

    .big-b {
        transition: border-color 0.5s ease, background-color 0.5s ease;
    }

    .active-b{
        border-color: transparent;    
        background-color: transparent;    
    }

    .inactive-b{
        border-color: white;
        background-color: var(--color-background);    
    }

    .big-b span{
		display: inline-block;
		white-space: nowrap;
		font-weight: 900;
		transition: transform 0.5s ease, opacity 0.5s ease;
	}

	.active-b span{
		transform: translateX(0%); 
	}

    .inactive-b span{
		transform: translateX(-100%); 
	}

    .big-ms {
        transition: border-color 0.5s ease, background-color 0.5s ease;
    }

    .active-ms{
        border-color: transparent;    
        background-color: transparent;    
    }

    .inactive-ms{
        border-color: white;
        background-color: var(--color-background);    
    }

    .big-ms span{
		display: inline-block;
		white-space: nowrap;
		font-weight: 900;
		transition: transform 0.5s ease, opacity 0.5s ease;
        padding-left: 4px;
        padding-right: 4px;
        background: linear-gradient(to right, var(--theme-color-darker), var(--theme-color-basic), var(--theme-color-lighter), var(--theme-color-basic) ,var(--theme-color-darker));
		background-size: 1000% 100%;
		animation: move-gradient 30s linear infinite;
	}

	.active-ms span{
		transform: translateX(0%); 
	}

    .inactive-ms span{
		transform: translateX(150%); 
	}

    @keyframes move-gradient {
		0% {
			background-position: 0% 0%;
		}
		100% {
			background-position: 1000% 0%;
		}
	}


	@keyframes color-shift {
		from{
            color: var(--theme-color-lighter);
        }
        to{
            color: var(--theme-color-basic);
        }
	}

</style>