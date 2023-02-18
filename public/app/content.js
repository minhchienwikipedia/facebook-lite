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
      "x9f619 x1n2onr6 x1ja2u2z x2bj2ny x1qpq9i9 xdney7k xu5ydu1 xt3gfkd xh8yej3 x6ikm8r x10wlt62 xquyuld"
    );

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const svgs = item.getElementsByTagName("svg");
      for (let j = 0; j < svgs.length; j++) {
        const element = svgs[j];
        if (
          element.innerHTML ===
          '<use xlink:href="#gid103" xmlns:xlink="http://www.w3.org/1999/xlink"></use>'
        ) {
          item.remove();
        }
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
