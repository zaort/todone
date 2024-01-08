// const loginDomSelector = {
// 	email: document.querySelector("#logInEmail").value.trim(),
// 	password: document.querySelector("#logInPassword").value.trim(),
// 	logInBtn: document.querySelector("#loginSubmit"),
// };
console.log("Sessions js");
// const signupDomSelector = {
// 	signUpViewBtn: document.querySelector("#showSignUpForm"),
// 	email: document.querySelector("#signUpEmail").value.trim(),
// 	password: document.querySelector("#signUpPassword").value.trim(),
// 	submitSignUpBtn: document.querySelector("#submitSignUp"),
// 	username: document.querySelector("#signUpUsername").value.trim(),
// };

const loginPostHandler = async (event) => {
	event.preventDefault();
	const email = document.querySelector("#logInEmail").value.trim();
	const password = document.querySelector("#logInPassword").value.trim();

	if (email && password) {
		const response = await fetch("/api/users/login", {
			method: "POST",
			body: JSON.stringify({ email, password }),
			headers: { "Content-Type": "application/json" },
		});
		if (response.ok) {
			document.location.replace("/profile");
		} else {
			alert("Failed to log in, Please try again");
		}
	}
};

const logout = async () => {
	const response = await fetch("/api/users/logout", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
	});

	if (response.ok) {
		document.location.replace("/login");
	} else {
		alert(response.statusText);
	}
};

const signUpGetHandler = async (event) => {
	event.preventDefault();

	const response = await fetch("/api/users/signup", {
		method: "GET",
		headers: { "Content-Type": "application/json" },
	});
	if (response.ok) {
		document.location.replace("/signup");
	} else {
		response.status(500).json(err);
	}
};

// TODO: Pending not sending data to create a new user, in insomnia with the same route it works
const signUpPostHandler = async (event) => {
	event.preventDefault();
	const username = document.querySelector("#signUpUsername").value.trim();
	const email = document.querySelector("#signUpEmail").value.trim();
	const password = document.querySelector("#signUpPassword").value.trim();


	if (username && email && password) {
		const response = await fetch("/api/users/signup", {
			method: "POST",
			body: JSON.stringify({ username, email, password }),
			headers: { "Content-Type": "application/json" },
		});
		if (response.ok) {
			document.location.replace("/profile");
		} else {
			alert("Failed to sign up, Please try again");
		}
	}
};

document.querySelector("#loginForm").addEventListener("submit", loginPostHandler);
document.querySelector("#logoutBtn").addEventListener("click", logout);
document.querySelector("#signUpForm").addEventListener("submit", signUpPostHandler);
signupDomSelector.signUpViewBtn.addEventListener("click", signUpGetHandler);
