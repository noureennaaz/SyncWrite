export default function () {
  return (
    <div>
      <footer className="bg-[#020617] text-white py-10 px-5 md:px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <h2 className="text-2xl font-bold text-slate-100">MyDocs</h2>
            <p className="text-gray-400 mt-2 text-sm">
              The ultimate note keeper for everyone. Collaborate. Create. Share.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>
                <a href="/" className="hover:text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-white">
                  About
                </a>
              </li>
              <li>
                <a href="/dashboard" className="hover:text-white">
                  Dashboard
                </a>
              </li>
              <li>
                <a href="/signup" className="hover:text-white">
                  Get Started
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="text-sm text-gray-300 space-y-2">
              <li>Email: support@mydocs.io</li>
              <li>Phone: +91 99999 99999</li>
              <li>Address: Madhya Pradesh, India🌍</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Follow Us</h3>
            <div className="flex space-x-4 text-gray-400">
              <a href="#">
                <i className="fab fa-facebook hover:text-white"></i>
              </a>
              <a href="#">
                <i className="fab fa-twitter hover:text-white"></i>
              </a>
              <a href="#">
                <i className="fab fa-linkedin hover:text-white"></i>
              </a>
              <a href="#">
                <i className="fab fa-github hover:text-white"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} MyDocs. All rights reserved. |{" "}
          <a href="/privacy" className="hover:underline">
            Privacy Policy
          </a>
        </div>
      </footer>
    </div>
  );
}
