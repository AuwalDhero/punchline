import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Twitter, Mail, MapPin, Phone } from 'lucide-react';
import { PMH_LOGO } from '../constants';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setSuccess(false);

    try {
      const res = await fetch('/.netlify/functions/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'newsletter',
          email,
        }),
      });

      if (!res.ok) throw new Error('Subscription failed');

      setSuccess(true);
      setEmail('');
    } catch (error) {
      alert('Subscription failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-punchline-black text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand Info */}
          <div className="space-y-6">
            <Link to="/">
              {PMH_LOGO("h-12 w-auto brightness-0 invert")}
            </Link>

            <p className="text-gray-400 leading-relaxed">
              Empowering African businesses with practical, data-driven marketing strategies and sales excellence.
            </p>

            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-gray-900 rounded-full hover:bg-punchline-blue transition-colors">
                <Linkedin size={18} />
              </a>
              <a href="#" className="p-2 bg-gray-900 rounded-full hover:bg-punchline-blue transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="p-2 bg-gray-900 rounded-full hover:bg-punchline-blue transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="p-2 bg-gray-900 rounded-full hover:bg-punchline-blue transition-colors">
                <Facebook size={18} />
              </a>
            </div>
          </div>

          {/* Solutions */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold font-heading">Solutions</h3>
            <ul className="space-y-3 text-gray-400">
              <li><Link to="/services" className="hover:text-white transition-colors">Strategic Consultancy</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Sales Training</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Market Research</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Digital Growth</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold font-heading">Connect</h3>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-start space-x-3">
                <MapPin size={20} className="text-punchline-blue flex-shrink-0" />
                <span>BUK Road, Kano, Nigeria</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={20} className="text-punchline-blue flex-shrink-0" />
                <span>+234 813 875 1002</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={20} className="text-punchline-blue flex-shrink-0" />
                <span>Use the contact form to reach us</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold font-heading">Stay Updated</h3>
            <p className="text-gray-400">
              Get the latest African marketing insights delivered to your inbox.
            </p>

            <form className="flex flex-col space-y-3" onSubmit={handleSubscribe}>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className="bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 focus:outline-none focus:border-punchline-blue"
              />

              <button
                type="submit"
                disabled={loading}
                className="bg-punchline-blue text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-70"
              >
                {loading ? 'Subscribing...' : 'Subscribe'}
              </button>

              {success && (
                <p className="text-green-500 text-sm font-medium">
                  ✅ Subscription successful!
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Punchline Marketing Hub. All Rights Reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
