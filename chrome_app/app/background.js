chrome.browserAction.onClicked.addListener(function(tab) {
  console.log('Parsing');
  chrome.tabs.executeScript(null, {file: "app/bower_components/zepto/zepto.min.js"});
  chrome.tabs.executeScript(null, {file: "app/ScheduleParserChrome.js"});
});