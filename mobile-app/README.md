# Cricket Management Pro Mobile

This is a clean Expo starter for the mobile and streaming companion app.

## Run

```bash
cd mobile-app
npm install
npm start
```

The app includes:

- live score controls
- score overlay on the stream player
- HLS/MP4 stream preview support through `expo-video`
- telecast destination details for YouTube Live, Facebook Live, Twitch, and custom RTMP

RTMP publishing still requires an encoder or backend service. A React Native app can show destination details, but direct multi-platform restreaming should be handled by a streaming server or provider.
