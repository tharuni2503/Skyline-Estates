# Footage status: scroll-controlled property film

The film has six scenes (`src/components/home/ScrollVideo.tsx`). Only the first two have real footage.

| Scene | Title | Status | File(s) to add in `public/videos/` | Duration | Aspect / resolution | Section |
|---|---|---|---|---|---|---|
| 01 | The Arrival | REAL (shares `scrub.mp4`) | none | - | 16:9, 1280x720 | Scroll film, 0-17% |
| 02 | The Approach | REAL (shares `scrub.mp4`) | none | - | 16:9, 1280x720 | Scroll film, 17-33% |
| 03 | The Garden | STORYBOARD PANEL (no image) | `garden-pool.mp4`, `garden-pool-scrub.mp4`, `garden-pool-scrub-mobile.mp4`, `film-4-garden.jpg` | 8-12 s | 16:9, master 1920x1080 | Scroll film, 33-50% |
| 04 | The Living Space | STORYBOARD PANEL (no image) | `living-room.mp4`, `living-room-scrub.mp4`, `living-room-scrub-mobile.mp4`, `film-5-living.jpg` | 8-12 s | 16:9, master 1920x1080 | Scroll film, 50-67% |
| 05 | The Details | STORYBOARD PANEL (no image) | `interiors.mp4`, `interiors-scrub.mp4`, `interiors-scrub-mobile.mp4`, `film-6-details.jpg` | 10-14 s | 16:9, master 1920x1080 | Scroll film, 67-83% |
| 06 | The Final Reveal | STILL (hero-poster.jpg), labelled | `wide-finale.mp4`, `wide-finale-scrub.mp4`, `wide-finale-scrub-mobile.mp4`, `film-7-finale.jpg` | 8-10 s | 16:9, master 1920x1080 | Scroll film, 83-100% |
| - | Opening film (optional) | optional | `hero-alt.mp4` | 10-15 s | 16:9, 1920x1080 | Intro/hero, so it is not the same shot as the film |

Scenes 03-05 show a storyboard panel (outlined scene number, no picture) labelled "Footage for this scene is in production".
Scene 06 shows a real still (`hero-poster.jpg`) labelled as a still. Scenes 01 and 02 use different frames of the one real shot.
The same villa is never presented as a pool, living room or interior, and nothing is presented as video that is not video.

All clips: H.264 (High), yuv420p, no audio, 30 fps, `-movflags +faststart`, one property, continuous story.
The scrub encodes seek instantly because every 3rd/4th frame is a keyframe:

```bash
# desktop scrub (about 5 MB per 13 s)
ffmpeg -i garden-pool.mp4 -an -vf scale=1280:720 -c:v libx264 -profile:v high -preset slow -crf 29 -g 3 -keyint_min 3 -sc_threshold 0 -pix_fmt yuv420p -movflags +faststart garden-pool-scrub.mp4
# mobile scrub (about 3 MB per 13 s)
ffmpeg -i garden-pool.mp4 -an -vf scale=960:540 -c:v libx264 -profile:v main -preset slow -crf 29 -g 4 -keyint_min 4 -sc_threshold 0 -pix_fmt yuv420p -movflags +faststart garden-pool-scrub-mobile.mp4
```

## Wiring a finished scene
In `LAYERS` at the top of `ScrollVideo.tsx`, change that scene's layer to `kind: "video"` and add `src` / `lite` / `still`:

```ts
{ id: "garden", kind: "video", src: "/videos/garden-pool-scrub.mp4", lite: "/videos/garden-pool-scrub-mobile.mp4", still: "/videos/film-4-garden.jpg", from: 1 / 3, to: 1 / 2 },
```
The on-screen label disappears automatically. If a video fails to load, only that scene falls back to its still. Clips are only downloaded when the visitor is within ~10% scroll of them.
