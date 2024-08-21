import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@mui/icons-material";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Topbar() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const logout = () => {
    localStorage.setItem("user", null);
    window.open("http://localhost:8800/api/auth/logout", "_self");
  };

  const handleChange = async (e) => {
    if (e.target.value === "") return setFilteredUsers([]);
    const filteredUsers = users
      .map((user) => user.username)
      .filter((username) => username.includes(e.target.value));
    setFilteredUsers(filteredUsers);
  };

  useEffect(() => {
    const getUsers = async () => {
      const res = await axios.get("http://localhost:8800/api/users/all");
      const data = res.data;
      setUsers(data);
    };
    getUsers();
  }, []);

  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Blacky</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search />
          <input
            placeholder="Search for friend,post or video"
            className="searchInput"
            onChange={(e) => handleChange(e)}
          />
          {filteredUsers && filteredUsers.length > 0 && (
            <div className="searchResults">
              {filteredUsers.map((user) => (
                <Link to={`/profile/${user}`} key={user}>
                  <div className="searchResult">{user}</div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Anasayfa</span>
          <span className="topbarLink">Keşfet</span>
          <span className="topbarLink" onClick={logout}>
            Çıkış Yap
          </span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <Link to={`/profile/${user.username}`}>
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
            className="topbarImg"
          />
        </Link>
      </div>
    </div>
  );
}
