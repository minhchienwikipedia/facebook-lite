/*global chrome*/

function clearFB() {
  document
    .getElementsByClassName(
      "rq0escxv lpgh02oy du4w35lb o387gat7 qbu88020 pad24vr5 rirtxc74 dp1hu0rb fer614ym ni8dbmo4 stjgntxs be9z9djy hlyrhctz"
    )[0]
    .remove();
  document
    .getElementsByClassName(
      "rq0escxv lpgh02oy du4w35lb o387gat7 qbu88020 pad24vr5 rirtxc74 dp1hu0rb fer614ym ni8dbmo4 stjgntxs rek2kq2y be9z9djy bx45vsiw"
    )[0]
    .remove();
  document
    .querySelectorAll(
      ".rq0escxv.l9j0dhe7.du4w35lb.j83agx80.cbu4d94t.qowsmv63.dp1hu0rb"
    )
    .forEach(function (a) {
      a.remove();
    });
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
    const feeds = [].slice.call(rootEl.children || []).filter((child) => {
      return child.hasAttribute("data-pagelet");
    });
    feeds.forEach((feed, i) => {
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
    });
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
  let post = null;
  const els = document.getElementsByClassName("j83agx80 btwxx1t3 taijpn5t");
  const stores = document.getElementsByClassName(
    "d2edcug0 e3xpq0al v8c10jal ejjq64ki"
  )[0];

  Array.prototype.forEach.call(els, function (el) {
    // Do stuff here

    if (el.className === "j83agx80 btwxx1t3 taijpn5t") {
      post = el;
      var css = `.d2edcug0.oh7imozk.abvwweq7.ejjq64ki {width: ${size}px;}
      .d2edcug0.e3xpq0al.v8c10jal.ejjq64ki {width: ${size}px;}
      `,
        head = post;
      const style = document.createElement("style");
      stores.appendChild(style);
      head.appendChild(style);

      style.type = "text/css";
      if (style.styleSheet) {
        // This is required for IE8 and below.
        style.styleSheet.cssText = css;
      } else {
        style.appendChild(document.createTextNode(css));
      }
    }
  });
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
  }, 1000);
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
