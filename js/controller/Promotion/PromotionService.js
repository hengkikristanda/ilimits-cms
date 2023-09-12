const apiUrl = "http://localhost:3000/api/v1/promotions";

async function getPromotions() {
	try {
		const response = await fetch(`${apiUrl}/`);

		if (!response.ok) {
			throw new Error("Request failed with status " + response.status);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error fetching promotions:", error);
		throw error;
	}
}

getPromotions()
	.then((promotions) => {
		const promotionItemContainer = document.getElementById("promotionItemContainer");
		promotions.map((item) => {
			const loadingElement = document.createElement("div");
			loadingElement.classList.add("loader");

			const innerContainer = document.createElement("div");
			innerContainer.classList.add(
				"col",
				"col-md-3",
				"col-sm-12",
				"d-flex",
				"justify-content-center",
				"custom-height",
				"align-items-center"
			);
			innerContainer.appendChild(loadingElement);

			promotionItemContainer.appendChild(innerContainer);

			setTimeout(() => {
				const linkContainer = document.createElement("a");
				linkContainer.classList.add("card", "flex-fill");
				linkContainer.setAttribute("href", "detail.html?id=" + item.id);

				const image = document.createElement("img");
				image.classList.add("card-img-top");
				image.setAttribute("src", "/assets/promotions/" + item.imageSource);

				const cardHeader = document.createElement("div");
				cardHeader.classList.add("card-header");

				const cardTitle = document.createElement("h5");
				cardTitle.classList.add("card-title", "truncate");
				cardTitle.textContent = item.title;

				const span = document.createElement("span");
				span.classList.add("badge", item.className);
				span.textContent = item.contentStatus;

				cardHeader.appendChild(cardTitle);
				cardHeader.appendChild(span);

				const cardFooter = document.createElement("div");
				cardFooter.classList.add("card-footer", "text-body-secondary");
				cardFooter.textContent = "2 Days Ago";

				linkContainer.appendChild(image);
				linkContainer.appendChild(cardHeader);
				linkContainer.appendChild(cardFooter);

				innerContainer.classList.remove("custom-height", "align-items-center");
				innerContainer.replaceChild(linkContainer, loadingElement);

				promotionItemContainer.appendChild(innerContainer);
			}, 500);
		});
	})
	.catch((error) => {
		console.error("Failed to fetch promotions:", error);
	});
