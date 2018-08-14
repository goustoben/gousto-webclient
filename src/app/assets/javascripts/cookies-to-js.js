var cookiesToJs = function() {
    var cookieList = document.cookie.split(';').reduce(function(cookieData, currentCookie) {
        var splitCookieFromName = currentCookie.split('=');
        var cookieName = String(splitCookieFromName[0]).trim();
        cookieData[cookieName] = decodeURIComponent(splitCookieFromName[1]);
        return cookieData;
    }, {});

    return cookieList;
};
