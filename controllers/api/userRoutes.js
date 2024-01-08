const router = require("express").Router();
const { User } = require("../../models");

// Where is the session saved? Why is it a Post route for creating the session? I understand this as if we were validating credentials and creating (post) a session

// POST Route defined for creating a new user
// Ruta ya funciona
router.post("/signup", async (req, res) => {
	try {
		const { username, email, password } = req.body;
		const userdbInfo = await User.create({ username, email, password });

		req.session.loggedIn = true;
		req.session.userId = userdbInfo.id;
		res.status(200).json(userdbInfo);
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

// POST route for Login
// Ruta ya funciona
router.post("/login", async (req, res) => {
	try {
		const userdbInfo = await User.findOne({
			where: {
				email: req.body.email,
			},
		});
		// Email validation
		if (!userdbInfo) {
			res.status(400).json({ message: "Wrong email or password. Please try again!" });
		}
		// Password validation
		const correctPassword = await userdbInfo.checkPassword(req.body.password);
		if (!correctPassword) {
			res.status(400).json({ message: "Wrong email or password. Please try again!" });
		}
		// Successfull login (what is this posting to the server? Why is this POST?)
		req.session.save(() => {
			req.session.loggedIn = true;
			req.session.userId = userdbInfo.id;

			res.status(200).json({ user: userdbInfo, message: "Logged in successfully" });
		});
		// is this for any other error?
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

// POST route for logout
router.post("/logout", async (req, res) => {
	if (req.session.loggedIn) {
		req.session.destroy(() => {
			res.status(204).end();
		});
	} else {
		res.status(204).end();
	}
});

// why is module exports not green as in other examples? Does it affect anything?
module.exports = router;
