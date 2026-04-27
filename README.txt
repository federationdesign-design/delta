Delta build export

1. Add your video file here:
   assets/delta-video.mp4

2. Open index.html in a browser.

Menu timestamp behavior:
- Home: 0:00
- About Us: 4:00
- Our Services: 6:00
- Contact Us: 9:00

The menu links call video.currentTime and then video.play(), so they work for both forward jumps and rewinding.
