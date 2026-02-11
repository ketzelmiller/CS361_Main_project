import { Link, useLocation } from "react-router-dom";

function NavBar() {
  /* Navigation bar that is persistent at the top of the screen*/
  const { pathname } = useLocation();

  const linkStyle = (to) => ({
    padding: "8px 12px",
    borderRadius: "6px",
    textDecoration: "none",
    fontWeight: 700,
    border: "1px solid #334155",
    color: "white",
    background: pathname === to ? "#334155" : "#111827",
  });

  return (
    <nav style={{ display: "flex", gap: 10, justifyContent: "center", marginBottom: 16 }}>
      <Link to="/create" style={linkStyle("/create")}>Create</Link>
      <Link to="/habits" style={linkStyle("/habits")}>View</Link>
      <Link to="/past-habits" style={linkStyle("/past-habits")}>Past Habits</Link>
      <Link to="/" style={linkStyle("/")}>Exit</Link>
    </nav>
  );
};

export default NavBar;