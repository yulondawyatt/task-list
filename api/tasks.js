import requireBody from '#middleware/requireBody';
import requireUser from '#middleware/requireUser';
import { createTask, getTasksByUserId, getTaskById, updateTaskById } from '#db/queries/tasks';
import express from 'express';
const router = express.Router();

export default router;

//put before ALL routes, so that ALL routes are protected
router.use(requireUser);

// GET /tasks
router.route('/').get(async (req, res) => {
  // We need to get tasks!
  console.log(req.user);
  const tasks = await getTasksByUserId(req.user.id);
  res.send(tasks);
})
.post(requireBody(['title', 'done']), async(req,res) => {
  const {title, done} = req.body
  const task = await createTask(title, done, req.user.id);
  res.status(201).send(task);
});

// middleware for requests with the id parameter
router.param('id', async(req, res, next, id) => {
  // attempt to get task first
  const task  = await getTaskById(id);
  //if no task, send 404 Not Found

  if (!task) return res.status(404).send('Task not found.');
  // if there is a task, and its user_id does NOT match the logged-in usser's id,
  // send 403 Forbidden
  if (task.user_id !== req.user.id)
    return res.status(403).send('This is not your task.');
  //else, attach the fetched task to the req
  req.task = task;
  // kick the request on to the next step
  next();
});

router.route('/:id').put(requireBody(['title', 'done']), async (req, res) => {
  const { title, done } = req.body;
  const task = await updateTaskById(req.task.id, title, done);
  res.send(task);
});


// Confused about how to add the delete task and 403 error
router.route('/tasks/:id').delete(async (req, res, next) => {
  const tasks = await deleteTaskByUserId(req.user.id);
})