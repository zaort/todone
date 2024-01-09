const signUpViewBtn = document.querySelector("#showSignUpForm");
const submitSignUpBtn = document.querySelector("#submitSignUp");

const loginPostHandler = async event => {
	event.preventDefault();
	console.log("hola");
	const email = document.querySelector("#logInEmail").value.trim();
	const password = document.querySelector("#logInPassword").value.trim();
	if (email && password) {
		const response = await fetch("/api/users/login", {
			method: "POST",
			body: JSON.stringify({ email, password: password }),
			headers: { "Content-Type": "application/json" },
		});
		if (response.ok) {
			document.location.replace("/profile");
		} else {
			alert("Failed to log in, Please try again");
		}
	}
};
console.log("Script loaded");

const signUpGetHandler = async event => {
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

document.querySelector(".logInForm").addEventListener("submit", loginPostHandler);
signupDomSelector.signUpViewBtn.addEventListener("click", signUpGetHandler);
