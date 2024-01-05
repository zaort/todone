const loginDomSelector = {
	email: document.querySelector("#logInEmail").value.trim(),
	password: document.querySelector("#logInPassword").value.trim(),
	logInBtn: document.querySelector("#loginSubmit"),
};

const signupDomSelector = {
	signUpViewBtn: document.querySelector("#showSignUpForm"),
	email: document.querySelector("#signUpEmail").value.trim(),
	password: document.querySelector("#signUpPassword").value.trim(),
	submitSignUpBtn: document.querySelector("#submitSignUp"),
	username: document.querySelector("#signUpUsername").value.trim(),
};

const loginPostHandler = async event => {
	event.preventDefault();
	if (loginDomSelector.email && loginDomSelector.password) {
		const response = await fetch("/api/users/login", {
			method: "POST",
			body: JSON.stringify({ email: loginDomSelector.email, password: loginDomSelector.password }),
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

// TODO: Pending not sending data to create a new user, in insomnia with the same route it works
const signUpPostHandler = async event => {
	event.preventDefault();
	if (signupDomSelector.email && signupDomSelector.password && signupDomSelector.username) {
		const response = await fetch("/api/users/signup", {
			method: "POST",
			body: JSON.stringify({
				email: loginDomSelector.email,
				password: loginDomSelector.password,
				username: loginDomSelector.username,
			}),
			headers: { "Content-Type": "application/json" },
		});
		if (response.ok) {
			document.location.replace("/login");
		} else {
			alert("Failed to sign up, Please try again");
		}
	}
};

document.querySelector("#submitLogIn").addEventListener("submit", loginPostHandler); 
document.querySelector("#logoutBtn").addEventListener("click", logout);
document.querySelector("#signUpSubmit").addEventListener("submit", signUpPostHandler);

signupDomSelector.signUpViewBtn.addEventListener("click", signUpGetHandler);
