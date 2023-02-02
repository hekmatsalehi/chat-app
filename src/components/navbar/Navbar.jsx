import "./navbar.scss";

function Navbar() {
  return (
    <div className="navbar">
      <span className="logo">Sky Chat</span>
      <div className="user">
        <img
          src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fG1lbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
          alt=""
        />
        <span>Tom</span>
        <button>Logout</button>
      </div>
    </div>
  );
}

export default Navbar;
