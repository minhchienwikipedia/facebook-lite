/*global chrome*/

function clearFB() {
  document.querySelectorAll('[role="navigation"]')[2].remove();
  document.querySelectorAll('[role="complementary"]')[0].remove();
}

function removeAds(enableRemoveAds, enableRemoveSuggestionPosts) {
  let rootEl = null;
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

  const doHack = (feed) => {
    // 1. Find this unique block inside the feed
    const spanWithId = feed.querySelector("span[id]");

    if (!spanWithId) return;

    const spanChildren = spanWithId.children;

    // 2. Check if the second child of spanWithId is not a DIV element
    if (spanChildren && spanChildren.length) {
      if (spanChildren[1]) {
        // if(spanChildren[1].nodeName !== 'SPAN') console.log(spanChildren[1].nodeName);

        return spanChildren[1].nodeName !== "SPAN";
      }
    }
  };

  const trimAds = () => {
    const feeds = document.getElementsByClassName(
      "g4tp4svg mfclru0v om3e55n1 p8bdhjjv"
    );

    for (let i = 0; i < feeds.length; i++) {
      const feed = feeds[i];
      try {
        if (
          ((doHack(feed) ||
            feed.innerText.replace(/-/g, "").indexOf("Sponsored") !== -1) && // Add more your language translation right here!
            enableRemoveAds) ||
          ((feed.innerHTML.indexOf("Gợi ý cho bạn") !== -1 ||
            feed.innerHTML.indexOf("Suggested for You") !== -1 ||
            feed.innerHTML.indexOf("Suggested for you") !== -1) &&
            enableRemoveSuggestionPosts)
        ) {
          feed.style.display = "none";
        }
      } catch (e) {}
    }
  };

  const trimAdsForRoot = () => {
    rootEl = null;
    if (intervalId) {
      clearInterval(intervalId);
    }
    intervalId = setInterval(() => {
      if (!rootEl) {
        rootEl = document.querySelector('[role="feed"]');
      } else {
        clearInterval(intervalId);
        trimAds();
      }
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
  const mainClassName = "x193iq5w xvue9z xq1tmr x1ceravr";
  document.getElementsByClassName(mainClassName)[0].style.width = `${size}px`;
  document.getElementsByClassName(mainClassName)[1].style.width = `${size}px`;
};

function handleResponse(response) {
  const { facebookLiteStorage } = response || {};

  const { removeSuggestionPosts, postSize } = facebookLiteStorage || {};
  setTimeout(() => {
    if (facebookLiteStorage.clearFB) {
      clearFB();
      if (postSize) {
        changeSize(postSize);
      }
    }
  }, 300);
  removeAds(facebookLiteStorage.removeAds, removeSuggestionPosts);
}

chrome.runtime.onMessage.addListener((msg, sender, response) => {
  switch (msg.type) {
    case "activeFacebookLite": {
      handleResponse(msg);
      break;
    }
    default:
      response("unknown request");
      break;
  }
});
