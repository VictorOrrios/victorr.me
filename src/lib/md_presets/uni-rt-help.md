# Uni-rt guide

A WebGL 2.0 based pathtracer made by Víctor Orrios and José Miguel Quílez for the Computer Graphics subject at UNIZAR (Zaragoza).

<hr class="my-2">

## Controls

- Samples per pixel: How many rays per pixel to cast
- Mean bounces: How many bounces a ray has on average before it dies
- Frame accumulation: Denoises frames after a short time
- Fast mode: Increases performance while the camera is moving
- Aperture: Radius of the disc-shaped aperture of the camera; leave at 0 for a pinhole camera (everything in focus)
- Focal distance: Distance the camera is focused on
- Transient mode: Activates cropping of rays based on path length, visualizing light propagation.
- Animate: The slider controls the crop window location, and the button starts an animation that moves it forward
- Window size: Size of the crop window
- Kernel sigma: Sigma of the Gaussian kernel applied to the crop window; leave at 0 for no kernel

<hr class="mb-2">

## Features

- BVH implementation for accelerating mesh intersection tests, using Binned SAH heuristics
- Loading of GLTF 2.0 models, including both geometry (meshes) and materials
- Cook-Torrance BSDF model, based on the work of Bruce Walter et al. (2007) and the Blender/Disney Principled BSDF, using the GGX distribution for the normal distribution function (D), geometric attenuation (G), and bounce direction generation
- PBR material system with support for roughness, metalness, reflectance, transmission, IOR, and emission parameters, as well as diffuse, specular, and subsurface (dielectric) color components
- Texture mapping for albedo, roughness, metalness, and emission parameters
- Normal mapping for all primitives and meshes
- Temporal denoising using frame buffers
- Next Event Estimation (NEE) with point lights
- Ambient lighting via an HDRI skybox
- Depth of field system
- Support for transient rendering
