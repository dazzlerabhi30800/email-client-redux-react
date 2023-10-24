import { Link, useLocation, useSearchParams } from "react-router-dom";

export default function Navbar() {
    const location = useLocation();
    const { pathname } = location;
    return (
        <nav>
            <p>Filter By:</p>
            <div className="filter--wrapper">
                <Link className={pathname === "/" ? "active" : ""} to="/">Unread</Link>
                <Link className={pathname === "/reads" ? "active" : ""} to="/reads">Read</Link>
                <Link className={pathname === "/favorites" ? "active" : ""} to="/favorites">Favorites</Link>
            </div>
        </nav>
    )
}