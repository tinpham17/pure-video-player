# pure-video-player

Please clone the repo and open index.html in web brower to see it running.

## Sample use

```
initVideoPlayer({
  target: "player2",
  source: "https://static.videezy.com/system/resources/previews/000/035/849/original/WL057.mp4",
  adTarget: "ad1",
  adSeconds: 4,
  adDuration: 10
})
```

## Parameters

`target` (mandatory): id of the element to be transformed into video player.

`source` (mandatory): mp4 or ogg video source

`adTarget`: id of the ad element to be displayed at a given point of time of the video

`adSeconds`: the second when the ad is displayed

`adDuration`: how many seconds the ad is visible
