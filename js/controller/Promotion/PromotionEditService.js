function getFormData() {
	const promotionTitle = document.getElementById("promotionTitle");
	const buttonLabel = document.getElementById("buttonLabel");
	const callToActionLink = document.getElementById("callToActionLink");

	let formData = {
		title: "<h1 class='fw-bold'>" + promotionTitle.value + "</h1>",
		content: tinymce.activeEditor.getContent(),
		buttonLabel: buttonLabel.value,
		ctaLink: callToActionLink.value,
	};

	return JSON.stringify(formData);
}

function handleSaveAsDraft() {
	sessionStorage.setItem("previewData", encodeURIComponent(getFormData()));
	window.open("/promotions/preview.html", "_blank");
}

function presetPage() {
	const pageTitle = document.getElementById("pageTitle");
	const titleBadge = document.createElement("span");
	titleBadge.classList.add("badge", "bg-primary");
	titleBadge.textContent = "New";
	pageTitle.appendChild(titleBadge);
}

function presetEventHandler() {
	const previewButton = document.getElementById("previewButton");
	previewButton.addEventListener("click", handleSaveAsDraft);
}

function addNewContent() {
	presetPage();
	presetEventHandler();
}

function onLoad() {
	const urlSearchParams = new URLSearchParams(window.location.search);
	const parameterValue = urlSearchParams.get("id");
	if (parameterValue) {
		console.log(`Parameter value: ${parameterValue}`);
	} else {
		addNewContent();
	}
}

onLoad();
