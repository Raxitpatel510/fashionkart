const Footer = () => {
  return (
    <footer>
      <div className="footer_container">
        <div className="footer_column">
          <h3>ONLINE SHOPPING</h3>
          <a href="/?category=men">Men</a>
          <a href="/?category=women">Women</a>
          <a href="/?category=kids">Kids</a>
          <a href="/?category=home-living">Home & Living</a>
          <a href="/?category=beauty">Beauty</a>
        </div>

        <div className="footer_column">
          <h3>CUSTOMER POLICIES</h3>
          <a href="#">Contact Us</a>
          <a href="#">FAQ</a>
          <a href="#">Track Orders</a>
          <a href="#">Shipping</a>
          <a href="#">Returns</a>
        </div>

        <div className="footer_column">
          <h3>USEFUL LINKS</h3>
          <a href="#">About Us</a>
          <a href="#">Blog</a>
          <a href="#">Careers</a>
          <a href="#">Gift Cards</a>
          <a href="#">FashionKart Insider</a>
        </div>
      </div>

      <div className="copyright">
        © 2026 www.fashionKart.com. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
