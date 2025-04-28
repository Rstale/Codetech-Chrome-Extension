 
let timeData = {};
let activeTabUrl = null;
let startTime = null;

chrome.webNavigation.onCommitted.addListener((details) => {
  if (details.frameId === 0) {
    const url = new URL(details.url).hostname;
    if (activeTabUrl !== url) {
      if (activeTabUrl && startTime) {
        const timeSpent = (Date.now() - startTime) / 1000;
        timeData[activeTabUrl] = (timeData[activeTabUrl] || 0) + timeSpent;
        saveTimeData();
      }
      activeTabUrl = url;
      startTime = Date.now();
    }
  }
});

chrome.tabs.onActivated.addListener(() => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]?.url) {
      const url = new URL(tabs[0].url).hostname;
      if (activeTabUrl !== url) {
        if (activeTabUrl && startTime) {
          const timeSpent = (Date.now() - startTime) / 1000;
          timeData[activeTabUrl] = (timeData[activeTabUrl] || 0) + timeSpent;
          saveTimeData();
        }
        activeTabUrl = url;
        startTime = Date.now();
      }
    }
  });
});

function saveTimeData() {
  chrome.storage.local.set({ timeData });
}


chrome.storage.local.get(['timeData'], (result) => {
  timeData = result.timeData || {};
});


setInterval(() => {
  const now = new Date();
  if (now.getHours() === 0 && now.getMinutes() === 0) {
    timeData = {};
    chrome.storage.local.set({ timeData });
  }
}, 60000);