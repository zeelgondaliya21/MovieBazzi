import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.min.css";
import "../css/footer.css";

function Footer(props) {
  return (
    <div className="footer-dark">
      <footer>
        <div className="container">
          <div className="row">
            <div className="col-md-3 item">
              <h3>
                <a href="/">About Us</a>
              </h3>
              <h3>
                <a href="/">Contact Us</a>
              </h3>
            </div>
            <div className="col-md-6 text-center item text">
              <h4>MovieBazzi</h4>
            </div>
            <div className="col item social">
              <a href="/">
                <i className="fa fa-facebook" aria-hidden="true"></i>
              </a>
              <a href="/">
                <i className="fa fa-twitter" aria-hidden="true"></i>
              </a>
              <a href="/">
                <i className="fa fa-instagram" aria-hidden="true"></i>
              </a>
            </div>
          </div>
          <h3 className="copyright">MovieBazzi © {new Date().getFullYear()}</h3>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
