/*global chrome*/

function clearFB() {
  document.querySelectorAll('[role="navigation"]')[2].remove();
  document.querySelectorAll('[role="complementary"]')[0].remove();
}

function removeAds(enableRemoveAds, enableRemoveSuggestionPosts) {
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

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (
        (item.innerHTML.indexOf("Gợi ý cho bạn") !== -1 ||
          item.innerHTML.indexOf("Suggested for You") !== -1 ||
          item.innerText.indexOf("Send message") !== -1 ||
          item.innerHTML.indexOf("Suggested for you") !== -1) &&
        enableRemoveSuggestionPosts
      ) {
        console.log("remove suggestion posts");
        item.remove();
        continue;
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

    const { removeSuggestionPosts, postSize } = facebookLite || {};
    if (facebookLite.clearFB) {
      clearFB();
      if (postSize) {
        changeSize(postSize);
      }
    }
    removeAds(facebookLite.removeAds, removeSuggestionPosts);
  });
}

handleResponse();
