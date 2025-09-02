function getCookie(name){
    const cookieName = name + "="
    const decodedCookie = decodeURIComponent(document.cookie);
    const allCookies = decodedCookie.split(";")
    
    for (let cookie of allCookies) {
        cookie = cookie.trim()
        if (cookie.indexOf(cookieName) === 0){
            return true
        }
    }
    return false
}