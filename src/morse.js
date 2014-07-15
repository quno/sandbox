//morse.js

var btn = document.getElementById('myButton'),
txt = document.getElementById('result'),
set = document.getElementById('mySetting'),
press_time = 0,
press_start_time = 0,
press_end_time = 0,
blank_time = 0,
blank_start_time = 0,
blank_end_time = 0,
press_setting = 200,
blank_setting = 600;

btn.addEventListener('mousedown',function(event){pressStart();});
btn.addEventListener('mouseup',function(event){pressEnd();});

set.addEventListener('mousedown',function(event){
	var new_press_setting = document.getElementById('short').value,
	new_blank_setting = document.getElementById('blank').value;
	if(new_press_setting !== undefined && new_blank_setting !== undefined){
		press_setting = new_press_setting;
		blank_setting = new_blank_setting;
		console.log('new setting:' + press_setting + ' / ' + blank_setting);
	}
});

document.addEventListener('keydown',function(event){
	if(event.keyCode == 32){
		pressStart();
	}
});
document.addEventListener('keyup',function(event){
	if(event.keyCode == 32){
		pressEnd();
	}
});

function pressStart(){
	press_start_time = blank_end_time = new Date();
	if(blank_start_time) {
		blank_time = blank_end_time - blank_start_time;
		if(blank_time > blank_setting) {
			txt.value += " / ";
		}
		console.log('blank:' + blank_time + 'ms');
		blank_start_time = 0;
	}
}
function pressEnd(){
	press_end_time = blank_start_time = new Date();
	press_time = press_end_time - press_start_time;
	if(press_time < press_setting) {
		txt.value += "・";
	} else {
		txt.value += "―";
	}
	console.log('press:' + press_time + 'ms');
}