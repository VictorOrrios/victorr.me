<script lang="ts">
  	import * as Carousel from "$lib/components/ui/carousel/index.js";
</script>

<svelte:head>
	<title>bs-thesis</title>
	<meta name="description" content="bs-thesis" />
</svelte:head>

<div class="bg-color fixed left-0 flex items-center gap-4 p-4">
	<a href="/" class="text-2xl">victorr.me</a>
	<div class="text-xl">- July 13, 2026</div>
</div>

<article>
	<img
		src="/articles/bs-thesis/strand_render_rtx.png"
		class="presentation-img"
		alt="Presentation"
		loading="eager"
	/>

	<h1 id="bs-thesis"><a href="#bs-thesis">#</a> Bachelor Thesis</h1>

	<p>
		During Q1-Q2 2026, I developed my Bachelor's Thesis: a real-time rendering engine for Signed
		Distance Fields (SDFs) with a physics engine built entirely around implicit geometry.
	</p>

	<p>
		Traditional SDF rendering relies on sphere tracing, requiring many expensive distance
		evaluations per pixel. My work focused on making this approach practical for real-time
		applications through two main optimizations:
	</p>

	<br />
	<ul>
		<li>
			<b>A sparse volumetric LOD cache</b> allowing distance queries to be answered through interpolation
			instead of evaluating the scene function.
		</li>
		<li>
			<b>Hardware-accelerated ray tracing</b> to analytically compute the first surface intersection
			near implicit geometry, significantly reducing sphere tracing iterations
		</li>
	</ul>
	<br />

	<p>
		On top of the renderer, I implemented an XPBD-based physics engine that directly uses SDFs for
		collision detection and constraint solving, avoiding the need for traditional mesh-based
		collision structures.
	</p>

	<p>
		The project also includes a deferred PBR renderer, ray-marched and ray-traced shadows, SDF
		ambient occlusion, denoising, hot shader reloading, and a complete editor with debugging and
		profiling tools.
	</p>

	<p>
		The final implementation achieved up to a <b>36x speedup</b> over the baseline renderer while
		maintaining high visual quality and accurate physics simulation, using approximately
		<b>1 GB of GPU memory</b>.
	</p>
	
	<br>
	<p>
		Code can be found in my <a href="https://github.com/VictorOrrios/tfg">repo</a>.
	</p>
	<p>
		Slides (in english) can be found <a href="/articles/bs-thesis/slides.pdf">here</a>. 62 slides.
	</p>
	<p>
		Written report (in spanish) can be found <a href="/articles/bs-thesis/Memoria.pdf">here</a>. 91 pages.
	</p>

	<h2 id="Section-1"><a href="#Section-1">##</a> Features</h2>

	<ul>
		<li>Sparse Brick Set representation with an LOD cache for distance values</li>
		<li>XPBD physics engine using SDF-based constraints</li>
		<li>Hardware ray tracing of implicit surfaces</li>
		<li>
			Deferred renderer with:
			<ul>
				<li>Physically Based Rendering (PBR)</li>
				<li>Directional lighting</li>
				<li>Exponential fog</li>
			</ul>
		</li>
		<li>Ray-marched / ray-traced shadows</li>
		<li>Ambient Occlusion computed from SDF values</li>
		<li>Shadow and AO denoising using downsampling + bilateral blur</li>
		<li>Hot shader reloading</li>
		<li>
			Full editor with:
			<ul>
				<li>Gizmos</li>
				<li>Scene loading/saving</li>
				<li>Drag-and-drop editing</li>
				<li>Profiler</li>
				<li>Logger</li>
				<li>Tonemapping</li>
			</ul>
		</li>
		<li>Debug visualization and interactive tools</li>
	</ul>

	<h2 id="Section-2"><a href="#Section-2">##</a> Demos</h2>

	<Carousel.Root class="w-full m-auto">
	<Carousel.Content>
		
		<Carousel.Item>
			<video
			autoplay
			loop
			muted
			playsinline
			>
			<source src="/articles/bs-thesis/sim.mp4" type="video/mp4" />
			</video>
		</Carousel.Item>
		<Carousel.Item>
			<video
			autoplay
			loop
			muted
			playsinline
			>
			<source src="/articles/bs-thesis/TerrainTFG.mp4" type="video/mp4" />
			</video>
		</Carousel.Item>
		<Carousel.Item>
			<video
			autoplay
			loop
			muted
			playsinline
			>
			<source src="/articles/bs-thesis/EditTFG.mp4" type="video/mp4" />
			</video>
		</Carousel.Item>
		<Carousel.Item>
			<img src="/articles/bs-thesis/super_render_sphere.webp" alt="Visual demo of a mountain" />
			<p class="img-subtitle">I <b><i>loved</i></b> making this project, SDFs are so cool!</p>
		</Carousel.Item>
	</Carousel.Content>
	<Carousel.Previous class="absolute left-2 top-1/2 -translate-y-1/2" />
  	<Carousel.Next class="absolute right-2 top-1/2 -translate-y-1/2" />
	</Carousel.Root>

	<br />
	<br />
</article>

<style>
	ul {
		list-style: disc;
		padding-left: 1.5rem;
	}

	article {
		font-size: 18px;
		letter-spacing: -0.2px;
		line-height: 1.6;
		max-width: 900px;
		width: 100%;
		margin: 0 auto;
		padding: 0 1rem;
		text-align: justify;
		word-wrap: break-word;
	}

	article p {
		font-size: 1rem;
	}
	article h1 {
		font-size: 2.5rem;
		margin: 1rem;
	}
	article h2 {
		font-size: 1.5rem;
		margin-top: 1.5rem;
	}

	article img, video {
		margin: auto;
		width: 85%;
		margin-top: 1rem;
		margin-bottom: 0.5rem;
	}

	article a {
		text-decoration: none;
		color: var(--theme-color-lighter);
		transition: all 0.2s linear;
	}

	article a:hover {
		color: var(--text-foreground);
		background-color: var(--theme-color-lighter);
		text-decoration: none;
		font-weight: 900;
	}

	article .presentation-img {
		width: 100%;
		margin-top: 1rem;
		margin-bottom: 0.5rem;
	}

	article .img-subtitle {
		font-style: italic;
		text-align: center;
		font-size: 1rem;
	}

	article .small-img {
		width: 30%;
	}

	.bg-color {
		background-color: var(--color-background);
	}
</style>
