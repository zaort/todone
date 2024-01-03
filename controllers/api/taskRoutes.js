const router = require('express').Router();
const { List } = require('../../models');
const middleAuth = require('../../utils/authentication');

// POST route to crate a new task
router.post('/', middleAuth, async (req, res) => {
 try {
  const newTask = await List.create({
   ...req.body,
   title: req.body.title,
   description: req.body.description,
   userId: req.session.userId,
   dueDate: req.body.dueDate,
   // verify correct syntax for dueDate
  });

  res.status(200).json(newTask);
 } catch (err) {
  res.status(400).json(err);
 }
});

// DELETE route for task deletion
router.delete('/:id', middleAuth, async (req, res) => {
 try {
  const taskData = await List.destroy({
   where: {
    id: req.params.id,
    userId: req.session.userId,
   },
  });

  if (!taskData) {
   res.status(404).json({ message: 'No project found with this id!' });
   return;
  }

  res.status(200).json(taskData);
 } catch (err) {
  res.status(400).json(err);
 }
});

// PUT route for updating the task status

router.put('/:id', middleAuth, async (req, res) => {
 try {
  // verify this makes sense for updating completition status (tru or false)
  const taskStatus = await List.update({
   where: {
    title: req.body.title,
    description: req.body.description,
    userId: req.session.userId,
    dueDate: req.body.dueDate,
   },
  });

  if (!taskStatus) {
   res.status(404).json({ message: 'No project found with this id!' });
   return;
  }

  res.status(200).json(taskStatus);
 } catch (err) {
  res.status(500).json(err);
 }
});

module.exports = router;

// try {
//  // Extract the list data from the request body
//  const { title, description, dueDate, userId } = req.body;

//  // Create a new list using the List model
//  const newList = await List.create({
//   title,
//   description,
//   dueDate,
//   userId
//  });
