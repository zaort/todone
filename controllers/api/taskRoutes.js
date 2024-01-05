const router = require('express').Router();
const { List } = require('../../models');
const middleAuth = require('../../utils/authentication');

// POST route to crate a new task
// Ya funciona pero sin req.session.userId en linea 18
router.post('/', middleAuth, async (req, res) => {
  const { title, description, dueDate } = req.body;

  if (!dueDate) {
    return res.status(400).json({ error: 'dueDate is required' });
  }

  try {
    const newTask = await List.create({
      title,
      description,
      userId: req.session.userId,
      dueDate,
    });

    res.status(200).json(newTask);
  } catch (err) {
    res.status(400).json(err);
  }
});


// DELETE route for task deletion

// Esta ruta funciona sin req.session.userId
// TODO: Ver si realmente necesitamos req.session.userId, ya que cada task tiene un id diferente. 
router.delete('/:id', async (req, res) => {
  try {
    const taskData = await List.destroy({
      where : { id: req.params.id},
     /*  userId: req.session.userId, */
    });

    if (!taskData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(taskData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// PUT route for updating the task status
// Ya funciona sin req.session.userId
// TODO: Ver si realmente necesitamos req.session.userId, ya que cada task tiene un id diferente.
router.put('/:id', middleAuth, async (req, res) => {
  try {
    const taskStatus = await List.update(req.body, {
      where: {
       id: req.params.id,
       /* userId: req.session.userId, */
      },
     },
    );

    if (!taskStatus) {
      res.status(404).json({ message: 'No task found with this id!' });
      return;
    }

    res.status(200).json(taskStatus);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
