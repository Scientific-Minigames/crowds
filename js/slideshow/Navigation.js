/*************************

Giant "everything" class that handles all the misc UI:
navigation, modal dialogues, audio, etc

*************************/
function Navigation(){

	var self = this;

	// Navigation buttons
	var nav_buttons = $all("#navigation > div");
	nav_buttons.forEach(function(nav){

		// Show label bubble
		(function(nav){
			nav.onmouseover = function(){
				_showBubble(nav);
			};
			nav.onmouseout = function(){
				_hideBubble();
			};
		})(nav);

		// If it's a chapter, when you click it, go to that chapter!
		var chapter = nav.getAttribute("chapter");
		if(chapter){
			(function(nav, chapter){
				nav.onclick = function(){
					publish("sound/button");
					slideshow.gotoChapter(chapter);
				};
				_stopPropButton(nav);
			})(nav, chapter);
		}

		// If it's a modal...
		var modal = nav.getAttribute("modal");
		if(modal){
			(function(nav, modal){
				nav.onclick = function(){
					publish("sound/button");
					publish("modal/"+modal);
				};
				_stopPropButton(nav);
			})(nav, modal);
		}

	});
	subscribe("slideshow/goto/",function(chapterID){

		nav_buttons.forEach(function(nav){
			var chapter = nav.getAttribute("chapter");
			if(chapter==chapterID){
				nav.setAttribute("highlight", true);
			}else{
				nav.removeAttribute("highlight");
			}
		});

	});
}