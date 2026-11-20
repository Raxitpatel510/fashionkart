import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import HomeItem from "../components/HomeItem";
import { wishlistItemsActions } from "../store";

const Wishlist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const wishlistItemIds = useSelector((store) => store.wishlistItems);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      try {
        const result = await axios.get(
          `${import.meta.env.VITE_COMMON_URL}/bag/wishlist/items`,
          { withCredentials: true, signal: controller.signal },
        );
        const wishlistItems = Array.isArray(result.data) ? result.data : [];
        setItems(wishlistItems);
        dispatch(wishlistItemsActions.wishlistLoadedFromServer({
          wishlistItems: wishlistItems.map((item) => item._id),
        }));
      } catch (err) {
        if (axios.isCancel(err) || err?.code === "ERR_CANCELED") return;
        if (err.response?.status === 401) navigate("/login");
      } finally {
        setLoading(false);
      }
    })();

    return () => controller.abort();
  }, [dispatch, navigate]);

  useEffect(() => {
    setItems((current) =>
      current.filter((item) =>
        Array.isArray(wishlistItemIds) && wishlistItemIds.includes(item._id)
      ),
    );
  }, [wishlistItemIds]);

  return (
    <main className="store-page wishlist-page">
      <div className="store-page-heading">
        <span className="store-page-kicker">YOUR FAVOURITES</span>
        <h1>My Wishlist</h1>
        <p>{items.length} curated item{items.length === 1 ? "" : "s"} saved for later</p>
      </div>
      {loading ? (
        <div className="store-empty-state"><div className="store-spinner" />Loading wishlist...</div>
      ) : items.length === 0 ? (
        <div className="store-empty-state">
          <div className="store-empty-icon">♡</div>
          <h2>Your wishlist is empty</h2>
          <p>Save the styles you love and find them here anytime.</p>
          <button type="button" onClick={() => navigate("/")} className="btn-place-order">EXPLORE PRODUCTS</button>
        </div>
      ) : (
        <div className="items-container">
          {items.map((item) => (
            <HomeItem key={item._id} item={item} />
          ))}
        </div>
      )}
    </main>
  );
};

export default Wishlist;
