const apiUrl = "http://localhost:3000/api/data";

document.getElementById("saveButton").addEventListener("click", () => {
	const content = tinymce.activeEditor.getContent();
	fetch(`${apiUrl}/save`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ content }),
	})
		.then((response) => response.json())
		.then((data) => {
			if (data.success) {
				alert("Content saved successfully");
			} else {
				alert("Error saving content");
			}
		});
});
