import React, { useContext } from "react";
import CommunityFeatures from "./CommunityFeatures";
import { AuthContext } from "../Provider/AuthProvider";

const Community = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>Please log in to access community features.</p>;

  return (
    <div>
      <CommunityFeatures userId={user.uid} />
    </div>
  );
};

export default Community;
