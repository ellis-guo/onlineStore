import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Navbar />
      <main style={{ flex: 1, padding: "40px 20px" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <h1>Profile</h1>

          <div style={{ marginTop: "20px" }}>
            <p>
              <strong>Username:</strong> {user?.username || "N/A"}
            </p>
            <p>
              <strong>Email:</strong> {user?.email || "N/A"}
            </p>
            {user?.fullName && (
              <p>
                <strong>Full Name:</strong> {user.fullName}
              </p>
            )}
          </div>

          <button
            onClick={handleLogout}
            style={{
              marginTop: "30px",
              padding: "12px 30px",
              backgroundColor: "#dc3545",
              color: "white",
              border: "none",
              borderRadius: "4px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Profile;
