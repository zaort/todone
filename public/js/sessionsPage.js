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

// const logout = async () => {
// 	const response = await fetch("/api/users/logout", {
// 		method: "POST",
// 		headers: { "Content-Type": "application/json" },
// 	});

// 	if (response.ok) {
// 		document.location.replace("/login");
// 	} else {
// 		alert(response.statusText);
// 	}
// };

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

// // TODO: Pending not sending data to create a new user, in insomnia with the same route it works
// const signUpPostHandler = async event => {
// 	event.preventDefault();
// 	console.log("singup post loaded");
// 	const username = document.querySelector("#signUpUsername").value.trim();
// 	const password = document.querySelector("#signUpPassword").value.trim();
// 	const email = document.querySelector("#signUpEmail").value.trim();

// 	if (email && password && username) {
// 		const response = await fetch("/api/users/signup", {
// 			method: "POST",
// 			body: JSON.stringify({
// 				email,
// 				password,
// 				username,
// 			}),
// 			headers: { "Content-Type": "application/json" },
// 		});
// 		if (response.ok) {
// 			document.location.replace("/login");
// 		} else {
// 			alert("Failed to sign up, Please try again");
// 		}
// 	}
// };
// console.log("Script loaded");

document.querySelector(".logInForm").addEventListener("submit", loginPostHandler);
// document.querySelector("#logoutBtn").addEventListener("click", logout);
// document.querySelector(".signUpForm").addEventListener("submit", signUpPostHandler);
signupDomSelector.signUpViewBtn.addEventListener("click", signUpGetHandler);
