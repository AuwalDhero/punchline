
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Upload, CheckCircle } from 'lucide-react';
import FadeIn from '../components/FadeIn';

const Contact: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <div className="pt-40 pb-24 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-green-100 text-green-600 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle size={48} />
          </div>
          <h1 className="text-5xl font-black font-heading text-punchline-black mb-4">Request Received!</h1>
          <p className="text-xl text-punchline-gray mb-12">
            Thank you for reaching out. One of our strategy experts will review your brief and contact you within 24 hours.
          </p>
          <a href="#/" className="bg-punchline-blue text-white px-12 py-4 rounded-full font-bold text-xl hover:bg-blue-700 transition-all">
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
            <FadeIn direction="right">
              <div className="space-y-8">
                <h1 className="text-5xl md:text-7xl font-black font-heading leading-tight">Let's Fuel Your Growth</h1>
                <p className="text-xl text-gray-400 leading-relaxed max-w-xl">
                  Ready to transform your marketing? Fill out the form or reach out via our contact channels.
                </p>
                <div className="space-y-6 pt-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-gray-900 rounded-2xl flex items-center justify-center text-punchline-blue">
                      <Mail size={24} />
                    </div>
                    <div>
                      <p className="text-gray-400 font-bold uppercase text-xs tracking-widest">Email Us</p>
                      <p className="text-xl font-bold">Punchlinemarketinghub@gmail.com</p>
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
                      <p className="text-gray-400 font-bold uppercase text-xs tracking-widest">Lagos HQ</p>
                      <p className="text-xl font-bold">BUK Road, Kano, Nigeria</p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="left" delay={0.2}>
              <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
                <form onSubmit={handleSubmit} className="space-y-6 text-punchline-black">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold uppercase tracking-widest text-gray-400">Full Name</label>
                      <input required type="text" className="w-full bg-punchline-light border-none rounded-xl px-4 py-4 focus:ring-2 focus:ring-punchline-blue outline-none" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold uppercase tracking-widest text-gray-400">Company Name</label>
                      <input required type="text" className="w-full bg-punchline-light border-none rounded-xl px-4 py-4 focus:ring-2 focus:ring-punchline-blue outline-none" placeholder="Acme Inc." />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-widest text-gray-400">Business Email</label>
                    <input required type="email" className="w-full bg-punchline-light border-none rounded-xl px-4 py-4 focus:ring-2 focus:ring-punchline-blue outline-none" placeholder="john@acme.com" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-widest text-gray-400">Service Interested In</label>
                    <select className="w-full bg-punchline-light border-none rounded-xl px-4 py-4 focus:ring-2 focus:ring-punchline-blue outline-none appearance-none cursor-pointer">
                      <option>Strategic Consultancy</option>
                      <option>Sales & Marketing Training</option>
                      <option>Market Research & Insights</option>
                      <option>Full Marketing Audit</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-widest text-gray-400">Message / Brief</label>
                    <textarea rows={4} className="w-full bg-punchline-light border-none rounded-xl px-4 py-4 focus:ring-2 focus:ring-punchline-blue outline-none" placeholder="Tell us about your challenges..."></textarea>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-widest text-gray-400">Attach Brief (PDF/DOC)</label>
                    <div className="relative group">
                      <input type="file" className="hidden" id="file-upload" />
                      <label htmlFor="file-upload" className="flex items-center justify-center space-x-2 w-full bg-punchline-light border-2 border-dashed border-gray-300 hover:border-punchline-blue rounded-xl px-4 py-6 cursor-pointer transition-colors group-hover:bg-blue-50">
                        <Upload className="text-gray-400 group-hover:text-punchline-blue" />
                        <span className="text-gray-500 group-hover:text-punchline-blue font-medium">Click to upload brief</span>
                      </label>
                    </div>
                  </div>

                  <button 
                    disabled={isLoading}
                    type="submit" 
                    className="w-full bg-punchline-blue text-white py-5 rounded-full font-black text-xl hover:bg-blue-700 transition-all shadow-xl flex items-center justify-center space-x-2 disabled:opacity-70"
                  >
                    {isLoading ? <span className="animate-pulse">Processing...</span> : <><span>Request Free Audit</span> <Send size={20} /></>}
                  </button>
                  <p className="text-center text-xs text-gray-400">By submitting, you agree to our privacy policy regarding data handling.</p>
                </form>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="h-[400px] bg-gray-200 relative grayscale hover:grayscale-0 transition-all">
        <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-bold">
           <MapPin size={48} className="mb-2" />
           <span className="absolute mt-16 text-sm uppercase tracking-widest">Google Maps Integration - Lagos HQ</span>
        </div>
      </section>
    </div>
  );
};

export default Contact;
