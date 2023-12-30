const todoDomSelector = {
	title: document.querySelector("#title").value.trim(),
	description: document.querySelector("#description").value.trim(),
	done: document.querySelector("#cheker"),
	date: document.querySelector("#date").value.trim(),
	dueDate: document.querySelector("#dueDate").value.trim(),
	delete: document.querySelector("#delete").value.trim(),
};

const newTodoDomSelector = {
	title: document.querySelector("#newTitle").value.trim(),
	description: document.querySelector("#newdescription").value.trim(),
	date: document.querySelector("#newDate").value.trim(),
	dueDate: document.querySelector("#newDueDate").value.trim(),
};

const newTodoHandler = async event => {
	event.preventDefault();

	if (newtodoDomSelector.title && newtodoDomSelector.description && newtodoDomSelector.dueDate) {
		const response = await fetch(`/api/tasks`, {
			method: "POST",
			body: JSON.stringify({
				title: newTodoDomSelector.title,
				description: newTodoDomSelector.description,
				dueDate: newTodoDomSelector.dueDate,
				date: newTodoDomSelector.date,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (response.ok) {
			document.location.replace("/tasks");
		} else {
			alert("Failed to create project");
		}
	}
};

const deleteTodoHandler = async event => {
	if (event.target.hasAttribute("task_id")) {
		const id = event.target.getAttribute("task_id");

		const response = await fetch(`/api/tasks/${id}`, {
			method: "DELETE",
		});

		if (response.ok) {
			document.location.replace("/tasks");
		} else {
			alert("Failed to delete task");
		}
	}
};

const updateTodoHandler = async event => {
	if (event.target.hasAttribute("task_id")) {
		const id = event.target.getAttribute("task_id");
		const response = await fetch(`/api/tasks/${id}`, {
			method: "PUT",
			body: JSON.stringify({
				title: todoDomSelector.title,
				description: todoDomSelector.description,
				dueDate: todoDomSelector.dueDate,
				date: todoDomSelector.date,
				done: todoDomSelector.done,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (response.ok) {
			document.location.replace("/tasks");
		} else {
			alert("Failed to update task");
		}
	}
};

document.querySelector(".newTodo").addEventListener("submit", newTodoHandler);

document.querySelector(".deleteTodo").addEventListener("click", deleteTodoHandler);

document.querySelector(".updateTodo").addEventListener("click", updateTodoHandler);
