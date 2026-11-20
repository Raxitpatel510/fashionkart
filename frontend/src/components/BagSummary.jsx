import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const BagSummary = ({ bagItems = [] }) => {
  console.log("im bag summary");

  const [bagSummary, setBagSummary] = useState({
    totalItem: 0,
    totalMRP: 0,
    totalDiscount: 0,
    finalPayment: 0,
  });

  const bagItemIds = useSelector((store) => store.bagItemIds);

  useEffect(() => {
    console.log("i am useEffect of bag summary");

    let totalDiscount = 0;
    let totalMRP = 0;

    for (const item of Array.isArray(bagItems) ? bagItems : []) {
      const mrp = Number(item?.MRP) || 0;
      const actualPrice = Number(item?.actualPrice) || 0;
      totalMRP += mrp;
      totalDiscount += mrp - actualPrice;
    }

    const itemCount = Array.isArray(bagItemIds) ? bagItemIds.length : 0;
    setBagSummary({
      totalItem: itemCount,
      totalMRP,
      totalDiscount,
      finalPayment: itemCount === 0 ? 0 : totalMRP - totalDiscount + 99,
    });
  }, [bagItems, bagItemIds]);

  return (
    <>
      <div className="bag-details-container">
        <div className="price-header">
          PRICE DETAILS ({bagSummary.totalItem} Items){" "}
        </div>
        <div className="price-item">
          <span className="price-item-tag">Total MRP</span>
          <span className="price-item-value">₹{bagSummary.totalMRP}</span>
        </div>
        <div className="price-item">
          <span className="price-item-tag">Discount on MRP</span>
          <span className="price-item-value priceDetail-base-discount">
            -₹{bagSummary.totalDiscount}
          </span>
        </div>
        <div className="price-item">
          <span className="price-item-tag">Convenience Fee</span>
          <span className="price-item-value">₹99</span>
        </div>
        <hr />
        <div className="price-footer">
          <span className="price-item-tag">Total Amount</span>
          <span className="price-item-value">₹{bagSummary.finalPayment}</span>
        </div>
      </div>
      <button className="btn-place-order">
        <div className="css-xjhrni">PLACE ORDER</div>
      </button>
    </>
  );
};
export default BagSummary;
