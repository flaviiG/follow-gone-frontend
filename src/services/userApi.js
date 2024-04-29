import axios from 'axios';

// eslint-disable-next-line no-undef
const baseUrl = process.env.API_URL;

export async function getUser() {
  try {
    const response = await axios.get(`${baseUrl}/api/v1/users/getUser`);

    const data = response.data;

    return data.data.user;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}

export async function getFollowers() {
  const response = await axios.get(`${baseUrl}/api/v1/users/getFollowers`);

  const data = response.data;

  if (data.status !== 'success') throw new Error(data.message);

  return data.data.followers;
}

export async function updateUnfollowers(unfollowList) {
  const response = await axios.patch(
    `${baseUrl}/api/v1/users/unfollowers`,
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
