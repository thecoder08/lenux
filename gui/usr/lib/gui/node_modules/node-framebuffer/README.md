# Framebuffer
A library for interacting with the Linux framebuffer API.
## Usage
After installing, you can use Framebuffer like so:
```javascript
// import Framebuffer and colors from node-framebuffer
var { Framebuffer, colors } = require('node-framebuffer');

// create a new Framebuffer instance with height, width, and depth (number of bytes per pixel)
var fb = new Framebuffer('/dev/fb0', 1920, 1080, 4);

// plot a blue pixel at (100, 100)
fb.plot(100, 100, colors.blue);

// clear the screen
fb.clear();

// draw a blue 50px radius circle with center at (100, 100)
fb.circle(100, 100, 50, colors.blue);

// draw a blue 50x50 rectangle to (100, 100)
fb.rectangle(100, 100, 50, 50, colors.blue);

// draw a blue line from (50, 50) to (100, 100)
fb.line(50, 50, 100, 100, colors.blue);
```
