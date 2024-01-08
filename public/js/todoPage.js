console.log("todo js");
// const todoDomSelector = {
// 	title: document.querySelector(".title").value.trim(),
// 	description: document.querySelector(".description").value.trim(),
// 	done: document.querySelector(".cheker"),
// 	date: document.querySelector(".date").value.trim(),
// 	dueDate: document.querySelector(".dueDate").value.trim(),
// 	delete: document.querySelector(".delete").value.trim(),
// };

// const newTodoDomSelector = {
// 	title: document.querySelector("#newTaskTitle").value.trim(),
// 	description: document.querySelector("#newDescription").value.trim(),
// 	addTaskBtn: document.querySelector("#addNewTaskBtn"),
// 	dueDate: document.querySelector("#newTaskDueDate").value.trim(),
// };
// const showNewTaskSelector = document.querySelector("#newTaskModal");

const newTodoHandler = async event => {
	event.preventDefault();

	const title = document.querySelector("#newTaskTitle").value.trim();
	const description = document.querySelector("#newDescription").value.trim();
	const dueDate = document.querySelector("#newTaskDueDate").value.trim();

	if (title && description && dueDate) {
		const response = await fetch(`/api/tasks`, {
			method: "POST",
			body: JSON.stringify({ title, description, dueDate }),
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (response.ok) {
			showNewTaskSelector.classList.toggle("hidden");
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
	showNewTaskSelector.classList.toggle("hidden");
};

document.querySelector("#submitNewTask").addEventListener("submit", newTodoHandler);
document.querySelector(".deleteTask").addEventListener("click", deleteTodoHandler);
// changed #showAddTaskBtn to #newTaskModal
document.querySelector("#newTaskModal").addEventListener("submit", showNewTaskModal);
