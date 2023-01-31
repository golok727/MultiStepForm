// Addons Working
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
