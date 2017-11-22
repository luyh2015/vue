import Promise from 'bluebird';

export  function getCharLength(str) {
    var len = 0;
    for (var i = 0, strLen = str.length; i < strLen; i++) {
        var c = str.charCodeAt(i);
        //单字节加1
        if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
            len++;
        }
        else {
            len += 2;
        }
    }
    return len;
}

/**
 * 动态插入script标签，返回promise
 * @param {*} url: 要加载的代码url
 */
export function loadScript(url) {
    return new Promise((resolve, reject) => {
        var script = document.createElement("script");
        script.className = "dynamic-script";
        script.type = "text/javascript";
        if (script.readyState) { //IE
            script.onreadystatechange = function () {
                if (script.readyState == "loaded" || script.readyState == "complete") {
                    script.onreadystatechange = null;
                    resolve()
                }
            };
        } else { //Others
            script.onload = function () {
                return resolve()
            };
        }
        script.onerror = function () {
            return reject()
        }
        script.src = url;
        document.getElementsByTagName("script")[0].parentNode.appendChild(script);
    })
}
