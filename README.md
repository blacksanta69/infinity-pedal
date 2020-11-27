# Mac OS X [Infinity Foot Control](https://www.amazon.ca/Infinity-Digital-Control-Computer-USB2/dp/B002MY6I7G/r) Pedal Bindings for nodejs with HID

Bind foot pedals to any key supported by [RobotJS](https://robotjs.io/docs/syntax#keys). Specify the appropriate vendor and product ID for the foot pedal to select the USB HID. The default is already set for the current edition of the pedal.

By default, this is set to use the keyboard media keys audio_prev, audio_pause and audio_next. Step and holding the forward/ back keys will jog forward/ back instead of skipping on many systems.

# Usage

- `$ npm install -g blacksanta69/infinity-pedal`
- `$ infinity-pedal --keys audio_prev audio_pause audio_next --vendorId 1523 --productId 255`

# License

MIT
