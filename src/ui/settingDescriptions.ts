/** Descriptions shared by inspector fields and their accessible labels. */
const descriptions: Record<string, string> = {
  Schedule: 'Controls when the emitter creates waves of particles. A wave is one group of particle creation attempts.',
  Population:
    'Controls the number of particles attempted per wave, their spawn probability, and the maximum number alive at once.',
  'Emission mode':
    'Fixed interval emits waves at a constant rate. Random interval chooses a new delay between waves. Manual emits only when you press Burst or call emitWave().',
  'Wave interval':
    'Time between particle waves, in milliseconds. Smaller values emit more often: 100 ms gives 10 waves per second. Must be greater than zero.',
  'Interval min':
    'One bound of the random delay between waves, in milliseconds. A new delay is chosen for each wave; the two bounds may be entered in either order.',
  'Interval max':
    'The other bound of the random delay between waves, in milliseconds. Wider ranges make the emission rhythm less regular.',
  'Initial delay':
    'Wait this many milliseconds after starting or restarting before the first scheduled wave. Burst still emits immediately during this delay.',
  'Emit indefinitely':
    'Keeps scheduled emission running without a time limit. Turn off to set an emission duration. This does not make individual particles live forever.',
  'Emission duration':
    'How long scheduled emission runs, in milliseconds, after the initial delay. Existing particles keep moving until their lifetimes end. Zero disables scheduled waves; Burst still works.',
  'Auto start':
    'Starts the emitter when it is created. When off, use Play to start scheduled emission or Burst to emit a wave manually. This setting is included in exported configurations.',
  'Particles per wave':
    'Number of particle creation attempts in each wave, including Burst. Spawn chance and the particle limit can reduce the number actually created. Zero creates no particles.',
  'Spawn chance':
    'Probability that each particle creation attempt succeeds, from 0% to 100%. At 50%, roughly half of attempted particles are created; 0% prevents all creation.',
  'Unlimited particles':
    'Removes the limit on particles alive at the same time. Long lifetimes and frequent waves can create a very large population.',
  'Particle limit':
    'Maximum number of live particles. Attempts above this limit are skipped until particles die and free space. Zero prevents creation.',
  Lifetime:
    'How long each particle lives, in milliseconds. At the end of its life it disappears and its view can be reused. Zero means the particle never becomes active.',
  'Lifetime mode':
    'Fixed gives every particle the same lifetime. Random range samples a lifetime per particle. Infinite keeps particles alive until the effect is cleared or restarted; lifetime curves stay at 0%.',
  'Lifetime min':
    'One bound of the lifetime sampled for each new particle, in milliseconds. Shorter lifetimes reduce the number alive at once.',
  'Lifetime max':
    'The other bound of the sampled lifetime, in milliseconds. Different lifetimes make particles disappear at different moments.',
  Direction:
    'Initial movement direction. Angles use screen coordinates: 0° points right, 90° down, 180° left, and 270° up. Without this behavior, direction is random over a full circle.',
  'Direction mode':
    'Fixed uses one angle. Random range samples an angle per particle. Wave burst adds an angle step for each particle within the same wave.',
  Angle: 'Movement angle in degrees: 0° right, 90° down, 180° left, 270° up.',
  'Angle min': 'One bound of the randomly sampled direction, in degrees. For an upward cone, try 250° and 290°.',
  'Angle max':
    'The other bound of the randomly sampled direction, in degrees. A range from 0° to 360° spreads particles in all directions.',
  'Start angle': 'Direction of the first particle in a wave, in degrees.',
  'Angle per particle':
    'Angle added for each successive particle in a wave. For example, 12 particles with a 30° step form a full radial burst.',
  'Rotate with direction':
    'Aligns the particle view with its movement direction. The Rotation curve adds an offset to this angle.',
  Speed:
    'Movement speed over particle lifetime, in pixels per reference frame at 60 Hz. A value of 1 is about 60 pixels per second with a unit direction. Negative values move in the opposite direction.',
  Opacity:
    'Transparency over lifetime: 0 is invisible and 1 is fully opaque. Start at 0, rise to 1, then return to 0 for a fade in and out.',
  Rotation:
    'Rotation offset over particle lifetime, in degrees. This is an absolute angle curve, not angular velocity. When direction alignment is enabled, this offset is added to it.',
  Gravity:
    'Changes the vertical component of movement direction over time. Positive values bend motion downward, negative values upward. Speed also affects the resulting movement; a path overrides gravity.',
  Scale:
    'Size multiplier over particle lifetime. 1 uses the original texture size, 0.5 halves it, and 0 makes it invisible. Use separate axes to stretch the particle.',
  'Independent X / Y':
    'Edits horizontal and vertical scale with separate curves. Switching back to uniform scaling keeps the X-axis curve for both axes.',
  Color:
    'Tints the particle texture over its lifetime. Multiple color keys interpolate between six-digit hex colors. White preserves the original texture color.',
  'Path expression':
    'Defines local vertical displacement as a function of distance x. The path is rotated into the initial movement direction and takes precedence over gravity.',
  'y = f(x)':
    'Expression for the local path height, such as 35*sin(x/35). Use x for accumulated horizontal distance and math names such as sin, cos, PI and sqrt.',
  Easing:
    'Controls how values change between each pair of keyframes. Linear changes evenly; ease-in starts slowly; ease-out ends slowly. Easing applies separately to every segment.',
  'Random multiplier':
    'Samples one multiplier per particle for this numeric behavior. That multiplier scales the whole curve for the particle’s lifetime; it is not resampled every frame.',
  'Multiplier min':
    'One bound of the random curve multiplier. A range of 0.8 to 1.2 gives approximately 80% to 120% of the curve values.',
  'Multiplier max':
    'The other bound of the random curve multiplier. Use equal bounds for a constant multiplier or wider bounds for more variation.',
  'Keyframe time':
    'Position in a particle’s lifetime, from 0% at birth to 100% at death. Each key needs a unique time. Values before the first key and after the last key stay constant.',
  'Keyframe value':
    'Value of this behavior at the key’s lifetime percentage. One key makes a constant value; multiple keys interpolate using the selected easing.',
  'Keyframe color':
    'Tint at this lifetime percentage. Use six-digit hexadecimal colors such as #ff8800 when interpolating between multiple keys.',
  Origin:
    'The base spawn position. Shape coordinates are added to this origin. The preview draws coordinate (0, 0) at the canvas center.',
  'Position X':
    'Horizontal emitter origin in pixels. Positive values move right, negative values left. Export preserves this exact coordinate.',
  'Position Y':
    'Vertical emitter origin in pixels. Positive values move down, negative values up. Export preserves this exact coordinate.',
  'Show spawn guides':
    'Shows the origin marker and spawn shape outlines in the preview. Guides do not affect emission and are not part of the emitter configuration.',
  'Spawn guides': 'Shows the origin marker and spawn shape outlines in the preview. Does not affect particle behavior.',
  'Follow pointer':
    'Temporarily moves the preview emitter origin to your pointer. Leaving the canvas restores the configured origin. Exported coordinates stay unchanged.',
  'Spawn shapes':
    'Defines where particles appear relative to the origin. Multiple shapes are chosen with equal probability. Without a shape, particles spawn at the origin.',
  'Share position within wave':
    'All particles in a wave use the same sampled spawn position. When off, each particle samples its own position.',
  Geometry:
    'Point spawns at one coordinate. Rectangle fills an area. Torus samples a disk, ring or sector. Chain samples points along an open line through its vertices.',
  'Offset X':
    'Horizontal shape offset from the emitter origin, in pixels. For a rectangle this positions its starting corner; for a torus it positions its center.',
  'Offset Y': 'Vertical shape offset from the emitter origin, in pixels. Positive values move the shape down.',
  Width: 'Width of the rectangular spawn area, in pixels. Particles are sampled across its interior.',
  Height: 'Height of the rectangular spawn area, in pixels. Particles are sampled across its interior.',
  'Outer radius':
    'Outer edge of the torus spawn area, in pixels. Together with the inner radius it defines the ring thickness.',
  'Inner radius':
    'Inner edge of the torus spawn area, in pixels. Zero fills a disk; a positive radius leaves a hole in the center.',
  'Sector start':
    'Starting angle of the torus sector, in degrees. Angles run clockwise in screen coordinates: 0° right, 90° down.',
  'Sector end':
    'Ending angle of the torus sector, in degrees. Start 0° and end 360° make a complete circle; -90° to 0° selects the upper-right quarter.',
  'Blend mode':
    'Normal uses standard transparency. Add combines light for bright sparks and glows. Screen also lightens overlapping particles. This renderer setting is saved in projects only.',
  Background:
    'Canvas background color. Changes the preview scene without changing particle colors or the exported emitter configuration.',
  Grid: 'Shows a reference grid behind the particles. This is a preview-only aid.',
  Bloom:
    'Adds a soft halo around bright particles. Affects rendering only and may increase GPU work; it does not change the emitter configuration.',
  Zoom: 'Magnifies the preview without changing particle coordinates, speed or size in exported emitter settings. 1× means 100%.',
  'Playback speed':
    'Controls how fast simulation time advances in the preview. 0.5× is half speed and 2× is double speed. Does not change the exported emitter configuration.',
  'Random seed':
    'Controls the repeatable random sequence. The same seed, settings and simulation commands replay the same effect after Restart. Saved in projects, not in the emitter configuration.',
  'Save in this browser':
    'Automatically saves the current project in this browser’s local storage. Turning this off removes the saved copy; export a complete project to keep a portable file.',
};

export function getSettingHelp(label: string): string | undefined {
  if (/^Key \d+ time$/.test(label)) return descriptions['Keyframe time'];
  if (/^Key \d+ value$/.test(label)) return descriptions['Keyframe value'];
  if (/^Key \d+ color$/.test(label)) return descriptions['Keyframe color'];
  if (/^Point \d+ [XY]$/.test(label))
    return `Chain vertex coordinate relative to the emitter origin, in pixels. Vertices are connected in order without closing the chain. Longer segments receive proportionally more particles.`;
  return descriptions[label];
}
