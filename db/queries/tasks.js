import db from '#db/client';

export const createTask = async (title, done, userId) => {
  const SQL = `
    INSERT INTO tasks(title, done, user_id)
    VALUES($1, $2, $3)
    RETURNING *
  `;

  const { rows: [task]} = await db.query(SQL, [title, done, userId]);
  return task;
};

export const getTasksByUserId = async (userId) => {
  const SQL = `SELECT * FROM tasks WHERE user_id=$1`;
  const { rows: tasks } = await db.query(SQL, [userId]);
  return tasks;
};

export const getTaskById = async (id) => {
  const SQL = `SELECT * FROM tasks WHERE id=$1`;
  const { rows: [task] } = await db.query(SQL, [id]);
  return task;
};


export const updateTaskById = async (id, title, done) => {
  const SQL = `UPDATE tasks SET title=$2, done=$3 WHERE id=$1
  RETURNING *`;

  const { rows: [task] } = await db.query(SQL, [id, title, done]);
  return task;
};


export const deleteTaskByUserId = async (userId) => {
  const SQL = `DELETE FROM tasks WHERE user_id=$1
  RETURNING *`;
  const { rows: [task] } = await db.query(SQL, [userId]);
  return task;
};