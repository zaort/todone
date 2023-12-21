const router = require('express').Router();
const { List } = require('../../models');
const middleAuth = require('../../utils/authentication');

// POST route to crate a new task
router.post('/', middleAuth, async (req, res) => {
 try {
  const newTask = await List.create({
   ...req.body,
   user_id: req.session.user_id,
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
    user_id: req.session.user_id,
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
    id: req.params.id,
    user_id: req.session.user_id,
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