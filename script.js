(function () {
  "use strict";

  var video = document.getElementById("heroVideo");

  var chapters = {
    "home":         0,    // 0:00
    "about-us":     240,  // 4:00
    "our-services": 360,  // 6:00
    "contact-us":   540   // 9:00
  };

  // ── Video setup ──────────────────────────────────────────────────────────────
  // The video starts muted+autoplay (required by all modern browsers).
  // On the first menu click we unmute; if the browser still blocks sound
  // we silently fall back to muted so playback always works.

  function playVideo() {
    if (!video) return;
    var p = video.play();
    if (p && typeof p.catch === "function") {
      p.catch(function () {
        // Autoplay blocked even when muted — try once more after a tick
        setTimeout(function () { video.play(); }, 100);
      });
    }
  }

  // Kick off autoplay as soon as the DOM is ready
  if (video) {
    video.muted = true;
    playVideo();
  }

  // ── Chapter jumping ───────────────────────────────────────────────────────────
  function jumpTo(chapter) {
    if (!video) return;
    if (!(chapter in chapters)) return;

    // Seek
    video.currentTime = chapters[chapter];

    // Try to unmute on real user gesture
    video.muted = false;
    var p = video.play();
    if (p && typeof p.catch === "function") {
      p.catch(function () {
        // Browser still blocking unmuted play — keep muted and continue
        video.muted = true;
        video.play();
      });
    }

    // Update active state on all nav links
    document.querySelectorAll("[data-chapter]").forEach(function (el) {
      el.classList.toggle("is-active", el.dataset.chapter === chapter);
    });
  }

  // ── Event listeners ───────────────────────────────────────────────────────────
  document.querySelectorAll("[data-chapter]").forEach(function (el) {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      jumpTo(el.dataset.chapter);
    });
  });

}());
