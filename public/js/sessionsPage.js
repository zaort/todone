const { response } = require("express");

const loginDomSelector = {
	email: document.querySelector("#logInEmail").value.trim(),
	password: document.querySelector("#logInPassword").value.trim(),
	logInBtn: document.querySelector("#submitLogIn"),
};

const signupDomSelector = {
	signUpViewBtn: document.querySelector("#showSignUpForm"),
	email: document.querySelector("#signUpEmail").value.trim(),
	password: document.querySelector("#signUpPassword").value.trim(),
	submitSignUpBtn: document.querySelector("#submitSignUp"),
};

const loginPostHandler = async event => {
	event.preventDefault();

	if (loginDomSelector.email && loginDomSelector.password) {
		const response = await fetch("/api/user/login", {
			method: "POST",
			body: JSON.stringify({ email: loginDomSelector.email, password: loginDomSelector.password }),
			headers: { "Content-Type": "application/json" },
		});
		if (response.ok) {
			document.location.replace("/");
		} else {
			alert("Failed to log in, Please try again");
		}
	}
};

const logout = async () => {
	const response = await fetch("/api/user/logout", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
	});

	if (response.ok) {
		document.location.replace("/login");
	} else {
		alert(response.statusText);
	}
};

const signUpGetHandler = async event => {
	event.preventDefault();

	const response = await fetch("/api/user/signup", {
		method: "GET",
		headers: { "Content-Type": "application/json" },
	});
	if (response.ok) {
		document.location.replace("/signup");
	} else {
		response.status(500).json(err);
	}
};
const signUpPostHandler = async event => {
	event.preventDefault();
	if (signupDomSelector.email && signupDomSelector.password && signupDomSelector.username) {
		const response = await fetch("/api/user/signup", {
			method: "POST",
			body: JSON.stringify({
				email: loginDomSelector.email,
				password: loginDomSelector.password,
				username: loginDomSelector.username,
			}),
			headers: { "Content-Type": "application/json" },
		});
		if (response.ok) {
			document.location.replace("/api/user/login");
		} else {
			alert("Failed to sign up, Please try again");
		}
	}
};

document.querySelector("submitLogIn").addEventListener("submit", loginPostHandler); // TODO: login form view name pending
document.querySelector("#logoutBtn").addEventListener("click", logout);
document.querySelector("#signUpSubmit").addEventListener("click", signUpPostHandler);

signupDomSelector.signUpViewBtn.addEventListener("click", signUpGetHandler);
