//morse.js

window.onload = function() {
	let myButton = document.getElementById('myButton');
	let mySetting = document.getElementById('mySetting');
	let st = new SignalTimer();

	st.setOutput('result');
	st.setSignalEventListener(myButton, ['mousedown', 'mouseup']);
	st.setSignalEventListener(document, ['keydown', 'keyup']);
	mySetting.addEventListener('mousedown',function(event) {
		st.changeSetting(document.getElementById('short').value,document.getElementById('blank').value);
	});
};

//モールス信号管理クラス
function SignalTimer() {
	this.press = {
		time: 0,
		start: 0,
		end: 0
	};
	this.blank = {
		time: 0,
		start: 0,
		end: 0
	};
	this.setting = {
		press: 200,
		blank: 400
	};
	this.output = {};
}
//押してる時間の取得・処理
SignalTimer.prototype.setPressTime = function(event) {
	if(this.isDown(event)) {
		this.press.start = new Date();
	} else if(this.isUp(event)) {
		this.press.end = new Date();
		this.press.time = this.press.end - this.press.start;
		//短点・長点の判断
		if(this.press.time < this.setting.press) {
			this.output.value += "・";
		} else {
			this.output.value += "―";
		}
		console.log('press:' + this.press.time + 'ms');
	}
};
//押してない時間の取得・処理
SignalTimer.prototype.setBlankTime = function() {
	if(this.isDown(event)) {
		this.blank.end = new Date();
		if(this.blank.start > 0) {
			this.blank.time = this.blank.end - this.blank.start;
			//文字区切りの判断
			if(this.blank.time > this.setting.blank) {
				this.output.value += "　";
			}
			console.log('blank:' + this.blank.time + 'ms');
			this.blank.start = 0;
		}
	} else if(this.isUp(event)) {
		this.blank.start = new Date();
	}
};
//しきい値設定の変更
SignalTimer.prototype.changeSetting = function(press_setting, blank_setting) {
	if(typeof press_setting !== undefined && typeof blank_setting !== undefined) {
		this.setting.press = press_setting;
		this.setting.blank = blank_setting;
		console.log('change setting:' + this.setting.press + 'ms / ' + this.setting.blank + 'ms');
	} else {
		console.error('wrong setting');
	}
};
//マウスか特定のキーが押されたかの判断
SignalTimer.prototype.isDown = function(event) {
	return ((event.type ===  'keydown' && event.keyCode === 32) ||
			event.type === 'mousedown');
};
//マウスか特定のキーが離されたかの判断
SignalTimer.prototype.isUp = function(event) {
	return ((event.type === 'keyup' && event.keyCode === 32) ||
			event.type === 'mouseup');
};
//出力場所の設定
SignalTimer.prototype.setOutput = function(id) {
	this.output = document.getElementById(id);
};
//イベントリスナーの設定
SignalTimer.prototype.setSignalEventListener = function(element, events) {
	let that = this;
	events.forEach(function(event_name) {
		element.addEventListener(event_name,function(event) {
			that.setPressTime(event);
			that.setBlankTime(event);
		});
	});
};
