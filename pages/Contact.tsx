import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Upload, CheckCircle } from 'lucide-react';
import FadeIn from '../components/FadeIn';

const Contact: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    email: '',
    service: 'Strategic Consultancy',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch('/.netlify/functions/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'contact',
          ...formData,
        }),
      });

      if (!res.ok) throw new Error('Failed to send message');

      setIsSubmitted(true);
    } catch (error) {
      alert('Failed to submit form. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="pt-40 pb-24 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-green-100 text-green-600 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle size={48} />
          </div>

          <h1 className="text-5xl font-black font-heading text-punchline-black mb-4">
            Request Received!
          </h1>

          <p className="text-xl text-punchline-gray mb-12">
            Thank you for reaching out. One of our strategy experts will contact you within 24 hours.
          </p>

          <a
            href="/"
            className="bg-punchline-blue text-white px-12 py-4 rounded-full font-bold text-xl hover:bg-blue-700 transition-all"
          >
            Return to Homepage
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      <section className="bg-punchline-black text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left Content */}
            <FadeIn direction="right">
              <div className="space-y-8">
                <h1 className="text-5xl md:text-7xl font-black font-heading leading-tight">
                  Let's Fuel Your Growth
                </h1>

                <p className="text-xl text-gray-400 max-w-xl">
                  Ready to transform your marketing? Fill out the form or reach out via our contact channels.
                </p>

                <div className="space-y-6 pt-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-gray-900 rounded-2xl flex items-center justify-center text-punchline-blue">
                      <Mail size={24} />
                    </div>
                    <div>
                      <p className="text-gray-400 font-bold uppercase text-xs tracking-widest">Email Us</p>
                      <p className="text-xl font-bold">Use the contact form below</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-gray-900 rounded-2xl flex items-center justify-center text-punchline-blue">
                      <Phone size={24} />
                    </div>
                    <div>
                      <p className="text-gray-400 font-bold uppercase text-xs tracking-widest">Call Directly</p>
                      <p className="text-xl font-bold">+234 813 875 1002</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-gray-900 rounded-2xl flex items-center justify-center text-punchline-blue">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <p className="text-gray-400 font-bold uppercase text-xs tracking-widest">Office</p>
                      <p className="text-xl font-bold">BUK Road, Kano, Nigeria</p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Form */}
            <FadeIn direction="left" delay={0.2}>
              <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-2xl">
                <form onSubmit={handleSubmit} className="space-y-6 text-punchline-black">

                  <div className="grid md:grid-cols-2 gap-6">
                    <input
                      required
                      name="fullName"
                      placeholder="Full Name"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="input-field"
                    />
                    <input
                      required
                      name="company"
                      placeholder="Company Name"
                      value={formData.company}
                      onChange={handleChange}
                      className="input-field"
                    />
                  </div>

                  <input
                    required
                    type="email"
                    name="email"
                    placeholder="Business Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input-field"
                  />

                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="input-field"
                  >
                    <option>Strategic Consultancy</option>
                    <option>Sales & Marketing Training</option>
                    <option>Market Research & Insights</option>
                    <option>Full Marketing Audit</option>
                  </select>

                  <textarea
                    rows={4}
                    name="message"
                    placeholder="Tell us about your challenges..."
                    value={formData.message}
                    onChange={handleChange}
                    className="input-field"
                  />

                  <label className="flex items-center justify-center gap-2 border-2 border-dashed border-gray-300 rounded-xl py-6 cursor-pointer hover:border-punchline-blue">
                    <Upload />
                    <span>Attach Brief (PDF/DOC)</span>
                    <input type="file" className="hidden" />
                  </label>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-punchline-blue text-white py-5 rounded-full font-black text-xl flex items-center justify-center gap-2 hover:bg-blue-700 disabled:opacity-70"
                  >
                    {isLoading ? 'Processing...' : <>Request Free Audit <Send size={20} /></>}
                  </button>

                  <p className="text-center text-xs text-gray-400">
                    By submitting, you agree to our privacy policy.
                  </p>
                </form>
              </div>
            </FadeIn>

          </div>
        </div>
      </section>

      <section className="h-[400px] bg-gray-200 flex items-center justify-center text-gray-400">
        <MapPin size={48} />
      </section>
    </div>
  );
};

export default Contact;
