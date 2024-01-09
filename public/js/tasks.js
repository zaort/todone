const deleteTodoHandler = async event => {
	if (event.target.hasAttribute("taskId")) {
		const id = event.target.getAttribute("taskId");
		console.log(id);
		const response = await fetch(`/api/tasks/${id}`, {
			method: "DELETE",
		});

		if (response.ok) {
			document.location.replace("/profile");
		} else {
			alert("Failed to delete task");
		}
	}
};
document.querySelector(".deleteTaskBtn").addEventListener("click", deleteTodoHandler);