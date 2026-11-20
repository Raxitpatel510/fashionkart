import { useDispatch, useSelector } from "react-redux";
import { bagItemsActions, itemListActions, wishlistItemsActions } from "../store";
import { BsFillHandbagFill } from "react-icons/bs";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";
import { FaHeart, FaRegHeart } from "react-icons/fa";

import axios from "axios";
axios.defaults.withCredentials = true;

const HomeItem = ({ item }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddtoBag = async () => {
    try {
      const result = await axios.post(
        `${import.meta.env.VITE_COMMON_URL}/bag/${item._id}`,
      );
      console.log(result.data);
      dispatch(bagItemsActions.addToBag({ itemId: item._id }));
    } catch (err) {
      navigate("/login");
    }
  };
  const handleDelete = async (e, pid) => {
    try {
      console.log("processing remove product..");
      await axios.delete(
        `${import.meta.env.VITE_COMMON_URL}/admin/remove-product/${pid}`,
      );
      console.log("removed succesfully..");
      dispatch(itemListActions.removeItem({ pid }));
      navigate("/");
    } catch (err) {
      console.log("Failed to remove product..", err);
    }
  };
  const handleEdit = async (pid) => {
    navigate(`/admin/add-product/${pid}`);
  };
  const handleToggleWishlist = async (pid) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_COMMON_URL}/wishlist/${pid}`,
      );
      dispatch(wishlistItemsActions.toggleWishlist({ itemId: pid }));
      console.log(response.data);
    } catch (err) {
      navigate("/login");
    }
  };

  const bagItemIds = useSelector((store) => store.bagItemIds);
  const wishlistItemIds = useSelector((store) => store.wishlistItems);
  const isAdmin = useSelector((store) => store.isAdmin);
  const isWishlisted = Array.isArray(wishlistItemIds) && wishlistItemIds.includes(item._id);

  const handleWishlist = async () => {
    try {
      if (isWishlisted) {
        await axios.delete(`${import.meta.env.VITE_COMMON_URL}/bag/wishlist/${item._id}`);
        dispatch(wishlistItemsActions.removeFromWishlist({ itemId: item._id }));
      } else {
        await axios.post(`${import.meta.env.VITE_COMMON_URL}/bag/wishlist/${item._id}`);
        dispatch(wishlistItemsActions.addToWishlist({ itemId: item._id }));
      }
    } catch (err) {
      navigate("/login");
    }
  };

  return (
    <>
      <div className="item-container">
        {!isAdmin && (
          <button
            type="button"
            className={`wishlist-heart ${isWishlisted ? "is-wishlisted" : ""}`}
            onClick={handleWishlist}
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            {isWishlisted ? <FaHeart /> : <FaRegHeart />}
          </button>
        )}
        <img
          className="item-image"
          src={item.photo || "/images/1.jpg"}
          alt={item.title || "Product image"}
          loading="lazy"
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = "/images/1.jpg";
          }}
        />
        <div className="rating">
          {item.rating} ⭐ | {item.reviewNumbers}
        </div>
        <div className="company-name">{item.title}</div>
        <div className="item-name">{item.description}</div>
        <div className="price">
          <span className="current-price">Rs {item.actualPrice}</span>
          <span className="original-price">Rs {item.MRP}</span>
          <span className="discount">({item.discounts}% OFF)</span>
        </div>
        {!isAdmin && (
          <>
            {!bagItemIds.includes(item._id) ? (
              <button
                className="btn-add-bag text-white fw-bold"
                onClick={handleAddtoBag}
              >
                <BsFillHandbagFill />
                <span className="m-2">ADD TO BAG</span>
              </button>
            ) : (
              <Link to="/bag">
                <button className="btn-add-bag text-white fw-bold">
                  <span className="m-2">GO TO BAG</span>
                  <FaArrowRightLong />
                </button>
              </Link>
            )}
          </>
        )}
        {isAdmin && (
          <>
            <button
              className="btn-add-bag text-white fw-bold"
              onClick={() => handleEdit(item._id)}
            >
              <RiEdit2Fill />
              <span className="m-2">Edit Details</span>
            </button>
            <button
              className="btn-add-bag text-white fw-bold"
              onClick={(e) => handleDelete(e, item._id)}
            >
              <MdDelete />
              <span className="m-2">Delete Details</span>
            </button>
          </>
        )}
      </div>
    </>
  );
};
export default HomeItem;
