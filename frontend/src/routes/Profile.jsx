import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      try {
        const result = await axios.get(
          `${import.meta.env.VITE_COMMON_URL}/profile`,
          { withCredentials: true, signal: controller.signal },
        );
        setProfile(result.data);
      } catch (err) {
        if (axios.isCancel(err) || err?.code === "ERR_CANCELED") return;
        if (err.response?.status === 401) navigate("/login");
        else setError("Unable to load your profile.");
      }
    })();

    return () => controller.abort();
  }, [navigate]);

  return (
    <main className="store-page profile-page">
      <div className="profile-card card">
        <div className="profile-hero">
          <div className="profile-avatar">
            {profile?.firstName?.charAt(0)?.toUpperCase() || "U"}
          </div>
          <span className="store-page-kicker">MY ACCOUNT</span>
          <h1>{profile ? `${profile.firstName} ${profile.lastName}` : "Your Profile"}</h1>
        </div>
        <div className="profile-card-body">
          {error && <div className="alert alert-danger">{error}</div>}
          {!profile && !error && <div className="store-empty-state"><div className="store-spinner" />Loading profile...</div>}
          {profile && (
            <div className="profile-details">
              <div><span>Name</span><strong>{profile.firstName} {profile.lastName}</strong></div>
              <div><span>Email address</span><strong>{profile.email}</strong></div>
              <div><span>Account type</span><strong className="text-capitalize">{profile.userType}</strong></div>
              <div><span>Gender</span><strong className="text-capitalize">{profile.gender}</strong></div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Profile;
