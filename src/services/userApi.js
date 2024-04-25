import axios from 'axios';

export async function getUser() {
  const response = await axios.get(
    'https://follow-gone-api.onrender.com/api/v1/users/getUser'
  );

  const data = response.data;

  if (data.status !== 'success') throw new Error(data.message);

  return data.data.user;
}

export async function getFollowers() {
  const response = await axios.get(
    'https://follow-gone-api.onrender.com/api/v1/users/getFollowers'
  );

  const data = response.data;

  if (data.status !== 'success') throw new Error(data.message);

  return data.data.followers;
}

export async function updateUnfollowers(unfollowList) {
  const response = await axios.patch(
    'https://follow-gone-api.onrender.com/api/v1/users/unfollowers',
    {
      unfollowList,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  const data = response.data;

  if (data.status !== 'success') throw new Error(data.message);
}
