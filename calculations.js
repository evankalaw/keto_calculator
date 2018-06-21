var isMale;
var uAge;
var uHeightMajor;
var uHeightMinor;
var uWeight;
var uBodyFat;
var calorieModifier = 0;
var genderButtons = document.querySelectorAll(".genderButton");
var ageInput = document.querySelector("#age");
var ft = document.querySelector("#height_major");
var inches = document.querySelector("#height_minor");
var weight = document.querySelector("#weight");
var bodyFat = document.querySelector("#bodyfat");
var activityLevel = document.querySelector("#activityLevel");
var deficitSlider = document.getElementById("deficitRange");
var deficitPlaceHolder = document.getElementById("deficitPHold");
var caloriePlaceHolder = document.querySelector(".caloriesPHold");
var macros = document.querySelectorAll(".macro");
//var filled = false;

//Add functionality to all inputs
genderButtons[0].addEventListener("click", function() {
	isMale = true;
	update();
});

genderButtons[1].addEventListener("click", function() {
	isMale = false;
	update();
});

ageInput.addEventListener("change", function(){
	uAge = Number(ageInput.value);
	//if (uAge == 0) filled = false;
});

ft.addEventListener("change", function(){
	uHeightMajor = Number(ft.value)/3.28 * 100;
	//if (uHeightMajor == 0) filled = false;
	update();
});

inches.addEventListener("change", function(){
	uHeightMinor = Number(inches.value) * 2.54;
	//if (uHeightMinor == 0) filled = false;
});

weight.addEventListener("change", function(){
	uWeight = Number(weight.value);
	//if (uWeight == 0) filled = false;
	update();
});

bodyFat.addEventListener("change", function(){
	uBodyFat = Number(bodyFat.value);
	//if (uBodyFat == 0) filled = false;
	update();
});

//Activity will be defaulted to 0 (sedentary)
var activity = 1.1;
activityLevel.addEventListener("change", function() {
	switch (Number(activityLevel.value)) {
		case 0:
			activity = 1.1;
			break;
		case 1:
			activity = 1.1702;
			break;
		case 2:
			activity = 1.2402;
			break;
		case 3:
			activity = 1.3283;
			break;
	}
	update();
}); 

deficitPlaceHolder.textContent = calorieModifier + "% (maintenance)";
var isDeficit = false;

deficitSlider.addEventListener("input", function() {
	calorieModifier = Number(deficitSlider.value);
	if (calorieModifier < 0) {
			deficitPlaceHolder.textContent = calorieModifier + "% deficit";
			isDeficit = true;
	} else if (calorieModifier > 0) {
		deficitPlaceHolder.textContent = calorieModifier + "% surplus";
		isDeficit = false;
	} else {
		deficitPlaceHolder.textContent = calorieModifier + "% (maintenance)";
		isDeficit = false;
	}
	update();
});

function isValid() {
	if (uAge == 0 || uBodyFat == 0 || uHeightMajor == 0 || uHeightMinor == 0 || uWeight == 0) return false;
	return true;
}

function calculateCalories() {
	//if (filled == false) return NaN;
	var uHeight = uHeightMajor + uHeightMinor;
	var uWeightKG = uWeight*0.45359237

	//calculates Harris-Benedict Formula - checks if male or female to determine which formula
	var hbBMR;
	if (isMale) {
		hbBMR = 66 + (13.7 * uWeightKG) + (5 * uHeight) - (6.8 * uAge);
	} else {
		hbBMR = 655 + (9.6 * uWeightKG) + (1.8 * uHeight) - (4.7 * uAge);
	}

	//Calculates Katch-McArdle Formula
	var kmaBMR = 370 + (21.6 * (100-uBodyFat)/100 * uWeightKG);

	//Calculates Spherical mean of both formulas as a compromise
	var estimatedBMR = Math.sqrt(hbBMR*kmaBMR);

	var total = estimatedBMR*activity;

	if (isDeficit) {
		total = total*((calorieModifier+100)/100);
	} else {
		total += total*(calorieModifier/100);
	}

	return Math.floor(total);
}

function update() {
	if (isNaN(calculateCalories())) {
		return;
	} else if (isValid() == false) {
	  caloriePlaceHolder.textContent = '--';
		macros[0].textContent = '--';
		macros[1].textContent = '--';
		macros[2].textContent = '--';
	}	else {
		//Calculate macronutrients & calories
		var calories = calculateCalories();
		var lbm = uWeight*((100-uBodyFat)/100);
		var protein = Math.ceil(0.8 * lbm);
		var carbs = 20;
		var fat = Math.floor((calories - (20*4) - (protein*4))/9)
		caloriePlaceHolder.textContent = calories;
		macros[0].textContent = protein;
		macros[1].textContent = fat;
		macros[2].textContent = 20;
	}
}