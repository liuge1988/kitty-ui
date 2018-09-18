/**
 * 嵌套页面IFrame模块
 */

/**
 * 嵌套页面URL地址
 * @param {*} url
 */
export function getIFrameUrl (url) {
  let iframeUrl = ''
  if(/^iframe:.*/.test(url)) {
    iframeUrl = url.replace('iframe:', '')
  } else if(/^http[s]?:\/\/.*/.test(url)) {
    iframeUrl = url.replace('http://', '')
    iframeUrl = iframeUrl.replace('https://', '')
  }
  return iframeUrl
}

