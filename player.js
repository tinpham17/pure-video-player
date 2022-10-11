function initVideoPlayer(params) {
  const { target, source, adTarget, adSeconds = 4, adDuration = 60 } = params

  let playing = false

  const html = `
    <video class="player-video">
      <source src="${source}" type="video/mp4">
    </video>
    <div class="player-osd">
      <div class="player-seekbar">
        <input type="range" min="1" max="100" value="0" class="player-seekbar-input">
      </div>
      <div class="player-controls">
        <div class="player-main-button">
          <img src="images/play.svg" class="play-image"/>
          <img src="images/pause.svg" class="pause-image"/>
        </div>
        <div class="player-fullscreen-button">
          <img src="images/fullscreen.svg" class="fullscreen-image"/>
        </div>
      </div>
    </div>
  `

  const player = document.getElementById(target)
  player.classList.add("player")
  player.innerHTML = html

  const video = player.querySelector("video")
  const seekbar = player.querySelector(".player-seekbar")
  const seekbarInput = player.querySelector(".player-seekbar-input")
  const mainButton = player.querySelector(".player-main-button")
  const fullscreenButton = player.querySelector(".player-fullscreen-button")
  const anchor = player.querySelector(".anchor")

  const togglePlaying = () => {
    if (playing) {
      video.pause()
    } else {
      video.play()
    }
    mainButton.classList.toggle("playing")
    playing = !playing
  }

  video.onloadedmetadata = () => {
    const ad = document.getElementById(adTarget)
    if (ad) {
      ad.classList.add("hidden")

      const anchor = document.createElement('div')
      anchor.classList.add("anchor")
      anchor.style.left = `${(adSeconds * 100) / video.duration}%`
      seekbar.appendChild(anchor)
    }
  }

  video.ontimeupdate = (e) => {
    const percentage = (video.currentTime / video.duration) * 100
    seekbarInput.value = percentage
    seekbarInput.style.backgroundSize = `${percentage}% 100%`

    const ad = document.getElementById(adTarget)
    if (ad) {
      fragment = document.createDocumentFragment()
      fragment.appendChild(ad)
      player.appendChild(fragment)
      ad.style.position = "absolute"
      ad.style.top = "16px"
      ad.style.left = "16px"

      if (video.currentTime < adSeconds || video.currentTime > adDuration) {
        ad.classList.add("hidden")
      } else {
        ad.classList.remove("hidden")
      }
    }
  }

  seekbarInput.oninput = (e) => {
    const value = e.target.value
    const percentage = value / 100
    video.currentTime = video.duration * percentage
    seekbarInput.style.backgroundSize = `${value}% 100%`
  }

  mainButton.onclick = () => {
    togglePlaying()
  }

  video.onclick = () => {
    togglePlaying()
  }

  fullscreenButton.onclick = () => {
    player.classList.toggle("fullscreen")
  }
}
