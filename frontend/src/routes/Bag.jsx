import Footer from "../components/Footer";
import Header from "../components/Header";
import BagSummary from "../components/BagSummary";
import BagItem from "../components/BagItem";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Bag = () => {
  const dispatch = useDispatch();
  const bagItemIds = useSelector((store) => store.bagItemIds);
  const [bagItems, setBagItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const handleRemoved = (event) => {
      setBagItems((current) =>
        current.filter((item) => item._id !== event.detail),
      );
    };
    window.addEventListener("bag-item-removed", handleRemoved);

    const controller = new AbortController();
    const signal = controller.signal;

    (async () => {
      try {
        const result = await axios.get(
          `${import.meta.env.VITE_COMMON_URL}/bag/items`,
          { withCredentials: true, signal },
        );
        console.log("i got the Bag in Bag.jsx..", result.data);
        setBagItems(result.data);
      } catch (err) {
        if (axios.isCancel(err) || err?.code === "ERR_CANCELED") return;
        console.log("err occured..", err);
        if (err.response?.status === 401) navigate("/login");
      }
    })();

    return () => {
      window.removeEventListener("bag-item-removed", handleRemoved);
      controller.abort();
    };
  }, []);

  return (
    <>
      <main className="store-page">
        <div className="store-page-heading">
          <span className="store-page-kicker">YOUR SELECTION</span>
          <h1>Shopping Bag</h1>
          <p>
            {bagItemIds.length} item
            {bagItemIds.length === 1 ? "" : "s"} ready for checkout
          </p>
        </div>
        <div className="bag-page">
          <div className="bag-items-container">
            {bagItems.map((item) => (
              <BagItem key={item._id} item={item}></BagItem>
            ))}
          </div>
          <div className="bag-summary">
            <BagSummary bagItems={bagItems} />
          </div>
        </div>
      </main>
    </>
  );
};
export default Bag;
