//load functions that need to be updated
function load(){  
    updateButtons();
	updateCurrentTime();
	setInterval(updateCurrentTime, 250);
	setInterval(updateButtons, 250);
}

$(document).ready(function(){
	//opens  the option page in a chrome tab
	$("#options").click(function () {
		chrome.tabs.create({'url': "/options.html" } )
    });
	
	//starts the blocker
    $("#start").click(function() {
		if(BLOCKER.getActive() !== "start"){
			BLOCKER.setActive($("#start").val());
			BLOCKER.setStatus("focus");
			var focusTime = $("#focus").val() * 1000 * 60;
			var restTime = $("#rest").val() * 1000 * 60;
			$("#stop").prop('disabled', true);
			$("#start").prop('disabled', true);
			chrome.extension.getBackgroundPage().focusTime(focusTime, restTime);
		}else{}
	});
	
	//stops the blocker. Can only be activated during a rest period. 
	$("#stop").click(function(){
		if(BLOCKER.getActive() === "start"){
			BLOCKER.setActive($("#stop").val());
			BLOCKER.setStatus("off");
			$("#start").prop('disabled', false);
			chrome.extension.getBackgroundPage().stop();
		}
	});
	
	load();
});

//update current time
function updateCurrentTime() {
  var now = new Date();
  var hh = now.getHours();
  var mm = now.getMinutes();
  var ss = now.getSeconds();
  var str = '';
  if (hh % 12 == 0) {
    str += '12';
  } else {
    str += (hh % 12);
  }
  str += ':';
  if (mm >= 10) {
    str += mm;
  } else {
    str += '0' + mm;
  }
  str += ':';
  if (ss >= 10) {
    str += ss;
  } else {
    str += '0' + ss;
  }
  if (hh >= 12) {
    str += " PM";
  } else {
    str += " AM";
  }
  $("#current_time").text(str);
}

//update if buttons are active or not
function updateButtons(){
  if(BLOCKER.getStatus() === "focus"){
	$("#stop").prop('disabled', true);
	$("#start").prop('disabled', true);
	$("#focus").prop('disabled',true);
	$("#rest").prop('disabled',true);
  }
  
  if(BLOCKER.getStatus() === "rest"){
	 $("#start").prop('disabled', true);
	 $("#stop").prop('disabled', false);
	 $("#focus").prop('disabled',true);
	 $("#rest").prop('disabled',true);
  }
  
  if(BLOCKER.getStatus() === "off"){
	 $("#stop").prop('disabled', false);
	 $("#start").prop('disabled', false);
	 $("#focus").prop('disabled',false);
	 $("#rest").prop('disabled',false);
  }
}
