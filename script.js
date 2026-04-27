const video = document.getElementById("heroVideo");

const timestamps = {
  "home": 0,           // 0:00
  "about-us": 240,    // 4:00
  "our-services": 360, // 6:00
  "contact-us": 540   // 9:00
};

function jumpToChapter(chapter) {
  if (!video || !(chapter in timestamps)) return;

  video.currentTime = timestamps[chapter];

  // Unmute on first user interaction (autoplay requires muted, but clicks are real gestures)
  video.muted = false;

  const playAttempt = video.play();
  if (playAttempt && typeof playAttempt.catch === "function") {
    playAttempt.catch(() => {
      // If unmuted play is blocked, fall back to muted
      video.muted = true;
      video.play();
    });
  }

  document.querySelectorAll("[data-video-jump]").forEach(link => {
    link.classList.toggle("is-active", link.dataset.videoJump === chapter);
  });
}

document.querySelectorAll("[data-video-jump]").forEach(link => {
  link.addEventListener("click", event => {
    event.preventDefault();
    jumpToChapter(link.dataset.videoJump);
  });
});
