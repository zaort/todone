const newTodoHandler = async event => {
	event.preventDefault();
	console.log("newTodoHandler");

	const title = document.querySelector("#newTaskTitle").value.trim();
	const dueDate = document.querySelector("#newTaskDueDate").value.trim();
	const description = document.querySelector("#newDescription").value.trim();

	if (title && description && dueDate) {
		const response = await fetch(`/api/tasks`, {
			method: "POST",
			body: JSON.stringify({
				title: title,
				description: description,
				dueDate: dueDate,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (response.ok) {
			document.querySelector("#newTaskModal").classList.toggle("hidden");
			document.location.replace("/profile");
		} else {
			showNewTaskSelector.newTask.classList.toggle("hidden");
			alert("Failed to create project");
		}
	}
};

const showNewTaskModal = async event => {
	event.preventDefault();
	document.querySelector("#newTaskModal").classList.toggle("hidden");
};

const logout = async event => {
	event.preventDefault();

	const response = await fetch("/api/users/logout", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
	});
	if (response.ok) {
		document.location.replace("/");
	} else {
		alert(response.statusText);
	}
};

const deleteTodoHandler = async event => {
	event.preventDefault();
	console.log("deletetask");
	if (event.target.hasAttribute("taskId")) {
		const id = event.target.getAttribute("taskId");

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

document.querySelector("#logoutBtn").addEventListener("click", logout);

document.querySelector(".newTaskForm").addEventListener("submit", newTodoHandler);

// document.querySelector("#deleteTaskBtn").addEventListener("click", deleteTodoHandler);

document.querySelector(".deleteTaskBtn").addEventListener("click", function (event) {
	console.log("Button Clicked:", event);
	deleteTodoHandler(event);
});

document.querySelector("#addTodoBtn").addEventListener("click", showNewTaskModal);
