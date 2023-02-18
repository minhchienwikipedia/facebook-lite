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
      if (
        (item.innerHTML.indexOf("Gợi ý cho bạn") !== -1 ||
          item.innerHTML.indexOf("Suggested for You") !== -1 ||
          item.innerHTML.indexOf("Suggested for you") !== -1) &&
        enableRemoveSuggestionPosts
      ) {
        item.remove();
        continue;
      }
      const svgs = item.getElementsByTagName("svg");
      for (let j = 0; j < svgs.length; j++) {
        const element = svgs[j];
        if (getStyle(element, "width") === "61.0625px" && enableRemoveAds) {
          item.remove();
        }
      }
    }
  };

  function getStyle(el, styleProp) {
    var value,
      defaultView = (el.ownerDocument || document).defaultView;
    // W3C standard way:
    if (defaultView && defaultView.getComputedStyle) {
      // sanitize property name to css notation
      // (hypen separated words eg. font-Size)
      styleProp = styleProp.replace(/([A-Z])/g, "-$1").toLowerCase();
      return defaultView.getComputedStyle(el, null).getPropertyValue(styleProp);
    } else if (el.currentStyle) {
      // IE
      // sanitize property name to camelCase
      styleProp = styleProp.replace(/\-(\w)/g, function (str, letter) {
        return letter.toUpperCase();
      });
      value = el.currentStyle[styleProp];
      // convert other units to pixels on IE
      if (/^\d+(em|pt|%|ex)?$/i.test(value)) {
        return (function (value) {
          var oldLeft = el.style.left,
            oldRsLeft = el.runtimeStyle.left;
          el.runtimeStyle.left = el.currentStyle.left;
          el.style.left = value || 0;
          value = el.style.pixelLeft + "px";
          el.style.left = oldLeft;
          el.runtimeStyle.left = oldRsLeft;
          return value;
        })(value);
      }
      return value;
    }
  }

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
