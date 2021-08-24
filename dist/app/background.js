/*global chrome*/

(function () {
  const tabStorage = {};
  const networkFilters = {
    urls: ["*://www.facebook.com/*"],
  };

  chrome.webRequest.onBeforeRequest.addListener((details) => {
    const { tabId, requestId, url, timeStamp } = details;
    if (!tabStorage.hasOwnProperty(tabId)) {
      return;
    }

    tabStorage[tabId].requests[requestId] = {
      requestId: requestId,
      url: url,
      startTime: timeStamp,
      status: "pending",
    };
  }, networkFilters);

  chrome.webRequest.onCompleted.addListener((details) => {
    const { tabId, requestId, timeStamp } = details;
    if (
      !tabStorage.hasOwnProperty(tabId) ||
      !tabStorage[tabId].requests.hasOwnProperty(requestId)
    ) {
      return;
    }

    const request = tabStorage[tabId].requests[requestId];

    Object.assign(request, {
      endTime: timeStamp,
      requestDuration: timeStamp - request.startTime,
      status: "complete",
    });
  }, networkFilters);

  chrome.webRequest.onErrorOccurred.addListener((details) => {
    const { tabId, requestId, timeStamp } = details;
    if (
      !tabStorage.hasOwnProperty(tabId) ||
      !tabStorage[tabId].requests.hasOwnProperty(requestId)
    ) {
      return;
    }

    const request = tabStorage[tabId].requests[requestId];
    Object.assign(request, {
      endTime: timeStamp,
      status: "error",
    });
  }, networkFilters);

  chrome.tabs.onActivated.addListener((tab) => {
    const tabId = tab ? tab.tabId : chrome.tabs.TAB_ID_NONE;
    if (!tabStorage.hasOwnProperty(tabId)) {
      tabStorage[tabId] = {
        id: tabId,
        requests: {},
        registerTime: new Date().getTime(),
      };
    }
  });

  chrome.tabs.onRemoved.addListener((tab) => {
    const tabId = tab.tabId;
    if (!tabStorage.hasOwnProperty(tabId)) {
      return;
    }
    tabStorage[tabId] = null;
  });

  chrome.runtime.onMessage.addListener((msg, sender, response) => {
    console.log(msg);
    switch (msg.type) {
      case "init":
        response(tabStorage[msg.tabId]);
        break;
      case "clearFB":
        try {
          chrome.tabs.executeScript(msg.tabId, { file: "app/clearFB.js" });
          response(true);
        } catch (error) {
          response(false);
        }
        break;
      case "removeAds":
        try {
          chrome.tabs.executeScript(msg.tabId, { file: "app/removeAds.js" });
          response(true);
        } catch (error) {
          response(false);
        }
        break;
      default:
        response("unknown request");
        break;
    }
  });
})();
