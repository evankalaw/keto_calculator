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
var genderButtons = document.querySelectorAll(".genderButton");
var ageInput = document.querySelector("#age");
var ft = document.querySelector("#height_major");
var inches = document.querySelector("#height_minor");
var weight = document.querySelector("#weight");
var bodyFat = document.querySelector("#bodyfat");
var activityLevel = document.querySelector("#activityLevel");

//Add functionality to radio buttons
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

