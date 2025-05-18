/*global chrome*/

function clearFB() {
  document.querySelectorAll('[role="navigation"]')[2].remove();
  document.querySelectorAll('[role="complementary"]')[0].remove();
}

function removeAds(enableRemoveAds, enableRemoveSuggestionPosts, postKeywords) {
  let intervalId = null;
  let prevUrl = null;

  const onUrlChange = (cb) => {
    setInterval(() => {
      if (document.location.href !== prevUrl) {
        prevUrl = document.location.href;
        cb();
      }
    }, 50);
  };

  const trimAds = () => {
    const items = document.getElementsByClassName(
      "x1yztbdb x1n2onr6 xh8yej3 x1ja2u2z"
    );

    const removeSuggestionPosts = [
      "Gợi ý cho bạn",
      "Suggested for You",
      "Send message",
      "Follow",
      "Suggested for you",
      "Meta for Business",
    ];

    if (postKeywords) {
      removeSuggestionPosts.push(...postKeywords.split(","));
    }

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      // Hide all posts by default
      item.style.display = "none";

      // Only show posts that don't match removal criteria
      if (
        !(
          removeSuggestionPosts.some(
            (text) => item.innerHTML.indexOf(text) !== -1
          ) && enableRemoveSuggestionPosts
        )
      ) {
        item.style.display = "";
      } else {
        console.log("Removed post content:", item.textContent);
      }
    }
  };

  const trimAdsForRoot = () => {
    if (intervalId) {
      clearInterval(intervalId);
    }
    intervalId = setInterval(() => {
      clearInterval(intervalId);
      trimAds();
    }, 50);
  };

  const runAdsKiller = () => {
    trimAdsForRoot();
    window.addEventListener("scroll", trimAdsForRoot);
    window.addEventListener("resize", trimAdsForRoot);
    onUrlChange(trimAdsForRoot);
  };

  const init = () => {
    runAdsKiller();
  };

  init();
}

const changeSize = (size) => {
  // Change size content
  document.getElementsByClassName(
    "x193iq5w xvue9z xq1tmr x1ceravr"
  )[0].style.width = `${size}px`;
  // Change size header stories
  document.getElementsByClassName(
    "x193iq5w xgmub6v x1ceravr"
  )[0].style.width = `${size}px`;
};

function handleResponse() {
  chrome.storage.sync.get("facebookLite").then((response) => {
    const { facebookLite } = response || {};

    const { removeSuggestionPosts, postKeywords, postSize } =
      facebookLite || {};
    if (facebookLite.clearFB) {
      clearFB();
      if (postSize) {
        changeSize(postSize);
      }
    }
    removeAds(facebookLite.removeAds, removeSuggestionPosts, postKeywords);
  });
}

handleResponse();
