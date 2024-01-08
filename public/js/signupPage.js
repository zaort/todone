
const signUpPostHandler = async event => {
	event.preventDefault();
	console.log("singup post loaded");
	const username = document.querySelector("#signUpUsername").value.trim();
	const password = document.querySelector("#signUpPassword").value.trim();
	const email = document.querySelector("#signUpEmail").value.trim();

	if (email && password && username) {
		const response = await fetch("/api/users/signup", {
			method: "POST",
			body: JSON.stringify({
				email,
				password,
				username,
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

document.querySelector(".signUpForm").addEventListener("submit", signUpPostHandler);
