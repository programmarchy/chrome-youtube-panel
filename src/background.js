chrome.tabs.onUpdated.addListener(function (tabId, updateInfo, tab) {
  if (isYouTubeTab(tab)) {
    chrome.pageAction.show(tabId)
  } else {
    chrome.pageAction.hide(tabId)
  }
})

var YOUTUBE_URL_REGEX = /https:\/\/www\.youtube\.com\/watch\?v=([^&]*).*/

function isYouTubeTab(tab) {
  if (tab.url) {
    return isYouTubeUrl(tab.url)
  } else {
    return false
  }
}

function isYouTubeUrl(url) {
  return YOUTUBE_URL_REGEX.test(url)
}

function getYouTubeInfo(tab) {
  if (!tab.url) {
    return null
  }
  var result = tab.url.match(YOUTUBE_URL_REGEX)
  if (null != result) {
    return {
      title: tab.title,
      code: result[1],
      width: 560,
      height: 315
    }
  } else {
    return null
  }
}

function getYouTubeEmbedUrl(info) {
  var code = encodeURIComponent(info.code)
  var title = encodeURIComponent(info.title)
  var url = 'embed.html?code=' + code + '&title=' + title
  return chrome.extension.getURL(url)
}

chrome.pageAction.onClicked.addListener(function (tab) {
  showYouTubePanel(tab)
})

function getWindowType() {
  // If panels are not available, then the window should
  // open as a normal popup.
  return 'panel'
}

function showYouTubePanel(tab) {
  var info = getYouTubeInfo(tab)
  if (null != info) {
    var embedUrl = getYouTubeEmbedUrl(info)
    chrome.windows.create({
      type: getWindowType(),
      url: embedUrl,
      left: 0,
      top: 0,
      width: info.width,
      height: info.height
    })
  }
}
