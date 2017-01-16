var focusTimer;
var breakTimer;

//Handles session managment
var SM = (function () {

    var my = {};

    my.get = function (key) {
        return localStorage.getItem(key);
    }
    my.put = function (key, value) {
        return localStorage.setItem(key, value);
    }
    my.delete = function (key) {
        return localStorage.removeItem(key);
    }
    
    return my;

}());

//creats a blocker object that provides common functionality for other scripts.
var BLOCKER = (function (SM) {
    var my = {};

    my.blockTheseSites = {
        "facebook.com"      : "",
        "reddit.com"        : "",
        "twitter.com"       : "",
        "snapchat.com"      : "",
        "instagram.com"     : "",
		"tumblr.com" 		: "",
		"netflix.com"       : "",
		"imgur.com"         : "",
		"amazon.com"        : "",
		"youtube.com"       : "",
		"hulu.com"          : "",
		"imdb.com"          : "",
		"espn.com"          : ""
		
		
		
    }
    
    if (!SM.get("blocklist")) {
		var list = JSON.stringify(my.blockTheseSites);
        SM.put("blocklist", list);
    }
	
	if(!SM.get("instead")){
		var redirect = chrome.extension.getURL("instead.html");
		SM.put("instead", redirect);
	}
    
    my.getBlockedSites = function () {
        return JSON.parse(SM.get("blocklist"));
    }
    
    my.setRedirect = function (value) {
        var prot = /^http|chrome-extension/i;
        if (value.match(prot)) {
            SM.put("instead", value);
        } else {
            SM.put("instead", "http://" + value);
        }
        return SM.get("instead");
    }

    my.getRedirect = function () {
        return SM.get("instead");        
    }
    
    my.addBlockedSite = function (site) {
        my.blockedSites = JSON.parse(SM.get("blocklist"));
        my.blockedSites[site] = "Custom Add";
        SM.put("blocklist", JSON.stringify(my.blockedSites));
    }

    my.removeBlockedSite = function (site) {
        my.blockedSites = JSON.parse(SM.get("blocklist"));
        delete my.blockedSites[site];
        SM.put("blocklist", JSON.stringify(my.blockedSites));
    }
	
    my.setActive = function(active){
		SM.put("active",active)
		return active;
	}
	
	my.getActive = function() {
		return SM.get("active");
	}
	
	my.setStatus = function(stat){
		SM.put("status",stat);
		return stat;
	}
	
	my.getStatus = function(){
		return SM.get("status");
	}
	
    return my;
}(SM));

//controlls the timer for when the extension is active and focus time is on
function focusTime(f, r){
	if(BLOCKER.getStatus("status") === "focus" && BLOCKER.getActive() == "start"){
		alert("Focus Time");
		chrome.browserAction.setBadgeBackgroundColor({color: "#00ff00"});
		chrome.browserAction.setBadgeText({text: " "});
		focusTimer = setTimeout(function(){
			BLOCKER.setStatus("rest");
			chrome.extension.getBackgroundPage().restTime(f,r);
		}, f);
	}
}
//controlls the timer for when the extension is active and rest time is on
function restTime(f, r){
	alert("Rest Time");
	if(BLOCKER.getStatus("status") === "rest" && BLOCKER.getActive() == "start"){
		chrome.browserAction.setBadgeBackgroundColor({color: "#0000ff"});
		chrome.browserAction.setBadgeText({text: " "});
		restTimer = setTimeout(function(){
			BLOCKER.setStatus("focus");
			chrome.extension.getBackgroundPage().focusTime(f,r);
		}, r);
	}
}

//clear the timer for both the focus and rest timers
function stop(){
	chrome.browserAction.setBadgeText({text: ""});
	clearTimeout(focusTimer);
	clearTimeout(restTimer);
}

