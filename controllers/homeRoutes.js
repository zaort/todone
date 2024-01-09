//reviw that routes make sense and that add the delet options, duedate, etc....

const router = require("express").Router();
// Replace "List" name with model used for todo list storage on db + any other required models separaded by a comma.
const { List, User } = require("../models");
// Importing custom middleware function.
const middleAuth = require("../utils/authentication");

// This would be the 'landing page' the firs this the user sees, either the login or his profile if authenticated
router.get("/", async (req, res) => {
	if (req.session.loggedIn) {
		res.redirect("/profile");
	} else {
		res.render("login");
	}
});
router.get("/signup", async (req, res) => {
	if (req.session.loggedIn) {
		res.redirect("/profile");
	} else {
		res.render("signup");
	}
});

// This is the GET route to show the profile page (main page whe user is authenticated) where users will be shown their tasks and the option to add, delete and mark as complete.
// Quitando el res.render y req.session.userId si funciona.

// TODO: Verificar que la sesion se mantenga
router.get("/profile", middleAuth, async (req, res) => {
	try {
		console.log(req.session);
		// Find the logged in user based on the session ID
		const userdbInfo = await User.findByPk(req.session.userId, {
			attributes: { exclude: ["password"] },
			include: [{ model: List }],
		});

		const user = userdbInfo.get({ plain: true });
		/*  res.status(200).json(user); */
		console.log(user);
		res.render("profile", {
			...user,
			loggedIn: req.session.loggedIn,
		});
	} catch (err) {
		/* console.log(err);
  console.log(userdbInfo); */
		res.status(500).json(err);
	}
});

// GET route for specific wiew of the tasks
// Esta ruta ya funciona con res.status(200).json(task)
// TODO: Solo mostrar las tareas del usuario no funciona con el comentario l-66
router.get("/task/:id", async (req, res) => {
	try {
		const taskData = await List.findByPk(req.params.id, {
			include: [
				{
					model: User,
					attributes: ["username"],
				},
			],
		});

		const task = taskData.get({ plain: true });
		res.status(200).json(task);
		/*  res.render('task', {
   ...task,
   loggedIn: req.session.loggedIn
  }); */
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
