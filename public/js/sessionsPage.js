const loginDomSelector = {
	email: document.querySelector("#email-login").value.trim(),
	password: document.querySelector("#password-login").value.trim(),
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

document.querySelector("loginForm").addEventListener("submit", loginPostHandler); // TODO: login form view name pending
document.querySelector("#logout").addEventListener("click", logout);
