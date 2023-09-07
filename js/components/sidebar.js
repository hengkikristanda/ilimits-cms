function readJSONFile(callback) {
	const filePath = "../js/components/data.json"; // Relative path to your JSON file

	const xhr = new XMLHttpRequest();
	xhr.open("GET", filePath, true);

	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4 && xhr.status === 200) {
			try {
				const jsonContent = JSON.parse(xhr.responseText);
				callback(null, jsonContent);
			} catch (error) {
				callback(error, null);
			}
		} else if (xhr.status !== 200) {
			callback(new Error("Failed to fetch the JSON file."), null);
		}
	};

	xhr.send();
}
// Example usage:
readJSONFile(function (error, data) {
	if (error) {
		console.error("Error reading JSON file:", error);
	} else {
		// console.log("JSON data:", data);
		const listItemName = data.header;
		const listItemChildren = data.items;

		const sidebarNav = document.getElementById("sidebar-nav");

		const listItem = document.createElement("li");
		listItem.classList.add("sidebar-header");
		listItem.textContent = listItemName;

		sidebarNav.appendChild(listItem);

		for (let n = 0; n < listItemChildren.length; n++) {
			const childListItem = document.createElement("li");
			childListItem.classList.add("sidebar-item");

			const childListItemLink = document.createElement("a");
			childListItemLink.classList.add("sidebar-link");
			childListItemLink.setAttribute("href", listItemChildren[n].href);

			const iconItem = document.createElement("i");
			iconItem.classList.add("align-middle");
			childListItemLink.setAttribute("data-feather", listItemChildren[n]["data-feather"]);

			const span = document.createElement("span");
			span.classList.add("align-middle");
			span.textContent = listItemChildren[n].name;

			childListItemLink.appendChild(iconItem);
			childListItemLink.appendChild(span);

			childListItem.appendChild(childListItemLink);

			sidebarNav.appendChild(childListItem);
		}
	}
});
