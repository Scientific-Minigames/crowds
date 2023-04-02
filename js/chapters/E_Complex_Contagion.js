// 3 - Complex Contagion

// Puzzles for re-use in Complex Contagion...
var CONTAGION_PUZZLE = {
	"peeps":[[53,195,1],[169,297,0],[416,228,0],[323,325,0],[550,234,0],[787,304,0],[627,328,0],[415,419,0],[544,422,0],[906,199,0]],
	"connections":[[0,1],[1,3],[3,2],[3,7],[7,8],[8,6],[6,4],[4,2],[6,5],[5,9]]
};
var CASCADE_PUZZLE = {
	"peeps":[[31,201,1],[148,238,0],[267,317,0],[166,392,0],[282,437,0],[481,202,0],[401,284,0],[472,367,0],[590,340,0],[602,236,0],[843,313,0],[719,376,0],[930,413,0],[846,514,0],[728,488,0]],
	"connections":[[0,1,1],[3,2,1],[2,4,1],[4,3,1],[6,7,1],[7,8,1],[8,9,1],[9,5,1],[5,6,1],[6,9,1],[9,7,1],[7,5,1],[5,8,1],[8,6,1],[11,10,1],[11,14,1],[14,13,1],[13,12,1],[12,10,1],[11,12,1],[12,14,1],[14,10,1],[10,13,1],[13,11,1]]
}

SLIDES.push(

{
	chapter: "Complex",
	clear:true,

	add:[

		// Intro text
		{
			type:"box",
			id:"complex_complex",
			text:"complex_complex",
			x:0, y:0,w:480, h:540
		},

		// Sim
		{
			type:"sim",
			x:-480, y:0,
			fullscreen: true,
			network: {
				"contagion":0.5,
				"peeps":[[849,356,0],[808,199,0],[543,97,1],[679,114,0],[781,480,0],[906,480,0]],
				"connections":[[0,1,1],[2,3,1],[3,1,1],[4,0,1],[0,5,1]]
			},
			options:{
				infectedFrame: 2,
				scale: 1.75,
				startUncuttable: true,
				_bottle: true
			}
		},

		// UI for the simulation
		{
			type:"box",
			x:40, y:230,
			sim_ui:"red"
		}

	],

	onupdate:function(slideshow, state){

		// Show next if SIM STEP >= 3
		if(!state.ended){
			var sim = slideshow.simulations.sims[0];
			if(sim.STEP>=3){
				state.ended = true;
				slideshow.next();
			}
		}

	}

},

{
	remove:[
		{type:"box", id:"complex_complex"}
	],
	add:[
		{
			type:"box",
			text:"complex_complex_2",
			x:0, y:0, w:480, h:540
		}
	]
},

{
	chapter: "Complex-Wisdom",
	clear:true,

	add:[

		// Intro text
		{
			id:"complex_complex_3",
			type:"box",
			text:"complex_complex_3",
			x:480, y:0, w:480, h:540
		},

		// Sim
		{
			type:"sim",
			x:0, y:0,
			fullscreen: true,
			network: {
				"contagion":0.25,
				"peeps":[[54,240,1],[227,237,0],[298,98,0],[405,157,0],[408,296,0],[311,380,0]],
				"connections":[[1,2,0],[1,3,0],[4,1,0],[1,5,0],[0,1,0]]
			},
			options:{
				infectedFrame: 3,
				scale: 1.75,
				_wisdom: true
			}
		},

		// UI for the simulation
		{
			type:"box",
			x:30, y:320,
			sim_ui:"red"
		}

	],

	onupdate:function(slideshow, state){

		// Show end if EVERYONE is infected
		if(!state.ended){
			var sim = slideshow.simulations.sims[0];
			var peepCount = 0;
			sim.peeps.forEach(function(peep){
				if(peep.infected) peepCount++;
			});
			if(peepCount==sim.peeps.length){
				var boxes = slideshow.boxes;
				state.ended = true;
				sim.win({
					small:true
				});
				slideshow.next();
			}
		}

	}

},

{
	remove:[
		{type:"box", id:"complex_complex_3"}
	],
	add:[
		{
			id:"end",
			type:"box",
			text:"complex_complex_3_end",
			x:480, y:0, w:480, h:540
		}
	]
},

{
	chapter: "Complex-Cascade",
	clear:true,

	add:[

		// Intro text
		{
			type:"box",
			id:"complex_cascade",
			text:"complex_cascade",
			x:60, y:0, w:840, h:100,
			align: "center"
		},

		// Sim
		{
			type:"sim",
			id:"contagion",
			x:0, y:-40,
			fullscreen: true,
			network: {
				"contagion":0.25,
				"peeps":CASCADE_PUZZLE.peeps,
				"connections":CASCADE_PUZZLE.connections
			},
			options:{
				infectedFrame: 3,
				scale: 1.25,
				startUncuttable: true,
				_wisdom: true
			}
		},

		// UI for the simulation
		{
			type:"box",
			id:"ui",
			x:380, y:370,
			sim_ui:"red"
		},
		{
			type:"box",
			id:"complex_cascade_feel_free",
			text:"complex_cascade_feel_free",
			x:330, y:440, w:300, h:100,
			align: "center"
		},

		// End text
		{
			id:"end",
			type:"box",
			text:"complex_cascade_end",
			x:330, y:450, w:300, h:100,
			hidden:true
		},

	],

	onupdate:function(slideshow, state){

		// Show end if EVERYONE is infected
		if(!state.ended){
			var sim = slideshow.simulations.sims[0];
			var peepCount = 0;
			sim.peeps.forEach(function(peep){
				if(peep.infected) peepCount++;
			});
			if(peepCount==sim.peeps.length){
				var boxes = slideshow.boxes;
				boxes.removeChildByID("complex_cascade_feel_free", true);
				boxes.showChildByID("end", true);
				state.ended = true;
				sim.win();
			}
		}

	}

},

{
	remove:[
		{type:"box", id:"complex_cascade"},
		{type:"box", id:"complex_cascade_feel_free"},
		{type:"box", id:"end"}
	],
	move:[
		{type:"box", id:"ui", y:360-80},
		{type:"sim", id:"contagion", y:-140}
	],
	add:[
		{
			type:"box",
			text:"complex_post_cascade",
			x:50, y:390, w:600, h:150,
			align: "right"
		},
		{
			type:"box",
			text:"complex_post_cascade_end",
			x:660, y:450, w:300, h:90
		}
	]
},

{
	chapter: "Complex-Prevent",
	clear:true,

	add:[

		// Intro text
		{
			type:"box",
			id:"complex_prevent",
			text:"complex_prevent",
			x:80, y:0, w:800, h:140,
			align: "center"
		},

		// Lil' contagion
		{
			id: "contagion",
			type:"sim",
			x:0, y:80,
			fullscreen: true,
			network: {
				"contagion":0.25,
				"peeps":CONTAGION_PUZZLE.peeps,
				"connections":CONTAGION_PUZZLE.connections
			},
			options:{
				infectedFrame: 3,
				scale: 1.25,
				startUncuttable: true,
				_wisdom: true
			}
		},

		// UI for the simulation
		{
			type:"box",
			id:"ui",
			x:380, y:140,
			sim_ui:"red"
		},

		// Outro text
		/*{
			id:"end",
			type:"box",
			text:"complex_prevent_end",
			x:660, y:440, w:300, h:100,
			hidden:true
		}*/

	],

	onupdate:function(slideshow, state){

		// Show end if sim is running AND no one left to infect
		// that is, it's stalled... YAY!
		var sim = slideshow.simulations.sims[0];

		if(!state.ended){
			if(Simulations.IS_RUNNING){

				// if it's a new step... 
				if(sim.STEP > state.lastStep){

					// ...but the infected count is the same as last step
					var countInfected = 0;
					sim.peeps.forEach(function(peep){ if(peep.infected) countInfected++; });
					if(state.lastInfected == countInfected){

						// oh, and it's NOT coz ALL of 'em are infected
						if(countInfected!=sim.peeps.length){

							// WIN
							state.ended = true;
							var boxes = slideshow.boxes;
							setTimeout(function(){
								//boxes.showChildByID("end", true);
								sim.win({
									x:350, y:270-90,
									width:260, height:260,
									small:true
								});
							},350);
							setTimeout(function(){
								slideshow.next();
							},1100);

						}

					}else{
						state.lastInfected = countInfected;
					}

				}
				state.lastStep = sim.STEP;

			}else{
				state.lastStep = 0;
				state.lastInfected = 1;
			}

		}

	}

},

{
	remove:[
		{type:"box", id:"complex_prevent"}
	],
	move:[
		{type:"box", id:"ui", y:0},
		{type:"sim", id:"contagion", y:-70}
	],
	add:[
		{
			type:"box",
			text:"complex_prevent_2",
			x:0, y:390, w:650, h:100,
			align: "right"
		},
		{
			type:"box",
			text:"complex_prevent_end",
			x:500, y:500, w:300, h:90
		}
	]
},

{
	chapter: "Complex-Groupthink",
	clear: true,

	add:[

		// NASA Image
		{
			type:"box",
			img:"sprites/nasa.png", x:-100, y:0, w:425, h:450
		},

		// Text
		{
			type:"box",
			text:"complex_groupthink",
			x:460, y:0, w:500, h:540
		},


	]

}

);


