var isMale;
var uAge;
var uHeightFeet;
var uHeightInches;
var uWeight;
var uBodyFat;
var sedentary = false;
var light = false;
var moderate = false;
var heavy = false;
var extreme = false;
var deficit = 0;
var genderButtons = document.querySelectorAll(".genderButton");
var ageInput = document.querySelector("#age");
var ft = document.querySelector("#height_major");
var inches = document.querySelector("#height_minor");
var weight = document.querySelector("#weight");
var bodyFat = document.querySelector("#bodyfat");
var activityLevel = document.querySelector("#activityLevel");
var deficitSlider = document.getElementById("deficitRange");
var deficitPlaceHolder = document.getElementById("deficitPHold");

//Add functionality to all inputs
genderButtons[0].addEventListener("click", function() {
	isMale = true;
});

genderButtons[1].addEventListener("click", function() {
	isMale = false;
});

ageInput.addEventListener("change", function(){
	uAge = Number(ageInput.value);
});

ft.addEventListener("change", function(){
	uHeightFeet = Number(ft.value);
});

inches.addEventListener("change", function(){
	uHeightInches = Number(inches.value);
});

weight.addEventListener("change", function(){
	uWeight = Number(weight.value);
});

bodyFat.addEventListener("change", function(){
	uBodyFat = Number(bodyFat.value)/100;
});

activityLevel.addEventListener("change", function() {
	console.log(this.value);
});

deficitPlaceHolder.textContent = deficit + "% (maintenance)";

deficitSlider.addEventListener("input", function() {
	deficit = Number(deficitSlider.value);
	if (deficit < 0) {
			deficitPlaceHolder.textContent = deficit + "% deficit";
	} else if (deficit > 0) {
		deficitPlaceHolder.textContent = deficit + "% surplus";
	} else {
		deficitPlaceHolder.textContent = deficit + "% (maintenance)";
	}
});
