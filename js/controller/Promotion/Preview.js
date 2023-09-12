function renderHtmlData(data) {
	const { title, content, buttonLabel, ctaLink } = data;

	const container = document.getElementById("container");
	container.innerHTML = title + content;

	const buttonContainer = document.createElement("div");
	buttonContainer.classList.add("d-flex", "justify-content-center", "align-items-center");

	const ctaButton = document.createElement("a");
	ctaButton.textContent = buttonLabel;
	ctaButton.href = ctaLink;
	ctaButton.classList.add("btn", "btn-success", "fw-bold", "rounded-0", "fs-5");

	buttonContainer.appendChild(ctaButton);

	container.appendChild(buttonContainer);
}

function onLoad() {
	let previewData = sessionStorage.getItem("previewData");
	var receivedData = JSON.parse(decodeURIComponent(previewData));
	renderHtmlData(receivedData);
}

onLoad();
