let currentStep = 1;

// Addons Working
let currentStepCountingDiv = document.querySelector("[data-current-step]");

const addons = [...document.querySelectorAll("[data-addon]")];
addons.forEach((addon) => {
	addon.querySelectorAll("input").forEach((checkbox) => {
		checkbox.addEventListener("change", (e) => {
			const parentNode = e.target.parentNode.parentNode;
			if (e.target.checked) {
				parentNode.classList.add("active");
			} else {
				parentNode.classList.remove("active");
			}
		});
	});
});

// Lower Buttons

const goBackBtn = document.querySelector("[data-goback]");
const nextStepBtn = document.querySelector("[data-nextstep]");

goBackBtn.addEventListener("click", (e) => {
	e.preventDefault();

	if (currentStep <= 1) return;
	else currentStep--;
	console.log(currentStep);
});

nextStepBtn.addEventListener("click", (e) => {
	e.preventDefault();
	if (currentStep >= 4) return;
	else currentStep++;
	console.log(currentStep);
});
