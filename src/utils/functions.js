/*global chrome*/
export function getCurrentTab(callback) {
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true,
    },
    (tabs) => {
      callback(tabs[0]);
    }
  );
}

export const dispatch = (eventName, callback = () => {}) => {
  getCurrentTab((tab) => {
    chrome.runtime.sendMessage(
      { type: eventName, tabId: tab.id },
      (response) => {
        callback({ ...response, ...tab });
      }
    );
  });
};
