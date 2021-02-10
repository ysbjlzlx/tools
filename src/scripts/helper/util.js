/**
 * 为数组添加删除方法
 * @param b 接收一个数组元素
 * @return boolean
 */
Array.prototype.remove = function (b) {
  const a = this.indexOf(b);
  if (a >= 0) {
    this.splice(a, 1);
    return true;
  }
  return false;
};

/**
 * 为window.location 添加查询params的方法
 * @param b 接收一个字符串
 * @return null|string
 */
window.location.query = function (b) {
  const reg = new RegExp("(^|&|/?)" + b + "=([^&]*)(&|$)", "i");
  const r = window.location.href.substr(1).match(reg);
  if (r != null) return r[2];
  return null;
};

/**
 * Gets a param from the search part of a URL by name.
 * @link https://github.com/google/ioweb2015/blob/21d7a80aefd6a76474fcdb700ac9965cd4c7800f/app/scripts/helper/util.js#L142-L156
 * @param {string} param URL parameter to look for.
 *
 * @return {string|undefined} undefined if the URL parameter does not exist.
 */
function getURLParameter(param) {
  if (!window.location.search) {
    return;
  }
  const m = new RegExp(param + "=([^&]*)").exec(
    window.location.search.substring(1)
  );
  if (!m) {
    return;
  }
  return decodeURIComponent(m[1]);
}

/**
 * 为window.location 添加查询当前平台的方法
 * @return null|string
 */
window.location.platform = function () {
  let platform = null;
  const useragent = navigator.userAgent;
  const platforms = [
    "Windows NT",
    "Linux",
    "Macintosh",
    "Android",
    "iPhone",
    "iPod",
    "iPad",
    "Windows Phone",
  ];
  for (let i = 0; i <= platforms.length; i++) {
    if (useragent.indexOf(platforms[i]) > -1) {
      platform = platforms[i];
      break;
    }
  }
  return platform;
};
