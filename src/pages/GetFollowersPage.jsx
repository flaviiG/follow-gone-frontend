import { useAuth } from '../provider/authProvider';
import Button from '../ui/Button';
import Spinner from '../ui/Spinner';
import {
  getFollowers as getFollowersApi,
  updateUnfollowers,
} from '../services/userApi';
import { useState } from 'react';

function GetFollowersPage() {
  const { user, setUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  async function getFollowers() {
    try {
      setIsLoading(true);

      const newFollowersList = await getFollowersApi();
      const currentFollowersList = user.followerList;

      // If the user is new just store the followers
      if (currentFollowersList.length === 0) {
        setUser({
          ...user,
          followerList: newFollowersList,
        });
        setIsLoading(false);
        return;
      }

      // Find unfollowers
      const newFollowersSet = new Set();
      newFollowersList.forEach((follower) =>
        newFollowersSet.add(follower.userId)
      );

      const unfollowers = [];
      currentFollowersList.forEach((follower) => {
        if (!newFollowersSet.has(follower.userId)) {
          unfollowers.push(follower);
        }
      });

      await updateUnfollowers(unfollowers);

      setUser({
        ...user,
        followerList: newFollowersList,
        unfollowList: unfollowers,
      });
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="text-slate-100 flex items-center justify-between flex-col h-full w-full">
      <div className="sm:max-w-[550px] max-w-[400px] h-full py-8 flex flex-col justify-between">
        <div className="">
          <p className="text-3xl font-semibold text-center">
            Click to get followers and find who unfollowed you
          </p>
        </div>
        <div className="flex justify-between items-center h-[60%] bg-slate-700 w-full rounded-lg p-2 shadow-xl">
          {!user || isLoading ? (
            <>
              <div></div>
              <Spinner />
              <div></div>
            </>
          ) : (
            <>
              <div className="flex flex-col items-center h-full">
                <p className="font-bold text-xl">User details</p>
                <div className="py-4 flex flex-col gap-4">
                  <div>
                    <p className="text-center">Instagram username:</p>
                    <p className="font-semibold text-center">
                      {user.instagramUsername}
                    </p>
                  </div>
                  <div>
                    <p className="text-center">Followers:</p>
                    <p className="font-semibold text-center">
                      {user.followerList.length}
                    </p>
                  </div>
                  <div>
                    <p className="text-center">Recent unfollowers:</p>
                    <p className="font-semibold text-center">
                      {user.unfollowList.length}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center h-full w-[30%] gap-3">
                <p>Followers list:</p>
                <div className="overflow-auto flex flex-col gap-2 w-full">
                  {user.followerList.map((f) => (
                    <div key={f.userId}>
                      <p className="font-semibold">{f.username}</p>
                      <p className="font-thin text-xs text-slate-400">
                        {f.userId}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-center h-full w-[30%] gap-3">
                <p>Unfollow list:</p>
                <div className="overflow-auto flex flex-col gap-2 w-full">
                  {user.unfollowList.map((f) => (
                    <div key={f.userId}>
                      <p className="font-semibold">{f.username}</p>
                      <p className="font-thin text-xs text-slate-400">
                        {f.userId}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
        <div className="flex flex-col items-center gap-4">
          <p className="text-center">
            <span className="font-bold">Note:</span> The time it takes to get
            your followers depends on the amount of followers you have
          </p>
          <Button disabled={isLoading} onClick={getFollowers}>
            Start
          </Button>
        </div>
      </div>
    </div>
  );
}

export default GetFollowersPage;
