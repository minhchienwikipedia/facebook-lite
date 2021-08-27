(function () {
  setTimeout(() => {
    let rootEl = null;
    let intervalId = null;
    let prevUrl = null;

    const throttle = (func, limit) => {
      let inThrottle;
      return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
          func.apply(context, args);
          inThrottle = true;
          setTimeout(() => {
            inThrottle = false;
          }, limit);
        }
      };
    };

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
            doHack(feed) ||
            feed.innerHTML.indexOf("Gợi ý cho bạn") !== -1 ||
            feed.innerHTML.indexOf("Suggested for You") !== -1 ||
            feed.innerHTML.indexOf("Suggested for you") !== -1
          ) {
            // console.log('killed', feed.querySelector('h4 span'));
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
      const throttleKill = throttle(trimAdsForRoot, 50);
      trimAdsForRoot();
      window.addEventListener("scroll", trimAdsForRoot);
      window.addEventListener("resize", trimAdsForRoot);
      onUrlChange(trimAdsForRoot);
    };

    const init = () => {
      runAdsKiller();
    };

    init();
  }, 3000);
})();
