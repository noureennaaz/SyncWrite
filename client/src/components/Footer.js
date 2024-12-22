export default function () {
  return (
    <div>
      <footer className="bg-slate-900 text-white py-[50px] px-0"> 
        <div class="flex flex-wrap justify-between max-w-[1200px] m-auto gap-10 py-0 px-[20px]">
          <div class=" m-[20px] uppercase tracking-wide">
            <h3>MyDocs</h3>
            <p>
              The ultimate note keeper for everyone. 
            </p>
          </div>

          <div class="footer-column">
            <h4>Quick Links</h4>
            <ul>
              <li className="mb-[15px] ">
                <a href="#home" className="font-semibold  transition-colors duration-300 hover:text-slate-500">Home</a>
              </li>
              <li className="mb-[15px] ">
                <a href="#products" className="font-semibold  transition-colors duration-300 hover:text-slate-500">Products</a>
              </li>
              <li className="mb-[15px] ">
                <a href="#about" className="font-semibold  transition-colors duration-300 hover:text-slate-500">About Us</a>
              </li>
              <li className="mb-[15px] ">
                <a href="#contact" className="font-semibold transition-colors duration-300 hover:text-slate-500">Contact</a>
              </li>
            </ul>
          </div>

          <div class="footer-column">
            <h4>Contact Us</h4>
            <ul>
              <li className="mb-[15px] ">Email: support@vv.com</li>
              <li className="mb-[15px] ">Phone: +855 (123) 123-123</li>
              <li className="mb-[15px] ">Address: nv pp yg ng</li>
            </ul>
          </div>

          <div class="footer-column">
            <h4>Follow Us</h4>
            <div class="flex">
              <a href="#">
                <i className="mr-2 hover:scale-[1.2] transition-transform fa-facebook"></i>
              </a>
              <a href="#">
                <i className="mr-2 hover:scale-[1.2] transition-transform fa fa-twitter"></i>
              </a>
              <a href="#">
                <i className="mr-2 hover:scale-[1.2] transition-transform fa fa-instagram"></i>
              </a>
              <a href="#">
                <i className="mr-2 hover:scale-[1.2] transition-transform fa fa-linkedin"></i>
              </a>
            </div>
          </div>
        </div>

        <div class="text-center mt-10 pt-5 border-t border-gray-600">
          <p>
            &copy;All Rights Reserved |{" "}
            <a href="#privacy-policy">Privacy Policy</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
