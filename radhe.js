/* 
-> change monthly and yearly rates 
-> Display the correct amount

*/
const __prod__ = false;

let COSTS = {
	ARCADE: 9,
	ADVANCED: 12,
	PRO: 15,
	ONS: 1,
	LST: 2,
	CUSPRO: 2,
};

const billingPeriodToggleButton = document.querySelector(
	"[data-toggle-button]"
);
toggleAndDisplayMonthlyYearlyPrices();
let billing = billingPeriodToggleButton.checked ? "yr" : "mo";
billingPeriodToggleButton.addEventListener("change", (e) => {
	billing = e.target.checked ? "yr" : "mo";
	document
		.querySelectorAll("[data-moy]")
		.forEach((span) => (span.innerText = billing));

	const isYearlyBilling = billing === "yr";

	COSTS = {
		ARCADE: isYearlyBilling ? 90 : 9,
		ADVANCED: isYearlyBilling ? 120 : 12,
		PRO: isYearlyBilling ? 150 : 15,
		ONS: isYearlyBilling ? 10 : 1,
		LST: isYearlyBilling ? 20 : 2,
		CUSPRO: isYearlyBilling ? 20 : 2,
	};

	toggleAndDisplayMonthlyYearlyPrices();
});

const completedForm = {
	name: "",
	email: "",
	number: "",
	plan:
		document.querySelector(".plan.active").getAttribute("data-plan-type") ||
		ARCADE,
	addons: [],
};

let currentStep = 1;
let reachedEnd = false;
let currentPlan = document.querySelector(".plan.active");

// Addons Working
let currentStepCountingDiv = document.querySelector(
	`[data-step='${currentStep}']`
);

let currentDataCounterStep = document.querySelector(
	`[data-counter-step='${currentStep}']`
);

const mainForm = document.querySelector("[data-main-form]");

// Addons Section Functionality
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
const submitButton = document.querySelector("[data-submit]");
if (currentStep === 1) {
	~goBackBtn.classList.add("hidden");
}

// Buttons Event Listeners
goBackBtn.addEventListener("click", (e) => {
	e.preventDefault();
	if (reachedEnd && currentStep <= 4) {
		submitButton.classList.add("hidden");
		nextStepBtn.classList.remove("hidden");
	}
	if (currentStep <= 1) return;
	else currentStep--;

	const prevStepDiv = document.querySelector(`[data-step='${currentStep}']`);
	currentStepCountingDiv.classList.add("hidden");
	prevStepDiv.classList.remove("hidden");
	currentStepCountingDiv = prevStepDiv;

	currentDataCounterStep.querySelector(".circle").classList.remove("current");
	let currentDataCounterStepPrev = document.querySelector(
		`[data-counter-step='${currentStep}']`
	);
	currentDataCounterStepPrev.querySelector(".circle").classList.add("current");
	currentDataCounterStep = currentDataCounterStepPrev;
});

// ?Next button
nextStepBtn.addEventListener("click", (e) => {
	e.preventDefault();

	// Steps processing and validation
	if (currentStep === 1) if (!Step1Register() && __prod__) return;
	console.log(completedForm);

	if (currentStep === 2) Step2Register();
	if (currentStep === 3) Step3Register();

	if (currentStep === 3) {
		reachedEnd = true;
		nextStepBtn.classList.add("hidden");
		submitButton.classList.remove("hidden");
	}
	if (currentStep >= 4) {
		return;
	} else currentStep++;

	goBackBtn.classList.remove("hidden");
	const nextStepDiv = document.querySelector(`[data-step='${currentStep}']`);
	currentStepCountingDiv.classList.add("hidden");
	nextStepDiv.classList.remove("hidden");
	currentStepCountingDiv = nextStepDiv;

	currentDataCounterStep.querySelector(".circle").classList.remove("current");
	let currentDataCounterStepNext = document.querySelector(
		`[data-counter-step='${currentStep}']`
	);
	currentDataCounterStepNext.querySelector(".circle").classList.add("current");
	currentDataCounterStep = currentDataCounterStepNext;
});

mainForm.addEventListener("submit", handleSubmit);

//?? Handlers
function Step1Register() {
	const nameInput = document.querySelector("[data-name-input]");
	const emailInput = document.querySelector("[data-email-input]");
	const phoneInput = document.querySelector("[data-phone-input]");

	let success = true;

	[nameInput, emailInput, phoneInput].forEach((input) => {
		if (input.value === "") {
			input.classList.add("error");

			success = false;
			setTimeout(() => {
				input.classList.remove("error");
			}, 3000);
		} else {
			completedForm[input.name] = input.value;
			// Change the variable from const to let if using the below method
			// completedForm = { ...completedForm, ...{ [input.name]: input.value } };
		}
	});

	return success;
}
function Step2Register() {}

function Step3Register() {
	let addons = [];
	const checkboxes = document.querySelectorAll("[data-addon-checkbox]");
	checkboxes.forEach((checkbox) => {
		if (checkbox.checked) {
			addons.push(checkbox.name);
		}
	});
	completedForm["addons"] = addons;

	console.log(completedForm);

	const total = calculateTotalBill();
}
function handleSubmit(e) {
	/** @type {SubmitEvent} e */
	// e.preventDefault();

	e.preventDefault();
	console.log("Submit SuccessFull");
}

function calculateTotalBill() {
	const planCosts = COSTS[completedForm.plan];
	let addonsCost = 0;
	addonsCost = completedForm.addons.reduce(
		(total, addon) => total + COSTS[addon],
		0
	);

	return {
		planCosts,
		addonsCost,
		total: planCosts + addonsCost,
	};
}

// Todo
function showErrorCode() {}

function toggleAndDisplayMonthlyYearlyPrices() {
	const planSpans = document.querySelectorAll("[data-plan-price]");
	planSpans.forEach((span) => {
		span.innerText = COSTS[span.getAttribute("data-plan-price")];
	});

	const addonSpans = document.querySelectorAll("[data-addon-price]");
	addonSpans.forEach((span) => {
		span.innerText = COSTS[span.getAttribute("data-addon-price")];
	});
}

// Plans Click control

[...document.querySelectorAll(".plan")].forEach((plan) => {
	plan.addEventListener("click", (e) => {
		currentPlan.classList.remove("active");
		e.target.classList.add("active");
		currentPlan = e.target;
		completedForm["plan"] = currentPlan.getAttribute("data-plan-type");
	});
});
