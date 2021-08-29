/*global chrome*/

(function () {
  let currentUrl = null;
  chrome.tabs.onUpdated.addListener((tabId, info) => {
    if (info.status === "complete") {
      chrome.storage.sync.get("facebookLite", (data) => {
        chrome.tabs.get(tabId, function (res) {
          currentUrl = res.url;
          if (
            currentUrl === "https://www.facebook.com/" ||
            currentUrl === "https://www.facebook.com"
          ) {
            chrome.tabs.sendMessage(tabId, {
              type: "activeFacebookLite",
              currentUrl,
              facebookLiteStorage: data.facebookLite || {
                clearFB: true,
                removeAds: true,
                removeSuggestionPosts: true,
              },
            });
          }
        });
      });
    }
  });
})();
