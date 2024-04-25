import axios from 'axios';

export async function login(email, password) {
  const response = await axios.post(
    'https://follow-gone-api.onrender.com/api/v1/users/login',
    {
      email,
      password,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  const data = response.data;

  if (data.status !== 'success') throw new Error(data.message);

  return { token: data.token, user: data.data.user };
}

export async function signup(newUser) {
  const { email, password, passwordConfirm, instagramUsername } = newUser;
  const response = await axios.post(
    'https://follow-gone-api.onrender.com/api/v1/users/signup',
    {
      email,
      password,
      passwordConfirm,
      instagramUsername,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  const data = response.data;

  if (data.status !== 'success') throw new Error(data.message);

  return { token: data.token, user: data.data.user };
}
