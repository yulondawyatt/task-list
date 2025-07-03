import bcrypt from 'bcrypt';
import db from '#db/client';

export const createUser = async (username, password) => {
  const SQL = `
  INSERT INTO users(username, password)
  VALUES ($1, $2)
  RETURNING *
  `;

  const hashedPassword = await bcrypt.hash(password, 10);
  const { rows: [user] } = await db.query(SQL, [username, hashedPassword]);
  return user;
}


export const getUserByUsernameAndPassword = async (username, password) => {
  // 1st try to find the user by username in db
  const SQL = `SELECT * FROM users WHERE username=$1`;
  const { rows: [user] } = await db.query(SQL, [username]);

  if(!user) return null;
  const isValid = await bcrypt.compare(password, user.password);
  if(!isValid) return null;
  return user;
  
}

export const getUserById = async (id) => {
  const SQL = `SELECT * FROM users WHERE id=$1`;
  const { rows: [user] } = await db.query(SQL, [id]);
  return user;
}