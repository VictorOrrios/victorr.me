<script lang="ts">
  	import * as Carousel from "$lib/components/ui/carousel/index.js";
	import Exam from "./exam.svelte";
</script>

<svelte:head>
	<title>hobby-raytracer</title>
	<meta name="description" content="hobby-raytracer" />
</svelte:head>


<article>
	<img
	src="/articles/hobby-raytracer/presentation.png"
	class="presentation-img" 
	alt="Presentation"
	loading="eager"/>

	<h1 id="hobby-raytracer"><a href="#hobby-raytracer">#</a> hobby-raytracer</h1>

	<p>In summer 2025 I decided to make my first computer graphics project, a simple raytracer.</p>
	<p>I was inspired by the youtube series of <a href="https://youtu.be/Qz0KTGYJtUk?feature=shared">Sebastian Lague</a> to get my very own raytracing engine with the spheres, the teapots and all the fun reflection bits.</p>
	<p>This article is the complete process I went through to get the project done, from learning what I wanted to rendering the final scene.</p> 
	<p>And it includes a whooping <b>120+ images</b> of all the decisions, errors and results I made along the way.</p>

	<h2 id="Section-1"><a href="#Section-1">##</a> The first step</h2>

	<p>At the start I had a very shallow but broad knowledge about raytracers, just enough to get me over <a href="https://thedecisionlab.com/biases/dunning-kruger-effect">mount stupid</a> and to know I didn’t know. There I set my first step of the project, investigation.</p>
	<br>
	<p>The engine from the youtube videos used unity as its backend but since I wanted a learning experience and not a tutorial hell that idea was quickly scratched.</p>
	<br>
	<p>I knew I wanted a real time raytracer/pathtracer, so I searched how to make one, the first result it shows is this <a href="https://raytracing.github.io/books/RayTracingInOneWeekend.html">fantastic book</a> everyone recommends. It explains how to make raytracer from scratch with code snippets and math equations, a rather limited one since it was a static renderer in c++.</p>
	<br>
	<p>CPU raytracers where cool and all but it seemed a bit to academic in my mind so the use of the GPU to render seemed very appealing, there I sketched the plan: adapt the “Raytracing in one weekend” book to be a real time engine that uses the GPU and when the book was finished add more cool things to it.</p>
	<br>
	<p>But how do I exactly “use” the GPU? Research pointed to graphic libraries.</p>
	<p>I use Linux and have an AMD card so I narrowed them down to two options.</p>
	<p>OpenGL was easy to use, the quintessential hello world of graphics programming, tons of tutorials and had performance without much hassle. Vulkan was a bit faster.</p>
	<p>I ended up choosing the more future proof technology (Vulkan had a cooler name).</p>
	<br>
	<p>After researching Vulkan more I ended up at the analog of the “Raytracing in one weekend” series but for Vulkan: <a href="http://vulkan-tutorial.com">vulkan-tutorial.com</a>. It teaches how to make a colorful triangle appear on screen. Skimming through it I learned that there were two ways of making a raytracer: with the graphics pipeline and raytracing extensions that were fast, premade and the industry standard or with a compute pipeline and just doing everything by yourself.</p>
	<p>The decision to use the GPU as a GPGPU and taking the compute shaders as the workhorse was easy as it provided the most knowledge at the end of the project.</p>
	<br>
	<p>With the path traced down the <i>coding adventure</i> began.</p>
	
	<h2 id="Section-2"><a href="#Section-2">##</a> The <i>actual</i> first step</h2>

	<p>Remember everything I said about not wanting a tutorial hell? Vulkan is the whole <i>Dante's Inferno</i> 9 circles of tutorial hell.</p>
	<br>
	<p>I don’t recommend following my steps and learning Vulkan as the very first thing you do in your graphics programming journey <b>but I don’t regret it</b>. Now I have a skill that is up to date with the industry and will pave me the way onto future projects.</p>
	<br>
	<p>The actual tutorial in itself was rough. Using real dates and lines of code of the main.cpp taken from the github repository I stored my progress:</p>
	<br>
	<p>June 15 (0 Loc): Started the tutorial and installed the sdk. Not knowing the amount of dense and boring commentary needed to get to the end I was breezing through with blissful ignorance.</p>
	<br>
	<p>June 17 (395 Loc): Setup phase was done, “””learned””” about instancing, validation layers, queues, and devices. There were a lot of things that I’m still not 100% sure of how it works.</p>
	<p>If you need to take one thing away from this chapter is that Vulkan is verbose, everything needs a configuration struct, a creating struct, an allocation struct, an indexing of the indexing or some other tedious thing. I learned way too late what I was getting myself into and now there was no turning back.</p>
	<br>
	<p>June 18 (723 Loc): Finished the presentation phase. Swap chains, images and surfaces.</p>
	<p>The tutorial calls for rewriting large parts of the program, and it really gets into psychological horror territory when at the end of a chapter it says that it was a simple pass around a larger topic.</p>
	<br>
	<p>June 22 (950 Loc): Graphics pipeline built, with the fragmentation and vertex shaders loaded. This chapter was especially discouraging because a large part of the code was just configuring fixed functions and barebones shaders on a programming language I didn’t understand (glsl not c++). I hope this reads as a castaway travel log because this is how I was feeling just throwing away my first two weeks of the project on things that were NOT about the raytracer.</p>
	<br>
	<p>June 26 (1201 Loc): Drawing phase was completed, ending the “Drawing a triangle” chapter of the tutorial. Getting the first results from days of coding I was immensely happy about finally seeing something on screen. Keep in mind that in OpenGL it takes 15 minutes and 100-300 lines of code to make the same triangle.</p>
	<img
	src="/articles/hobby-raytracer/001.png"
	alt="First triangle"/>
	<br>
	<p>Jul 1 (1408 Loc): I decided to do two more chapters about vertex and uniform buffers since they were required for the compute pipeline. After <b>5 days</b> I finished the first chapter. With the power of vertex buffers I had the ability of drawing <b>TWO</b> triangles on screen, soon I will dominate planet earth. </p>
	<Carousel.Root class="w-full m-auto">
	<Carousel.Content>
		<Carousel.Item>
			<img
			src="/articles/hobby-raytracer/003.png"
			alt="First quad"/>
		</Carousel.Item>
		<Carousel.Item>
			<img
			src="/articles/hobby-raytracer/005.png"
			alt="best friends 1"/>
		</Carousel.Item>
	</Carousel.Content>
	<Carousel.Previous class="absolute left-2 top-1/2 -translate-y-1/2" />
  	<Carousel.Next class="absolute right-2 top-1/2 -translate-y-1/2" />
	</Carousel.Root>
	<br>
	<p>Jul 2 (1577 Loc): After speedrunning the last chapter I got to the end of the tutorial. The result: a horizontal rotating quad. An immense weight was lifted from my shoulders as I was finally free to learn about the topic I was interested in.</p>
	<img
	src="/articles/hobby-raytracer/008.png"
	alt="Rotating quad"/>

	<h2 id="Section-3"><a href="#Section-3">##</a> The <i>actual</i> <b> <i>actual</i></b> first step</h2>

	<p>Now I had a working base from where to build from to migrate my  project to a compute based pipeline.</p>
	<p>The first layout I ended up building was a single compute shader that executes once per pixel, it writes a color to an image buffer which then gets copied to the next swapchain image to present. The swapchain itself had two buffers to prevent screen tearing. </p>
	<p>After recording the dispatch orders in the command buffer I ended up with this red screen, unfortunately this broke the dynamic window resizing leaving data artifacts. </p>
	<p>In the course of this project I encountered many types of artifacts, if I had to rank them data artifacts would be A tier.</p>
	<Carousel.Root class="w-full m-auto">
	<Carousel.Content>
		<Carousel.Item>
			<img
			src="/articles/hobby-raytracer/006.png"
			alt="Red square"/>
		</Carousel.Item>
		<Carousel.Item>
			<img
			src="/articles/hobby-raytracer/007.png"
			alt="Red square glitch"/>
			<p class="img-subtitle">It bled chunks of my desktop background, how cool is that!</p>
		</Carousel.Item>
		<Carousel.Item>
			<img
			src="/articles/hobby-raytracer/007.jpeg"
			alt="Best friend 2"/>
		</Carousel.Item>
	</Carousel.Content>
	<Carousel.Previous class="absolute left-2 top-1/2 -translate-y-1/2" />
  	<Carousel.Next class="absolute right-2 top-1/2 -translate-y-1/2" />
	</Carousel.Root>
	<br>
	<p>Once I fixed the resizing of the image buffer based on window parameters I enhanced the shader a bit to show this cool arrangement of colors based on pixel coordinates, and added a FPS counter.</p>
	<img
	src="/articles/hobby-raytracer/010.png"
	alt="Color compute"/>
	<br>
	<p>With this I started the <a href="https://raytracing.github.io/books/RayTracingInOneWeekend.html">book</a> on chapter 4, next thing to implement was the camera and how to shoot rays from it. To make it I created a new uniform buffer with all the information about the camera, in fact a little too much information, out of the 5 matrices it included I only ever used 1 of them.</p>
	<p>After getting the “shooting rays” part out of the way I coded a simple gradient skybox and got the following results, boring but this is the last blank screenshot you are gonna see I promise, don’t fall asleep.</p>
	<img
	src="/articles/hobby-raytracer/011.png"
	alt="Empty sky"/>
	<br>
	<p>It was time to do the “Hello world” of raytracers, rendering a sphere. Implementing the intersection functions was easy as the book gave me the equations and code examples, the hardest part was getting a list of the spheres to the shader. I foresaw many more buffers to include in the future so a modular design seemed like a good bet. The system created a list of gpu sided shader storage buffers into a descriptor set, each buffer containing a vector of structs.</p>
	<p>I loaded the sphere vector with three evenly spaced side by side spheres colored based on index.</p>
	<img
	src="/articles/hobby-raytracer/012.png"
	alt="Perspective error"/>
	<br>
	<p>The results were odd, it was obviously a camera perspective error, tweaking the code for a few hours, creating a rotation matrix and using the handy glm function “lookAt” I managed to get this other, somehow worse, render.</p>
	<img
	src="/articles/hobby-raytracer/013.png"
	alt="Perspective error 2"/>
	<br>
	<p>Perspective artifacts are B tier, the geometry bending was fun to play with. Rewriting the code to use the inverse of the view matrix and the tangent of the vertical fov fixed the issues, getting the first proper correct render of the engine. Very cool!</p>
	<img
	src="/articles/hobby-raytracer/014.png"
	alt="Perspective error fixed"/>
	<br>
	<p>The rotation matrix wasn’t completely useless as it served to get camera controls done, at first the controls were a simple wasd+up+down scheme but at the course of the project I upgraded them to a full 6dof+zoom and other gizmos. The next image also shows a test of the normals of the spheres colored based on xyz to rgb, just like the book.</p>
	<img
	src="/articles/hobby-raytracer/015.png"
	alt="Normals"/>
	<br>
	<p>The next chapter of the book was sample per pixel. The way it works is that more than one ray is shot per pixel and averaged at the end of the frame with the direction affected by a small random shift, the result is less noise and an antialiasing effect. Before and after of a zoomed in edge of a sphere:</p>
	<Carousel.Root class="w-full m-auto">
	<Carousel.Content>
		<Carousel.Item>
			<img
			src="/articles/hobby-raytracer/016.png"
			alt="Bad antialiasing"
			class="small-img"/>
		</Carousel.Item>
		<Carousel.Item>
			<img
			src="/articles/hobby-raytracer/017.png"
			alt="Good antialiasing"
			class="small-img"/>
		</Carousel.Item>
	</Carousel.Content>
	<Carousel.Previous class="absolute left-2 top-1/2 -translate-y-1/2" />
  	<Carousel.Next class="absolute right-2 top-1/2 -translate-y-1/2" />
	</Carousel.Root>


	<h2 id="Section-4"><a href="#Section-4">##</a> Shiny vs Not-So-Shiny: A Beginner’s Guide</h2>

	<p>Unshaded red balls done, the next step was getting surface materials.</p>
	<p>To get different colored spheres with different textures I coded a materials vector which the spheres could index. The materials used at the start of the project were a simple albedo, roughness, metalness setup. The roughness indicated how rough the surface is, the metalness how metal the surface is and the albedo how albedoness the surface is, simple stuff.</p>
	<br>
	<p>For a pure grey matte material the book used <a href="https://en.wikipedia.org/wiki/Lambertian_reflectance">Lambertian diffuse</a> and halved the attenuation of the outcoming ray when it bounced on the surface, and so did I. The result is a rather weird render.</p>
	<Carousel.Root class="w-full m-auto">
	<Carousel.Content>
		<Carousel.Item>
			<img
			src="/articles/hobby-raytracer/018.png"
			alt="Acne 1"/>
		</Carousel.Item>
		<Carousel.Item>
			<img
			src="/articles/hobby-raytracer/019.png"
			alt="Acne 2"/>
			<p class="img-subtitle">Ain’t this a cool background desktop?</p>
		</Carousel.Item>
		<Carousel.Item>
			<img
			src="/articles/hobby-raytracer/020.png"
			alt="Acne 3"/>
			<p class="img-subtitle">An optical ilussion? Move it around</p>
		</Carousel.Item>
	</Carousel.Content>
	<Carousel.Previous class="absolute left-2 top-1/2 -translate-y-1/2" />
  	<Carousel.Next class="absolute right-2 top-1/2 -translate-y-1/2" />
	</Carousel.Root>
	<br>
	<p>Intuition pointed to floating number precision, after checking that the glm::vec3 were floats and the book was using doubles I investigated how to make the shader use vectors with doubles. Thankfully I didn’t get far enough with the “fix” and read the next chapter of the book where it explained that this was a common problem called “shadow acne”, where rays collide in the same point where it originated due to imprecision. The real fix was putting a minimum distance to the ray cast to hit. Shadow acne gets a D tier for being annoying.</p>
	<img
	src="/articles/hobby-raytracer/023.png"
	alt="Acne fixed"/>
	<p class="img-subtitle">The existence of shadow acne implies that normal acne is not evil</p>
	<br>
	<p>Now the engine had the minimum requirement to be called a raytracing engine: indirect lighting and soft shadows. A screenshot from below a sphere to show the shadows.</p>
	<img
	src="/articles/hobby-raytracer/022.png"
	alt="Shadow demo"/>
	<br>
	<p>A curious problem that occurs when the objects have the same material as the ground is that at certain angles they blend to become undifferentiable. I did not fix it and thankfully it resolved itself later 😛.</p>
	<img
	src="/articles/hobby-raytracer/025.png"
	alt="Backgorund blending"/>
	<br>
	<p>Something I appreciate a lot from the book is the little things a first timer might not notice, like gamma correction. A before and after, the left edge is pure 100% attenuation and right is 0% attenuation.</p>
	<Carousel.Root class="w-full m-auto">
	<Carousel.Content>
		<Carousel.Item>
			<img
			src="/articles/hobby-raytracer/028.png"
			alt="Gamma bad"/>
		</Carousel.Item>
		<Carousel.Item>
			<img
			src="/articles/hobby-raytracer/029.png"
			alt="Gamma good"/>
		</Carousel.Item>
	</Carousel.Content>
	<Carousel.Previous class="absolute left-2 top-1/2 -translate-y-1/2" />
  	<Carousel.Next class="absolute right-2 top-1/2 -translate-y-1/2" />
	</Carousel.Root>
	<br>
	<p>With diffuse material dominated it was time to implement the material system correctly, this is where I encountered for the first time the most common problem in the project, struct misalignments from c++ to glsl. The shader storage buffers used the alignment standard std430 which strictly regulates how struct should fit into a vector item, in retrospect I should have really learnt how it 100% works from the start instead of trial and error.</p>
	<p>This generated misalignment artifacts which are my <b>LEAST</b> favourite out of the bunch even though they are cool in some cases (see second image), they get F tier.</p>
	<Carousel.Root class="w-full m-auto">
	<Carousel.Content>
		<Carousel.Item>
			<img
			src="/articles/hobby-raytracer/030.png"
			alt="Mirror world 1"/>
		</Carousel.Item>
		<Carousel.Item>
			<img
			src="/articles/hobby-raytracer/031.png"
			alt="Mirror world 2"/>
		</Carousel.Item>
	</Carousel.Content>
	<Carousel.Previous class="absolute left-2 top-1/2 -translate-y-1/2" />
  	<Carousel.Next class="absolute right-2 top-1/2 -translate-y-1/2" />
	</Carousel.Root>
	<br>
	<p>100% metal materials bounce the ray to the reflection direction instead of the normal direction. Roughness dictates how close to that direction the ray will bounce, this is why the book called it “fuzzines” as it fuzzes the surface like it was combed with a fine brush. The following scene is a demonstration of the two types of materials created, the second image is a rough metal sphere. </p>
	<Carousel.Root class="w-full m-auto">
	<Carousel.Content>
		<Carousel.Item>
			<img
			src="/articles/hobby-raytracer/032.png"
			alt="Showcase materials"/>
		</Carousel.Item>
		<Carousel.Item>
			<img
			src="/articles/hobby-raytracer/035.png"
			alt="Fuzzed metal"/>
		</Carousel.Item>
	</Carousel.Content>
	<Carousel.Previous class="absolute left-2 top-1/2 -translate-y-1/2" />
  	<Carousel.Next class="absolute right-2 top-1/2 -translate-y-1/2" />
	</Carousel.Root>
	<br>
	<p>Chapter 10 of the book was done, I was very happy with how cool the project was looking so I decided to celebrate by rendering a raytracing classic: a bunch of spheres floating in random positions!</p>
	<img
	src="/articles/hobby-raytracer/033.png"
	alt="Balls i the air"/>
	<br>
	<p>The minimum distance fix also introduced its own type of errors. Here are some examples like, edge errors from an intersection of two balls, and two really close mirror balls. Intersection artifacts get a C tier since they have cool visuals but no real way of fixing them.</p>
	<Carousel.Root class="w-full m-auto">
	<Carousel.Content>
		<Carousel.Item>
			<img
			src="/articles/hobby-raytracer/034.png"
			alt="Intersection error"/>
		</Carousel.Item>
		<Carousel.Item>
			<img
			src="/articles/hobby-raytracer/036.png"
			alt="Infinite mirror"/>
		</Carousel.Item>
	</Carousel.Content>
	<Carousel.Previous class="absolute left-2 top-1/2 -translate-y-1/2" />
  	<Carousel.Next class="absolute right-2 top-1/2 -translate-y-1/2" />
	</Carousel.Root>
	<br>

	<h2 id="Section-5"><a href="#Section-5">##</a> Dielectrics: Because not everyone likes heavy metal</h2>

	<p>A dielectric material is basically an electrical insulator that can be polarized when placed in an electric field, this means nothing on a raytracing engine because we are not simulating electricity. </p>
	<p>The real definition for our case is: dielectric == not opaque.</p>
	<br>
	<p>When a ray bounces on a dielectric it separates into a reflected ray that goes outside the surface and a refracted ray that goes into the surface. The way to determine which of the two directions to choose is with the refractive indices, Snell’s law, and a dice roll compared with the Fresnel factor.</p>
	<br>
	<p>The first implementation always used the refraction direction, getting an odd looking inverter sphere. Refractive indices of materials are usually bigger than the one air has (1.0) but you can put whatever number you want so that's what I did for the second image (0.75), this created a copy image inside the sphere itself. Very interesting results, the explanation of this phenomenon showed itself after triangles were implemented.</p>
	<Carousel.Root class="w-full m-auto">
	<Carousel.Content>
		<Carousel.Item>
			<img
			src="/articles/hobby-raytracer/037.png"
			alt="Glass"/>
		</Carousel.Item>
		<Carousel.Item>
			<img
			src="/articles/hobby-raytracer/040.png"
			alt="Plasma"/>
		</Carousel.Item>
	</Carousel.Content>
	<Carousel.Previous class="absolute left-2 top-1/2 -translate-y-1/2" />
  	<Carousel.Next class="absolute right-2 top-1/2 -translate-y-1/2" />
	</Carousel.Root>
	<br>
	<p>Introducing the reflected ray was rather easy, again thanks to the book. What was not easy was deducting why these black rings appeared near intersections. The error was just that the bounce limit on rays was set to low and for properly rendering dielectrics it requires a number larger than 3, oops. </p>
	<Carousel.Root class="w-full m-auto">
	<Carousel.Content>
		<Carousel.Item>
			<img
			src="/articles/hobby-raytracer/039.png"
			alt="Black rings"/>
		</Carousel.Item>
		<Carousel.Item>
			<img
			src="/articles/hobby-raytracer/038.png"
			alt="An eye"/>
			<p class="img-subtitle">This one looks like an eye! Will not be the last eye you will see here</p>
		</Carousel.Item>
	</Carousel.Content>
	<Carousel.Previous class="absolute left-2 top-1/2 -translate-y-1/2" />
  	<Carousel.Next class="absolute right-2 top-1/2 -translate-y-1/2" />
	</Carousel.Root>
	<br>
	<p>The translucent materials box was checked off and now I had a clear plasma ball (left) and a clear glass ball (right). Notice that they have, almost, no shadow just like in real life, but they do not focus any light either (caustics), which will be fixed later.</p>
	<img
	src="/articles/hobby-raytracer/041.png"
	alt="Dielectric showcase"/>
	<br>
	<p>Adding the new material to the roster I rendered this new showcase scene, with a plasma ball, a hollow glass ball and a water ball.</p>
	<img
	src="/articles/hobby-raytracer/042.png"
	alt="Dielectric showcase with other materials"/>
	<br>
	<p>And of course recreated the balls-in-the-sky scene.</p>
	<Carousel.Root class="w-full m-auto">
	<Carousel.Content>
		<Carousel.Item>
			<img
			src="/articles/hobby-raytracer/043.png"
			alt="Balls in the sky 1"/>
			<p class="img-subtitle">Look at the cool wave pattern!</p>
		</Carousel.Item>
		<Carousel.Item>
			<img
			src="/articles/hobby-raytracer/044.png"
			alt="Balls in the sky 2"/>
			<p class="img-subtitle">Seem familiar?</p>
		</Carousel.Item>
	</Carousel.Content>
	<Carousel.Previous class="absolute left-2 top-1/2 -translate-y-1/2" />
  	<Carousel.Next class="absolute right-2 top-1/2 -translate-y-1/2" />
	</Carousel.Root>
	<br>

	<h2 id="Section-6"><a href="#Section-6">##</a> Off the beaten path</h2>

	<p>The rest of the book was either parts that I didn’t care about like blur or things I already did like positionable cameras. This meant I was on my own now.</p>
	<p>One thing I didn’t like about the implementation given by the book was how restrictive the material system was, if it was a dielectric it had to be a perfectly clear translucent, if it was a metal you could not have labertian diffused rays. So logically the next step was fixing just that.</p>
	<br>
	<p>To modernize the materials I merged all three into one and blended implementations based on parameters, and since I was already rewriting a good chunk of code I also decided to include emissive materials to the system.</p>
	<br>
	<p>The function to get a ray’s color was refactored to be a attenuation + radiance system and the rays ceased to bounce when they collided with a material that emanated light.</p>
	<br>
	<p>This refactoring generated many errors, like breaking the bounce direction for dielectrics, completely toasting the skybox and breaking all albedos. Some of these images were created by accident testing with debug colors.</p>
	<Carousel.Root class="w-full m-auto">
	<Carousel.Content>
		<Carousel.Item>
			<img
			src="/articles/hobby-raytracer/045.png"
			alt="Intersection error 1"/>
		</Carousel.Item>
		<Carousel.Item>
			<img
			src="/articles/hobby-raytracer/047.png"
			alt="Intersection error 2"/>
		</Carousel.Item>
		<Carousel.Item>
			<img
			src="/articles/hobby-raytracer/048.png"
			alt="Intersection error 3"/>
			<p class="img-subtitle">Look! The interior of an alien spaceship!</p>
		</Carousel.Item>
		<Carousel.Item>
			<img
			src="/articles/hobby-raytracer/049.png"
			alt="Infinite mirror world"/>
			<p class="img-subtitle">Infinite mirror world</p>
		</Carousel.Item>
		<Carousel.Item>
			<img
			src="/articles/hobby-raytracer/050.png"
			alt="White scene"/>
			<p class="img-subtitle">A very soothing and serene scene</p>
		</Carousel.Item>
	</Carousel.Content>
	<Carousel.Previous class="absolute left-2 top-1/2 -translate-y-1/2" />
  	<Carousel.Next class="absolute right-2 top-1/2 -translate-y-1/2" />
	</Carousel.Root>
	<br>
	<p>After a good day's worth I ended up with an implementation, not a good one nor one I liked, but one that worked. Reproducing the scene from before yielded disappointing results in comparison as it looked the same but a little more dark.</p>
	<br>
	<img
	src="/articles/hobby-raytracer/051.png"
	alt="Showcase scene upgraded"/>
	<br>
	<p>Still, it was an upgrade from before so I decided to indulge myself and upgraded the skybox with a sun, and created a night variation. Now I wasn’t so sad because it looked way better than before.</p>
	<Carousel.Root class="w-full m-auto">
	<Carousel.Content>
		<Carousel.Item>
			<img
			src="/articles/hobby-raytracer/052.png"
			alt="Day skybox"/>
		</Carousel.Item>
		<Carousel.Item>
			<img
			src="/articles/hobby-raytracer/053.png"
			alt="Night skybox"/>
		</Carousel.Item>
	</Carousel.Content>
	<Carousel.Previous class="absolute left-2 top-1/2 -translate-y-1/2" />
  	<Carousel.Next class="absolute right-2 top-1/2 -translate-y-1/2" />
	</Carousel.Root>
	<br>
	<p>It was time to stretch the possibilities of the new system by making a showcase of possible materials, this ended poorly as fixing some blending bugs generated others culminating in this bad looking render.</p>
	<img
	src="/articles/hobby-raytracer/054.png"
	alt="Foggy scene"/>
	<p class="img-subtitle">Why does it look like Silent Hill 2? Where did the fog come from?</p>
	<br>

	<h2 id="Section-7"><a href="#Section-7">##</a> Getting serious</h2>

	<p>The state of the project was left a mess after my attempt at independence. It was time to man up, admit my mistakes and scrap what I got.</p>
	<p>Smarter people than me had my problems in the past and already solved them so a research round was my best bet. </p>
	<br>
	<p>I encountered the term PBR, which stands for Physically Based Rendering, that uses real world measured values to create photorealistic materials. Blender uses PBR, taking in the steps of an industry standard tool didn’t sound so bad. By pure chance the same day I was learning about blender pbr materials a new LTS version launched, the universe gave me a signal.</p>
	<img
	src="/articles/hobby-raytracer/055.png"
	alt="Google search 1"/>
	<br>
	<p>Blender “Principled BSDF” was the main material node in any complex material, recreating it would be a fair challenge. It has albedo, roughness and metalness but it also included transmission, subsurface scattering, sheen, coat and other thingies. I did a deep dive into pbr, unfortunately the amount of easy to read resources was scarce.</p>
	<img
	src="/articles/hobby-raytracer/056.png"
	alt="Google search 2"/>
	<br>
	<p>This <a href="https://youtu.be/RRE-F57fbXw">wonderful video</a> helped me a lot, it explains the rendering equation and the Cook-Torrance BRDF. BRDF stands for "Bidirectional Reflectance distribution function”  and dictates how a ray is reflected in a surface and how the color is attenuated. Pay attention this will come up later in the exam.</p>
	<br>
	<p>For a BRDF to be considered to be physically based it needs to include a microfacet model along the way. For my use case the GGX microfacet distribution was used since it was fast and looked nice, not that I tested other functions.</p>
	<br>
	<p>A recurrent problem that I had was that I had no idea what I was doing, multiple badly implemented functions made debugging difficult. The one thing the video didn’t provide was how to generate the direction out of the outgoing ray (L), so I also stumbled through the GGX sampling trying to find a solution. The route to getting all of this working was diffuse (get it?).</p>
	<br>
	<p>Whiteout artifacts are when a ray sample returns an anomaly large value of light overblowing the color into pure white, a lot appeared at this time of the project.</p>
	<Carousel.Root class="w-full m-auto">
	<Carousel.Content>
		<Carousel.Item>
			<img
			src="/articles/hobby-raytracer/057.png"
			alt="Ripples"/>
			<p class="img-subtitle">Not acne, but a badly implemented Fresnel approximation</p>
		</Carousel.Item>
		<Carousel.Item>
			<img
			src="/articles/hobby-raytracer/060.png"
			alt="Unripe apple"/>
			<p class="img-subtitle">Whiteout artifacts, C tier. Unripe apple</p>
		</Carousel.Item>
		<Carousel.Item>
			<img
			src="/articles/hobby-raytracer/059.png"
			alt="Almost perfect red ball"/>
			<p class="img-subtitle">Almost fixed it</p>
		</Carousel.Item>
	</Carousel.Content>
	<Carousel.Previous class="absolute left-2 top-1/2 -translate-y-1/2" />
  	<Carousel.Next class="absolute right-2 top-1/2 -translate-y-1/2" />
	</Carousel.Root>
	<br>
	<p>Five whole days were spent tweaking the shader code to include a simple BRDF, at the time this was the most difficult part of the project although now it seems rather trivial. I gained something from this part of the project, skimming through critical information of the rendering core was not advisable.</p>
	<br>
	<p>The new rendering model had the ability to give specular highlights to materials, and also color them however I wanted. A demonstration I did with a grin on my face:</p>
	<Carousel.Root class="w-full m-auto">
	<Carousel.Content>
		<Carousel.Item>
			<img
			src="/articles/hobby-raytracer/062.png"
			alt="Normal specular"/>
			<p class="img-subtitle">Normal specular</p>
		</Carousel.Item>
		<Carousel.Item>
			<img
			src="/articles/hobby-raytracer/065.png"
			alt="Purple specular"/>
			<p class="img-subtitle">Purple specular</p>
		</Carousel.Item>
		<Carousel.Item>
			<img
			src="/articles/hobby-raytracer/064.png"
			alt="No specular"/>
			<p class="img-subtitle">No specular</p>
		</Carousel.Item>
	</Carousel.Content>
	<Carousel.Previous class="absolute left-2 top-1/2 -translate-y-1/2" />
  	<Carousel.Next class="absolute right-2 top-1/2 -translate-y-1/2" />
	</Carousel.Root>
	<br>
	<p>Playing around with material values showed me more work to fix, like the GGX distribution function breaks at +Z or that roughness 0 creates artifacts due to near zero imprecision on the geometry shadowing function.</p>
	<img
	src="/articles/hobby-raytracer/063.png"
	alt="Bad GGX"/>
	<br>
	<p>In order to understand better the rendering core I investigated more into Monte Carlo renderers and <a href="https://www.youtube.com/watch?v=xFsJMUS94Fs">importance sampling</a>. In short, instead of brute forcing all light interactions by getting rare bounces to light sources or acute angles you can sample more of those rare cases and compensate by their estimated probability.</p>
	<br>
	<p>You can combine multiple important sampling techniques for even better results, Next Event Estimation does exactly that, sampling direct and indirect light sources in a single bounce. Cornell University has some very helpful <a href="https://youtu.be/FU1dbi827LY?feature=shared">slides</a> on this topic. To implement NEE a new light system was created, I already had the indirect light worked out since that's the raytracer job so only the direct light had to be added. New data types required a new shader storage buffer and that, of course, bringed its own share of misalignment artifacts.</p>
	<img
	src="/articles/hobby-raytracer/067.png"
	alt="Data ghost"/>
	<p class="img-subtitle">The specular part separated and looks like a data ghost :0</p>
	<br>
	<p>Three different types of direct light sources were implemented on the first revision of NEE. An ambient light that can always get to any point, a direction light that creates hard shadows (often the same direction as the sun), and sphere emitters that need a point on the hemisphere with direct line of sight. The importance sampling came from pooling all lights strengths and choosing based on rng and strength weights getting the most info out of the limited samples per pixel.</p>
	<br>
	<p>Now, a scene with debug colors that show the sun’s influence on every point. Also the first appearance of my favourite type of artifacts, weird artifacts, I called them that because I don’t know what they are nor how to fix them but they are always visualling intriguing on how they could have formed. S tier.</p>
	<Carousel.Root class="w-full m-auto">
	<Carousel.Content>
		<Carousel.Item>
			<img
			src="/articles/hobby-raytracer/068.png"
			alt="Cool retro future scene"/>
			<p class="img-subtitle">What a cool pattern!</p>
		</Carousel.Item>
		<Carousel.Item>
			<img
			src="/articles/hobby-raytracer/069.png"
			alt="From the ground"/>
			<p class="img-subtitle">Looking up from the underside of the ground</p>
		</Carousel.Item>
		<Carousel.Item>
			<img
			src="/articles/hobby-raytracer/058.png"
			alt="Black light"/>
			<p class="img-subtitle">A failed skybox light sampling implementation</p>
		</Carousel.Item>
		<Carousel.Item>
			<img
			src="/articles/hobby-raytracer/072.png"
			alt="Weird artifact"/>
			<p class="img-subtitle">Looks like a black hole accretion disk</p>
		</Carousel.Item>
	</Carousel.Content>
	<Carousel.Previous class="absolute left-2 top-1/2 -translate-y-1/2" />
  	<Carousel.Next class="absolute right-2 top-1/2 -translate-y-1/2" />
	</Carousel.Root>
	<br>
	<p>The most interesting results were with the directional lights as they yielded the most aesthetically pleasing results, finally letting us see those specular highlights fully in action and of course getting the crispy shadows. </p>
	<br>
	<p>Also, it was at this time I decided to implement frame accumulation, a handy feature where it averages various frames together if you do not move the camera, boosting fps and reducing noise at the cost of a couple of seconds. A feature so good I didn’t know why I didn't include it sooner.</p>
	<Carousel.Root class="w-full m-auto">
	<Carousel.Content>
		<Carousel.Item>
			<img
			src="/articles/hobby-raytracer/070.png"
			alt="Specular funky"/>
		</Carousel.Item>
		<Carousel.Item>
			<img
			src="/articles/hobby-raytracer/071.png"
			alt="Lone wolf"/>
		</Carousel.Item>
		<Carousel.Item>
			<img
			src="/articles/hobby-raytracer/074.png"
			alt="Crispy"/>
			<p class="img-subtitle">Noise free at 144fps</p>
		</Carousel.Item>
	</Carousel.Content>
	<Carousel.Previous class="absolute left-2 top-1/2 -translate-y-1/2" />
  	<Carousel.Next class="absolute right-2 top-1/2 -translate-y-1/2" />
	</Carousel.Root>
	<br>
	<p>Next up, sphere emitters. Easy peasy for indirect, not so for direct. The results: nice soft shadows.</p>
	<img
	src="/articles/hobby-raytracer/075.png"
	alt="Artificial light at night"/>
	<br>
	<p>To end the BRDF metalness was next. Surprisingly it only took 5 lines of code to get it working, a far cry from the 1k+ of the triangle tutorial.</p>
	<img
	src="/articles/hobby-raytracer/076.png"
	alt="Tiny showcase"/>

	<h2 id="Section-8"><a href="#Section-8">##</a> Walter, put your dielectrics away Walter</h2>

	<p>Refactoring the previous model included getting dielectrics done, for a third time.</p>
	<p>Investigating I found a rough dielectric model in a <a href="https://www.cs.cornell.edu/~srm/publications/EGSR07-btdf.pdf">paper</a> by Bruce Walter and someone named “et al” from <b>Cornell</b> University. Jokes aside, this paper was immensely helpful and it’s oriented so implementers have an easy job.</p>
	<p>The basis of this model is having a BRDF (Reflection) for outgoing rays, a BTDF (Transmission) for ingoing rays and combining them onto a BSDF (Scattering = Reflection+Transmission). Half the job was already done since both functions used the same distribution and geometry shadowing functions.</p>
	<Carousel.Root class="w-full m-auto">
	<Carousel.Content>
		<Carousel.Item>
			<img
			src="/articles/hobby-raytracer/081.jpeg"
			alt="Best friend 3"/>
		</Carousel.Item>
		<Carousel.Item>
			<img
			src="/articles/hobby-raytracer/077.png"
			alt="Walter white"/>
			<p class="img-subtitle">It appears not a lot of people are interested into BTDFs</p>
		</Carousel.Item>
		<Carousel.Item>
			<img
			src="/articles/hobby-raytracer/080.png"
			alt="Walter dog"/>
			<p class="img-subtitle">First result for “Walter BTDF” in youtube</p>
		</Carousel.Item>
	</Carousel.Content>
	<Carousel.Previous class="absolute left-2 top-1/2 -translate-y-1/2" />
	<Carousel.Next class="absolute right-2 top-1/2 -translate-y-1/2" />
	</Carousel.Root>
	<br>
	<p>First instinct to make this new model was adapting what already had, not touching the diffuse+metal side and creating a new separate scatter function. </p>
	<br>
	<p>Just like any other section on this article I will show you bad renders I created along the way in chronological order, but what you will notice is that they <b>somehow become worse</b> as the implementation progresses.</p>
	<br>
	<p>A layer above the BSDF was the decision layer which generated the direction of the outgoing ray and chose which bidirectional function to use. Some direction specific bugs that appeared because of a misplaced minus on the refraction formula.</p>
	<Carousel.Root class="w-full m-auto">
	<Carousel.Content>
		<Carousel.Item>
			<img
			src="/articles/hobby-raytracer/079.png"
			alt="Directional bug 1"/>
		</Carousel.Item>
		<Carousel.Item>
			<img
			src="/articles/hobby-raytracer/082.png"
			alt="Directional bug 2"/>
		</Carousel.Item>
	</Carousel.Content>
	<Carousel.Previous class="absolute left-2 top-1/2 -translate-y-1/2" />
	<Carousel.Next class="absolute right-2 top-1/2 -translate-y-1/2" />
	</Carousel.Root>
	<br>
	<p>The formulas that the <a href="https://youtu.be/RRE-F57fbXw">video</a> provided for the internal functions only worked for pure BRDF and could not be applied to a BTDF so I recreated the ones given by the paper. These were harder to read, understand and debug. </p>
	<br>
	<p>Some attempts at transferring the functions from paper to code. Also division by zero artifacts that create black pixels since the dispatch order crashes, D tier.</p>
	<Carousel.Root class="w-full m-auto">
	<Carousel.Content>
		<Carousel.Item>
			<img
			src="/articles/hobby-raytracer/083.png"
			alt="White ring"/>
		</Carousel.Item>
		<Carousel.Item>
			<img
			src="/articles/hobby-raytracer/084.png"
			alt="Black ring"/>
		</Carousel.Item>
		<Carousel.Item>
			<img
			src="/articles/hobby-raytracer/085.png"
			alt="Black and white"/>
		</Carousel.Item>
	</Carousel.Content>
	<Carousel.Previous class="absolute left-2 top-1/2 -translate-y-1/2" />
	<Carousel.Next class="absolute right-2 top-1/2 -translate-y-1/2" />
	</Carousel.Root>
	<br>
	<p>On the last image the left sphere is supposed to be a dielectric with an ior of 1.5, the same as glass. </p>
	<p>Did you notice that past glass balls inverted the things behind them but these ones don’t? That’s because the fix I did for the refraction function worked just enough for me to not notice that it was wrongly implemented.</p>
	<p>Did you also know that glsl gives you a built-in function called “refract”? Well, I didn’t. I felt quite stupid at this point.</p>
	<Carousel.Root class="w-full m-auto">
	<Carousel.Content>
		<Carousel.Item>
			<img
			src="/articles/hobby-raytracer/086.png"
			alt="Debug 1"/>
			<p class="img-subtitle">Scatter direction in rgb</p>
		</Carousel.Item>
		<Carousel.Item>
			<img
			src="/articles/hobby-raytracer/087.png"
			alt="Debug 2"/>
		</Carousel.Item>
	</Carousel.Content>
	<Carousel.Previous class="absolute left-2 top-1/2 -translate-y-1/2" />
	<Carousel.Next class="absolute right-2 top-1/2 -translate-y-1/2" />
	</Carousel.Root>
	<br>
	<p>Forcing the use of the BTDF yielded these promising results, only the outer reflected ring of the sphere was wrong. I colored red pixels in places the function provided values outside the desired attenuation boundary [0,1], later I would know that this debugging method was flawed since I was using approximations and in some cases some correct values could be outside this boundary.</p>
	<img
	src="/articles/hobby-raytracer/088.png"
	alt="Red ring"/>
	<br>
	<p>Fixing something always showed another thing that was broken but you didn’t notice since it was buried until now. Compound bugs were hard and numerous so I’m just gonna give you a rapid fire spread of screenshots until real progress was made.</p>
	<Carousel.Root class="w-full m-auto">
	<Carousel.Content>
		<Carousel.Item>
			<img
			src="/articles/hobby-raytracer/089.png"
			alt="Obsidian"/>
			<p class="img-subtitle">Obsidian is a type of glass, does that count?</p>
		</Carousel.Item>
		<Carousel.Item>
			<img
			src="/articles/hobby-raytracer/090.png"
			alt="inside of the obsidian"/>
			<p class="img-subtitle">The inside of the obsidian ball … how? … why?</p>
		</Carousel.Item>
		<Carousel.Item>
			<img
			src="/articles/hobby-raytracer/092.png"
			alt="black light lamp"/>
			<p class="img-subtitle">This is just a black light lamp, nothing to see here (get it?)</p>
		</Carousel.Item>
		<Carousel.Item>
			<img
			src="/articles/hobby-raytracer/093.png"
			alt="metal mirror"/>
			<p class="img-subtitle">A bizarre metal mirror that shows hidden light sources</p>
		</Carousel.Item>
		<Carousel.Item>
			<img
			src="/articles/hobby-raytracer/094.png"
			alt="radioactive 1"/>
			<p class="img-subtitle">Is it radioactive?</p>
		</Carousel.Item>
		<Carousel.Item>
			<img
			src="/articles/hobby-raytracer/096.png"
			alt="Hal”"/>
			<p class="img-subtitle">“Open the pod bay doors Hal”. Told you it wasn’t the last eye you would see</p>
		</Carousel.Item>
		<Carousel.Item>
			<img
			src="/articles/hobby-raytracer/078.png"
			alt="IDK"/>
			<p class="img-subtitle">I don’t even know anymore</p>
		</Carousel.Item>
		<Carousel.Item>
			<img
			src="/articles/hobby-raytracer/098.png"
			alt="blocky texture"/>
			<p class="img-subtitle">Cool blocky texture I totally did on purpose</p>
		</Carousel.Item>
		<Carousel.Item>
			<img
			src="/articles/hobby-raytracer/095.png"
			alt="Almost"/>
			<p class="img-subtitle">Almost there…</p>
		</Carousel.Item>
		<Carousel.Item>
			<img
			src="/articles/hobby-raytracer/101.png"
			alt="radioactive 2"/>
			<p class="img-subtitle">Ok, it’s definitely radioactive</p>
		</Carousel.Item>
		<Carousel.Item>
			<img
			src="/articles/hobby-raytracer/100.png"
			alt="joke"/>
			<p class="img-subtitle">Call me a urologist the way I be fixing those balls (change joke later, don’t forget)</p>
		</Carousel.Item>
		<Carousel.Item>
			<img
			src="/articles/hobby-raytracer/103.png"
			alt="Glass 1"/>
			<p class="img-subtitle">Almost done</p>
		</Carousel.Item>
		<Carousel.Item>
			<img
			src="/articles/hobby-raytracer/104.png"
			alt="Glass 2"/>
			<p class="img-subtitle">But where are the specular reflections?</p>
		</Carousel.Item>
	</Carousel.Content>
	<Carousel.Previous class="absolute left-2 top-1/2 -translate-y-1/2" />
	<Carousel.Next class="absolute right-2 top-1/2 -translate-y-1/2" />
	</Carousel.Root>
	<br>
	<p>50 hours later I got it working. This was the hardest part of the project, no contest.</p>
	<p>The paper promised a “Refraction through Rough Surfaces” that meant that I could also render frosted glass making this new model objectively better than the older one.</p>
	<br>
	<p>I was very happy with how it turned out, I pushed the code to the repo dancing in my chair.</p>
	<img
	src="/articles/hobby-raytracer/106.png"
	alt="Glass complete"/>
	<br>
	<p>If you guessed there were more bugs you are right. Setting the ior to 1.0, the same as air, completely breaks the model. Since the paper gave a warning about this exact situation I considered it a non problem and made a guard in the material creation process, easy peasy.</p>
	<img
	src="/articles/hobby-raytracer/107.png"
	alt="IOR 1"/>
	<br>
	<p>This next image is a hybrid material with a little bit of everything in order to demonstrate the capacities of the BSDF.</p>
	<p>This material is: 50% transparent, 80% transmissive, 50% metal, 10% rough, with red base color, blue specular highlights and green interior.</p>
	<img
	src="/articles/hobby-raytracer/108.png"
	alt="Hybrid material"/>
	<br>
	<p>Since I like comparison images, here is the same scene from before the refactoring. There is a slight bug present here that I resolved later, the light struct is misaligned and the ambient light gives a slightly yellow hue to everything, like a sunset.</p>
	<Carousel.Root class="w-full m-auto">
	<Carousel.Content>
		<Carousel.Item>
			<img
			src="/articles/hobby-raytracer/111.png"
			alt="Normal specular"/>
		</Carousel.Item>
		<Carousel.Item>
			<img
			src="/articles/hobby-raytracer/110.png"
			alt="Purple specular"/>
			<p class="img-subtitle">Another cool pattern for the collection</p>
		</Carousel.Item>
	</Carousel.Content>
	<Carousel.Previous class="absolute left-2 top-1/2 -translate-y-1/2" />
	<Carousel.Next class="absolute right-2 top-1/2 -translate-y-1/2" />
	</Carousel.Root>
	<br>

	<h2 id="Section-8"><a href="#Section-8">##</a> Enough with the balls</h2>

	<p>I needed some triangles on my raytracer otherwise the other developers would make fun of me.</p>
	<p>What I needed to do was code the intersection functions and get the new primitive vector to the shader. The implementation itself was easy, since the formulas were widely available and adding new buffers and data types was no longer a problem. That didn’t mean no bugs appeared.</p>
	<Carousel.Root class="w-full m-auto">
	<Carousel.Content>
		<Carousel.Item>
			<img
			src="/articles/hobby-raytracer/113.png"
			alt="Black tri"/>
			<p class="img-subtitle">It isn’t supposed to be black</p>
		</Carousel.Item>
		<Carousel.Item>
			<img
			src="/articles/hobby-raytracer/114.png"
			alt="Big tri"/>
			<p class="img-subtitle">Why did the triangle break up with the sphere? Because it found the relationship pointless</p>
		</Carousel.Item>
		<Carousel.Item>
			<img
			src="/articles/hobby-raytracer/115.png"
			alt="Only aldebos"/>
			<p class="img-subtitle">One time I told a joke about mirrors, but it just bounced of everyone</p>
		</Carousel.Item>
		<Carousel.Item>
			<img
			src="/articles/hobby-raytracer/117.png"
			alt="Eberythiong white"/>
			<p class="img-subtitle">Why did the photon stop dating? To many caustic relationships</p>
		</Carousel.Item>
		<Carousel.Item>
			<img
			src="/articles/hobby-raytracer/118.png"
			alt="Black dot"/>
			<p class="img-subtitle">What a cool pattern! Again!</p>
		</Carousel.Item>
		<Carousel.Item>
			<img
			src="/articles/hobby-raytracer/116.png"
			alt="Normal tri"/>
			<p class="img-subtitle">I ran out of jokes, don’t snooze, keep reading</p>
		</Carousel.Item>
	</Carousel.Content>
	<Carousel.Previous class="absolute left-2 top-1/2 -translate-y-1/2" />
	<Carousel.Next class="absolute right-2 top-1/2 -translate-y-1/2" />
	</Carousel.Root>
	<br>
	<p>One curious case that I noticed was that when a dielectric triangle was seen by the backside a circle formed where the rays inside of it went into the triangle and outside when outside the triangle. I tested this when some debug colors thinking it was some error with my Fresnel function.</p>
	<img
	src="/articles/hobby-raytracer/119.png"
	alt="Snells window tri"/>
	<br>
	<p>Turns out this is a natural phenomenon called <a href="https://en.wikipedia.org/wiki/Snell%27s_window">Snell’s window</a>, it appears when you see out of a transparent surface so that the medium you are in has a higher index of refraction than the one you are looking at. This makes a “window” where you can see out. </p>
	<p>So this wasn’t a bug at all, it looks weird on the screenshot because it wouldn’t be possible to make a photo like this in real life. I rendered a “Underwater” scene where you can see the effect better.</p>
	<Carousel.Root class="w-full m-auto">
	<Carousel.Content>
		<Carousel.Item>
			<img
			src="/articles/hobby-raytracer/121.png"
			alt="Underwater tri"/>
			<p class="img-subtitle">It would be better with some waves</p>
		</Carousel.Item>
		<Carousel.Item>
			<img
			src="/articles/hobby-raytracer/122.png"
			alt="Glass tri"/>
			<p class="img-subtitle">With triangles the frosted glass material really shines (get it?)</p>
		</Carousel.Item>
	</Carousel.Content>
	<Carousel.Previous class="absolute left-2 top-1/2 -translate-y-1/2" />
	<Carousel.Next class="absolute right-2 top-1/2 -translate-y-1/2" />
	</Carousel.Root>
	<br>
	<p>Since it took less than a day to add triangles to the raytracer I might as well add geometry meshes from importable 3d objects. </p>
	<p>GLTF seemed like an ok extension to support because it has pbr materials supported, so I imported a gltf loader (tinygltf) ripped out the vertex and indices from the mesh and shoved them into shader storage buffers alongside a mesh info.</p>
	<Carousel.Root class="w-full m-auto">
	<Carousel.Content>
		<Carousel.Item>
			<img
			src="/articles/hobby-raytracer/124.png"
			alt="Datamoshed teapot"/>
			<p class="img-subtitle">VSCode data moshed into the image!</p>
		</Carousel.Item>
		<Carousel.Item>
			<img
			src="/articles/hobby-raytracer/123.png"
			alt="Laying down teapot"/>
			<p class="img-subtitle">Wrong rotation, oops</p>
		</Carousel.Item>
		<Carousel.Item>
			<img
			src="/articles/hobby-raytracer/125.png"
			alt="Good teapot"/>
			<p class="img-subtitle">There we go, easy peasy</p>
		</Carousel.Item>
	</Carousel.Content>
	<Carousel.Previous class="absolute left-2 top-1/2 -translate-y-1/2" />
	<Carousel.Next class="absolute right-2 top-1/2 -translate-y-1/2" />
	</Carousel.Root>
	<br>
	<p>One thing that I did not do was the direct light sampling for the triangles, admittedly it was boring so I left it for future Victor. I hate past Victor.</p>
	<p>Before working on it I tweaked how the scene gets loaded so you could create one with empty vectors so it didn’t crash creating 0 byte buffers. I’m telling this because it broke things without me knowing, like this jumbled up teapot.</p>
	<img
	src="/articles/hobby-raytracer/129.png"
	alt="Jumbled teapot"/>
	<p class="img-subtitle">Huta teapot</p>
	<br>
	<p>One thing that I noticed with NEE is that dielectric doesn't work well on low light scenes with the triangles, this is a bug that I’m not totally sure of to fix, this is a problem for future Victor 😛. Maybe looking into photon mapping would be interesting.</p>
	<Carousel.Root class="w-full m-auto">
	<Carousel.Content>
		<Carousel.Item>
			<img
			src="/articles/hobby-raytracer/128.png"
			alt="Good light tri"/>
		</Carousel.Item>
		<Carousel.Item>
			<img
			src="/articles/hobby-raytracer/127.png"
			alt="Bad light tri"/>
		</Carousel.Item>
	</Carousel.Content>
	<Carousel.Previous class="absolute left-2 top-1/2 -translate-y-1/2" />
	<Carousel.Next class="absolute right-2 top-1/2 -translate-y-1/2" />
	</Carousel.Root>

	<h2 id="Section-9"><a href="#Section-9">##</a> The results</h2>

	<p>The Cornell box is a commonly used 3D model used for testing the accuracy of a render by comparing it to the real life photograph of the same model. </p>
	<br>
	<p>I constructed it with quads, which I created by just getting two triangles next to each other. My first renders were made with a white skybox, this was incorrect since it brightened up the front of the boxes. A more accurate skybox color was a dark grey simulating the diffuse lighting in the photo.</p>
	<Carousel.Root class="w-full m-auto">
	<Carousel.Content>
		<Carousel.Item>
			<img
			src="/articles/hobby-raytracer/131.png"
			alt="My cornell box"/>
			<p class="img-subtitle">Looks ok, but it isn’t accurate</p>
		</Carousel.Item>
		<Carousel.Item>
			<img
			src="/articles/hobby-raytracer/135.png"
			alt="Perfect cornell box"/>
			<p class="img-subtitle">What’s supposed to look like</p>
		</Carousel.Item>
		<Carousel.Item>
			<img
			src="/articles/hobby-raytracer/132.png"
			alt="Dark cornell box"/>
			<p class="img-subtitle">More accurate, low samples, no NEE and low res. But dark</p>
		</Carousel.Item>
	</Carousel.Content>
	<Carousel.Previous class="absolute left-2 top-1/2 -translate-y-1/2" />
	<Carousel.Next class="absolute right-2 top-1/2 -translate-y-1/2" />
	</Carousel.Root>
	<br>
	<p>Since the Cornell Box only showed diffused materials I upgraded it to have all of the different features of the raytracer. One bug showed up involving edge intersections where if a ray hit very close to one and bounced into the other the minimum distance wasn’t cleared and passed through right into the skybox. Lifting the boxes and shifting the walls fixed it.</p>
	<img
	src="/articles/hobby-raytracer/133.png"
	alt="Cornell box with artifacts"/>
	<br>
	<p>And now for the <i>GRAND FINALE</i>, a fully upgraded Cornell box with some of the features of the raytracer.</p>
	<br>
	<p>The cornell box with (left to right):</p>
	<p> · White metal mirror ball.</p>
	<p> · Tall glass prism.</p>
	<p> · Gold star (3d model).</p>
	<p> · Green ball, with blue specular highlights, and red interior.</p>
	<p> · Blue diffuse block.</p>
	<p> · Deep blue frosted glass sphere.</p>
	<p> · Corner mirror.</p>
	<p> · Blue neon light.</p>
	<p> · Small square glass 2D panel.</p>
	<p> · Diffuse walls, ceiling and floor.</p>
	<p> · Pure white light on top.</p>
	<img
	src="/articles/hobby-raytracer/134.png"
	alt="Final render"/>
	<br>

	<h2 id="Section-9"><a href="#Section-9">##</a> Conclusion</h2>

	<p>I’m tired of writing so you are just gonna read some lists.</p>
	<br>
	<p>If I had to do my first computer graphics project again this is some tips I would give myself:</p>
	<p> · Don’t look into Vulkan too soon, stick to OpenGL for the basics.</p>
	<p> · PBR is cool but the effort isn’t worth it for a basic renderer, keep the core that the book gives you.</p>
	<p> · You need to read and understand everything before advancing, the triangle chapter was made much easier because I learnt this lesson.</p>
	<p> · 3D Models are expensive, a good chunk of the project should have been optimizing with BVH or K-D Trees.</p>
	<p> · PBR materials only shine with normal maps and image textures on top, plain spheres don't do them justice.</p>
	<br>
	<p>Some things I HAVE to add to make this renderer feel complete:</p>
	<p> · Image support for any of the material parameters and normals</p>
	<p> · Basic GLTF PBR material support</p>
	<p> · Triangle mesh optimizations</p>
	<p> · Postprocessing effects</p>
	<p> · A good Cornel box render</p>
	<br>
	<p>Some alternative paths I could take this renderer to:</p>
	<p> · Photon mapping</p>
	<p> · Spectral caustics (spooky)</p>
	<p> · Glossy BRDFs</p>
	<p> · Movement support for the scene, maybe gpu physics would be cool</p>
	<br>
	<p>The raytracer project was a great success in my eyes, I 100% recommend doing something similar for your first graphics programming project, it’s very fun. Take my decision errors and make something better than mine, if you do please dm about it I would love to hear from you!</p>
	<br>
	<p>Thank you so much for reading this article!!!</p>
	<p>Did you enjoy it? Because I sure did making it!!!1!!</p>
	<br>
	<p>Also thanks to my 17 year old brother who proofread this article with the utmost scientific professional standard.</p>
	<br>
	<p>If you want to look at the code here is the <a href="https://github.com/VictorOrrios/Raytracer">public repo</a>.</p>
	<br>

	<h2 id="Section-10"><a href="#Section-10">##</a> The exam</h2>

	<p>Told you this was gonna show up in the exam!</p>
	<p>Time to know if you have been paying attention, no back looksies!</p>
	<br>
	<Exam/>

	<br>
	<br>
</article>	

<style>
	article{
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

	article p{
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

	article img{
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

	article a:hover{ 
		color: var(--text-foreground); 
		background-color: var(--theme-color-lighter); 
		text-decoration: none; 
		font-weight: 900; 
	}

	article .presentation-img{
		width: 100%;
		margin-top: 1rem;
		margin-bottom: 0.5rem;
	}

	article .img-subtitle{
		font-style: italic;
		text-align: center;
		font-size: 1rem;
	}

	article .small-img{
		width: 30%;
	}

</style>