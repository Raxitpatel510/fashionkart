import { IoMdPerson } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import { BsHandbag } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IoSearch } from "react-icons/io5";
import { TbLogin } from "react-icons/tb";
import { BsFillSignIntersectionFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import axios from "axios";
import { bagItemsActions, isAdminActions, wishlistItemsActions } from "../store";

const Header = ({ isLoggedIn, setLogin }) => {
  const bagItemIds = useSelector((store) => store.bagItemIds);
  const isAdmin = useSelector((store) => store.isAdmin);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");

  const activeCategory = new URLSearchParams(location.search).get("category");

  useEffect(() => {
    if (!isLoggedIn) {
      dispatch(bagItemsActions.bagLoadedFromServer({ bagItemIds: [] }));
      dispatch(wishlistItemsActions.wishlistLoadedFromServer({ wishlistItems: [] }));
      return;
    }

    const controller = new AbortController();

    (async () => {
      try {
        const [bagResult, wishlistResult] = await Promise.all([
          axios.get(`${import.meta.env.VITE_COMMON_URL}/bag`, { withCredentials: true, signal: controller.signal }),
          axios.get(`${import.meta.env.VITE_COMMON_URL}/bag/wishlist/items`, { withCredentials: true, signal: controller.signal }),
        ]);

        dispatch(bagItemsActions.bagLoadedFromServer({ bagItemIds: bagResult.data || [] }));
        dispatch(wishlistItemsActions.wishlistLoadedFromServer({
          wishlistItems: Array.isArray(wishlistResult.data)
            ? wishlistResult.data.map((item) => item._id)
            : [],
        }));
      } catch (err) {
        if (axios.isCancel(err) || err?.code === "ERR_CANCELED") return;
        dispatch(bagItemsActions.bagLoadedFromServer({ bagItemIds: [] }));
        dispatch(wishlistItemsActions.wishlistLoadedFromServer({ wishlistItems: [] }));
      }
    })();

    return () => controller.abort();
  }, [isLoggedIn, dispatch]);

  const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_COMMON_URL}/logout`,
        {},
        { withCredentials: true },
      );
    } finally {
      dispatch(isAdminActions.setAdminState(false));
      dispatch(bagItemsActions.bagLoadedFromServer({ bagItemIds: [] }));
      dispatch(wishlistItemsActions.wishlistLoadedFromServer({ wishlistItems: [] }));
      setLogin(false);
      navigate("/login");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchText.trim();
    navigate(query ? `/?search=${encodeURIComponent(query)}` : "/");
  };

  return (
    <>
      <header>
        <div className="logo_container">
          <Link to="/">
            <img
              className="fashionKart_home"
              src="../images/fashionKart.png"
              alt="fashionKart Home"
            />
          </Link>
        </div>

        <nav className="nav_bar">
          {isAdmin && (
            <>
              <Link to="/admin/add-product">Add Product</Link>
              <Link to="/admin/modify-products">Modify Inventory</Link>
            </>
          )}
          {!isAdmin && (
            <>
              <Link
                className={activeCategory === "men" ? "nav-active" : ""}
                to="/?category=men"
              >
                Men
              </Link>
              <Link
                className={activeCategory === "women" ? "nav-active" : ""}
                to="/?category=women"
              >
                Women
              </Link>
              <Link
                className={activeCategory === "kids" ? "nav-active" : ""}
                to="/?category=kids"
              >
                Kids
              </Link>
              <Link
                className={activeCategory === "home-living" ? "nav-active" : ""}
                to="/?category=home-living"
              >
                Home & Living
              </Link>
              <Link
                className={activeCategory === "beauty" ? "nav-active" : ""}
                to="/?category=beauty"
              >
                Beauty
              </Link>
              <Link
                className={activeCategory === "studio" ? "nav-active" : ""}
                to="/?category=studio"
              >
                Studio <sup>New</sup>
              </Link>
            </>
          )}
        </nav>
        <div className="search_bar">
          <span className="material-symbols-outlined search_icon">
            <IoSearch />
          </span>
          <form onSubmit={handleSearch} className="w-100">
            <input
              className="search_input"
              placeholder="Search for products, brands and more"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
            />
          </form>
        </div>
        <div className="action_bar">
          {!isLoggedIn && (
            <>
              <Link
                to="/signup"
                className="action_container text-decoration-none text-black"
                aria-label="Sign up"
              >
                <BsFillSignIntersectionFill />
                <span className="action_name">Sign up</span>
              </Link>
              <Link
                to="/login"
                className="action_container text-decoration-none text-black"
                aria-label="Login"
              >
                <TbLogin />
                <span className="action_name">Login</span>
              </Link>
            </>
          )}

          {isLoggedIn && (
            <button
              type="button"
              className="action_container btn btn-link text-black text-decoration-none p-0 border-0 shadow-none"
              onClick={handleLogout}
              aria-label="Logout"
            >
              <TbLogin />
              <span className="action_name">Logout</span>
            </button>
          )}

          <Link
            to={isLoggedIn ? "/profile" : "/login"}
            className="action_container text-decoration-none text-black"
            aria-label="Profile"
          >
            <IoMdPerson />
            <span className="action_name">Profile</span>
          </Link>

          <Link
            to={isLoggedIn ? "/wishlist" : "/login"}
            className="action_container text-decoration-none text-black"
            aria-label="Wishlist"
          >
            <FaRegHeart />
            <span className="action_name">Wishlist</span>
          </Link>

          <Link
            to="/bag"
            className="action_container text-decoration-none text-black"
            aria-label={`Bag, ${bagItemIds.length} items`}
          >
            <span className="position-relative">
              <BsHandbag />
              {bagItemIds.length > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {bagItemIds.length}
                </span>
              )}
            </span>
            <span className="action_name">Bag</span>
          </Link>
        </div>
      </header>
    </>
  );
};
export default Header;
