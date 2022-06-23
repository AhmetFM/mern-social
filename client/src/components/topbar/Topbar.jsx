import "./topbar.css"
import { Search, Person, Chat, Notifications } from "@mui/icons-material";
import { useContext } from "react";
import {AuthContext} from "../../context/AuthContext"
import { Link } from "react-router-dom"

export default function Topbar() {
    const logout = () => {
    window.open("http://localhost:8800/api/auth/logout", "_self");
     };
    const {user} = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <div className="topbarContainer">
            <div className="topbarLeft">
                <Link to="/" style={{textDecoration:"none"}}>
                    <span className="logo">Blacky</span>
                </Link>
                
            </div>
            <div className="topbarCenter">
                <div className="searchbar">
                    <Search />
                    <input placeholder="Search for friend,post or video" className="searchInput" />
                </div>
            </div>
            <div className="topbarRight">
                <div className="topbarLinks">
                    <span className="topbarLink">Anasayfa</span>
                    <span className="topbarLink">Keşfet</span>
                    <span className="topbarLink" onClick={logout}>Çıkış Yap</span>
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
                <Link to ={`/profile/${user.username}`}>
                <img src={ user.profilePicture ? PF + user.profilePicture : PF+"person/noAvatar.png"} alt="" className="topbarImg"/> 
                </Link>
            </div>
        </div>
    )
}
