$(document).ready(function () {
	//changes the redirect site				
    $("#redirect").click(function () {
        BLOCKER.setRedirect($("#redirectHere").val());
    });
	//adds a site to the blocked list		
    $("#block").click(function () {
		BLOCKER.addBlockedSite($("#blockThis").val());
        showBlockList();
    });
	//removes a site from  blocked list		
	$("#unblock").click(function () {
        BLOCKER.removeBlockedSite($("#unblockThis").val());
        showBlockList();
    });
    showBlockList();
});
		
//shows the sites that are blocked and displays a remove button for each site		
function showBlockList () {
    $("#blocklist").children().remove();
    var i=1;
    $.each(BLOCKER.getBlockedSites(), function (index, value) {
				
		$("#blocklist").append("<li id='site-"+i+"'> <input type='button' class='pure-button button-remove' id='unblock-"+i+"' value='unblock' /> " + index + "</li>");
		$("#unblock-"+i).click(function () {
			BLOCKER.removeBlockedSite(index);
			showBlockList();
		});
		i++;
    });
}