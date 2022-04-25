import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// mocked database
const users = {};

async function getUsers() {
  return users;
}

async function createUser(user) {
  const encryptedPassword = await bcrypt.hash(user.password, 1);

  users[user.username] = {
    password: encryptedPassword,
    role: user.role,
  };
}

async function login(user) {
  const databaseUser = users[user.username];

  if (databaseUser) {
    const passMatches = bcrypt.compareSync(
      user.password,
      databaseUser.password
    );

    if (passMatches) {
      const token = jwt.sign(
        {
          role: databaseUser.role,
        },
        'secretKey',
        {
          expiresIn: 300,
        }
      );

      return token;
    } else {
      throw new Error('Invalid password!');
    }
  } else {
    throw new Error('User not found!');
  }
}

export default { getUsers, createUser, login };
