const todoDomSelector = {
	title: document.querySelector(".title").value.trim(),
	description: document.querySelector(".description").value.trim(),
	done: document.querySelector(".cheker"),
	date: document.querySelector(".date").value.trim(),
	dueDate: document.querySelector(".dueDate").value.trim(),
	delete: document.querySelector(".delete").value.trim(),
};

const newTodoDomSelector = {
	title: document.querySelector("#newTaskTitle").value.trim(),
	description: document.querySelector("#newDescription").value.trim(),
	addTaskBtn: document.querySelector("#addNewTaskBtn"),
	dueDate: document.querySelector("#newTaskDueDate").value.trim(),
};
const showNewTaskSelector = {
	newTask: document.querySelector("#showAddFormBtn"),
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
			showNewTaskSelector.newTask.classList.toggle("hidden");
			document.location.replace("/tasks");
		} else {
			showNewTaskSelector.newTask.classList.toggle("hidden");
			alert("Failed to create project");
		}
	}
};

const deleteTodoHandler = async event => {
	if (event.target.hasAttribute("taskId")) {
		const id = event.target.getAttribute("taskId");

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

const showNewTaskModal = async event => {
	showNewTaskSelector.newTask.classList.toggle("hidden");
};

document.querySelector("#submitNewTask").addEventListener("submit", newTodoHandler);
document.querySelector(".deleteTask").addEventListener("click", deleteTodoHandler);
document.querySelector("#showAddTaskBtn").addEventListener("submit", showNewTaskModal);
