import { useDispatch } from "react-redux";
import { bagItemsActions } from "../store";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
axios.defaults.withCredentials = true;

const BagItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleRemoveFromBag = async (e) => {
    const result = await axios.delete(
      `${import.meta.env.VITE_COMMON_URL}/bag/${item._id}`,
    );
    console.log(result.data);
    dispatch(bagItemsActions.removeFromBag({ itemId: item._id }));
    window.dispatchEvent(new CustomEvent("bag-item-removed", { detail: item._id }));
  };

  const returnDays = item.return_period || 14;
  const deliveryDate = item.delivery_date || "Within 3–5 days";

  return (
    <>
      <div className="bag-item-container">
        <div className="item-left-part">
          <img
            className="bag-item-img"
            src={item.photo || "/images/1.jpg"}
            alt={item.title || "Bag product"}
          />
        </div>

        <div className="item-right-part">
          <div className="bag-item-kicker">FASHION KART</div>
          <div className="company">{item.title}</div>
          <div className="item-name">{item.description}</div>

          <div className="price-container">
            <span className="current-price">₹{item.actualPrice}</span>
            <span className="original-price">₹{item.MRP}</span>
            <span className="discount-percentage">{item.discounts}% OFF</span>
          </div>

          <div className="bag-item-meta">
            <div className="return-period">
              <span className="return-period-days">{returnDays} days</span>
              <span>easy return available</span>
            </div>
            <div className="delivery-details">
              <span>Delivery by</span>
              <span className="delivery-details-days">{deliveryDate}</span>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="remove-from-cart"
          onClick={handleRemoveFromBag}
          aria-label={`Remove ${item.title} from bag`}
        >
          <RxCross2 />
        </button>
      </div>
    </>
  );
};
export default BagItem;
