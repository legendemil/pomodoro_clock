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
		sessionInfo = { },
		breakInfo = {},
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
		if(min === undefined && sec === undefined) {
			timerBox.currentValue.text(pad(sessionLength) + ':00');
			console.log(pad(sessionLength) + ':00')
			return;
		}

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
		
		if(isRun)
			disableTimerControls();
		else
			enableTimerControls();

		setTimeout(function countdown() {
			if(isRun) {
				if(!isSession)
					startBreak();
				else 
					startSession();
				setTimeout(countdown, 1000);
			}
		},0);

	}

	function handleStartTimer(ev) {
		startTimer();
	}

	function handleIncreaseSession() {
		sessionLength++;
		currentTime = sessionLength * 60;
		sessionInfo.value.text(sessionLength);
		updateView();
	}

	function handleDecreaseSession() {	
		if(sessionLength === 0)
			return;

		sessionLength--;
		currentTime = sessionLength * 60;
		sessionInfo.value.text(sessionLength);
		updateView();
	}

	function handleIncreaseBreak() {
		breakLength++;
		currentBreak = breakLength * 60;
		breakInfo.value.text(breakLength);
	}

	function handleDecreaseBreak() {
		if(breakLength === 0)
			return;
				breakLength--;
		currentBreak = breakLength * 60;
		breakInfo.value.text(breakLength);
	}

	function enableTimerControls() {
		$(sessionInfo.box).find('.controls-up').on('click', handleIncreaseSession);
		$(sessionInfo.box).find('.controls-down').on('click', handleDecreaseSession);

		$(breakInfo.box).find('.controls-up').on('click', handleIncreaseBreak);
		$(breakInfo.box).find('.controls-down').on('click', handleDecreaseBreak);
	}

	function disableTimerControls() {
		$(sessionInfo.box).find('.controls-up').off('click', handleIncreaseSession);
		$(sessionInfo.box).find('.controls-down').off('click', handleDecreaseSession);

		$(breakInfo.box).find('.controls-up').off('click', handleIncreaseBreak);
		$(breakInfo.box).find('.controls-down').off('click', handleDecreaseBreak);
	}
	
	// get DOM elements
	function cacheDOM() {
		controlsBox = $('.controls-box');
		// controls
		sessionInfo.box = $(controlsBox).find('#session');
		sessionInfo.value = $(sessionInfo.box).find('.controls-value');
		breakInfo.box = $(controlsBox).find('#break');
		breakInfo.value = $(breakInfo.box).find('.controls-value');
		// timer
		timerBox.box = $('.timer-box');
		timerBox.label = $(timerBox.box).find('.current-mode-label');
		timerBox.currentValue = $(timerBox.box).find('.current-value');
		timerBox.startStopBtn = $(timerBox.box).find('#startStop');
	}

	function bindEvents() {
		timerBox.startStopBtn.on('click', handleStartTimer);
		enableTimerControls();
	}

	// starts an app
	function init() {
		cacheDOM();
		bindEvents();
	}
	
	init();
})();
