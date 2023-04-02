SLIDES.push(

{
	chapter: "Preloader",

	add:[

		// Splash
		{
			type:"sim",
			x:960/2, y:540/2,
			fullscreen: true,
			network: SPLASH_NETWORK,
			options:{
				splash: true,
				randomStart: 20
			}
		},

		// Words
		{
			type:"box",
			id:"title",
			text:"preloader_title", x:180, y:125, w:600, h:230, align:"center"
		},
		{
			type:"box",
			id:"button",
			text:"preloader_button", x:180, y:355, w:600, h:100, align:"center"
		}

	],

	onstart: function(slideshow){
		
		var button = slideshow.boxes.boxes[1].children[0];
		button.setAttribute("disabled", true);

		// START, FOR REAL
		button.onclick = function(){
			publish("START");
			publish("sound/button");
		};

	},

	onupdate: function(slideshow, state){

		// Only once
		if(state.FULLY_LOADED) return;

		// Set label
		var label;
		var button = slideshow.boxes.boxes[1].children[0];
		if(window.PRELOAD_PROGRESS==1){
			state.FULLY_LOADED = true;
			label = getWords("preloader_play");
			button.removeAttribute("disabled");
		}else{
			label = getWords("preloader_loading") + " ";
			label += window.PRELOAD_PROGRESS.toLocaleString(document.documentElement.lang, {style:"percent"});
		}
		button.innerHTML = label;

	}

}

);
