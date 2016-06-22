// Pomodoro Clock Module
var pomodoro = (function() {
	var 
		//  defaults, time in minutes
		sessionLength = 25,
		breakLength = 5,
		currentTime = sessionLength * 60,
		currentBreak = breakLength * 60,
		isRun = false,
		isSession = true,
		controlsBox,
		sessionInfo,
		breakInfo,
		timerBox = {
			box: null,
			label: '',
			currentValue: null,
			startStopBtn: null

		};
	
	// fill zeros if needed
	function pad(val) {
		return val < 10 ? '0' + val : val;
	}
	
	// update the timerBox.currentValue
	function updateView(min, sec) {
		timerBox.currentValue.text(min + ':' + sec);
	}

	function startBreak() {
		var	min, 
			sec;

		min = pad(parseInt(currentBreak / 60));
		sec = pad(currentBreak % 60);
		currentBreak--;
		console.log(min, ':', sec, isSession, 'break');
		updateView(min, sec);	
		if(currentBreak < 0) {
			isSession = !isSession;	
			currentTime = sessionLength * 60;
			timerBox.label.text('Session');
		}
	}

	function startSession() {
		var	min, 
			sec;

		min = pad(parseInt(currentTime / 60));
		sec = pad(currentTime % 60);
		currentTime--;
		console.log(min, ':', sec, isSession, 'session');
		updateView(min, sec);		
		if(currentTime < 0) {
			isSession = !isSession;
			currentBreak = breakLength * 60;
			console.log(timerBox.label)
			timerBox.label.text('Break');
		}

	}
	
	// start timer and run countdwon
	function startTimer(ev) {
		var labelTextBtn;

		isRun = !isRun;
		labelTextBtn = isRun ? 'Stop!' : 'Go!';
		timerBox.startStopBtn.text(labelTextBtn);
		

		setTimeout(function countdown() {
			if(isRun) {
				if(!isSession)
					startBreak();
				else 
					startSession();
				setTimeout(countdown, 1000);
			}
		},1000);

	}

	function handleStartTimer(ev) {
		startTimer();
	}
	
	// get DOM elements
	function cacheDOM() {
		controlsBox = $('.controls-box');
		sessionInfo = $(controlsBox).find('#session');
		breakInfo = $(controlsBox).find('#break');
		timerBox.box = $('.timer-box');
		timerBox.label = $(timerBox.box).find('.current-mode-label');
		timerBox.currentValue = $(timerBox.box).find('.current-value');
		timerBox.startStopBtn = $(timerBox.box).find('#startStop');
	}

	function bindEvents() {
		timerBox.startStopBtn.on('click', handleStartTimer);
	}
	
	// start sessions 
	function initSession() {
		sessionStorage.setItem('sessionLength', 25 * 60);
		sessionStorage.setItem('breakLength', 5 * 60);
	}

	// starts an app
	function init() {
		cacheDOM();
		bindEvents();
		initSession();
	}
	
	init();
})();
