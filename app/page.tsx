'use client';

import { useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setSubmitted(true);
        setFormData({ firstName: '', lastName: '', email: '', phone: '', company: '' });
        setTimeout(() => setSubmitted(false), 5000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-3xl font-black text-amber-400">AMC</div>
            <div className="hidden md:flex gap-8">
              <a href="#services" className="text-sm font-semibold hover:text-amber-400 transition">Services</a>
              <a href="#proof" className="text-sm font-semibold hover:text-amber-400 transition">Proof</a>
              <a href="#contact" className="text-sm font-semibold hover:text-amber-400 transition">Contact</a>
            </div>
            <a href="tel:251-477-5676" className="hidden sm:inline bg-amber-400 text-slate-900 px-4 py-2 rounded font-bold text-sm hover:bg-amber-300 transition">251-477-5676</a>
          </div>
        </div>
      </nav>

      {/* HERO WITH GRADIENT BACKGROUND */}
      <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center py-20 px-4">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        </div>
        
        <div className="relative max-w-5xl mx-auto text-center z-10">
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black mb-6 leading-tight">
            Construction Cleaning That <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-300">Wins Bids</span>
          </h1>
          <p className="text-xl sm:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            $271K+ in active bids. AMC secures them with precision, reliability, and results that contractors trust.
          </p>
          <div className="bg-blue-950 bg-opacity-40 backdrop-blur border border-blue-400 inline-block px-8 py-4 rounded-lg mb-12 font-mono text-sm sm:text-base">
            <div className="font-bold text-blue-300">ACTIVE PIPELINE</div>
            <div className="text-amber-400 text-lg">15+ Bids | 90%+ Closing Rate | $271K+</div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#contact" className="bg-gradient-to-r from-amber-400 to-amber-300 text-slate-900 px-8 py-4 rounded-lg font-bold hover:from-amber-300 hover:to-amber-200 transition text-lg">Get Free Quote</a>
            <a href="#proof" className="border-2 border-amber-400 text-amber-400 px-8 py-4 rounded-lg font-bold hover:bg-amber-400 hover:text-slate-900 transition text-lg">See Proof</a>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="bg-slate-800 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: '15+', label: 'Active Bids', icon: '📋' },
              { number: '$271K', label: 'Pipeline Value', icon: '💰' },
              { number: '90%', label: 'Closing Rate', icon: '🎯' },
              { number: '100K+', label: 'Sq Ft Current', icon: '📐' },
            ].map((stat, i) => (
              <div key={i} className="text-center p-6 bg-slate-700 bg-opacity-50 rounded-xl border border-slate-600 hover:border-amber-400 transition">
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-4xl sm:text-5xl font-black text-amber-400 mb-2">{stat.number}</div>
                <div className="text-slate-300 font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl sm:text-6xl font-black text-center mb-16">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Final Construction', desc: '$0.25/sq ft. Post-framing through move-in ready.', color: 'from-blue-600 to-blue-400' },
              { title: 'Commercial Cleaning', desc: '$0.15/sq ft. Ongoing maintenance and deep cleaning.', color: 'from-purple-600 to-purple-400' },
              { title: 'Medical Facilities', desc: 'Premium scope. Disinfection protocols. Higher standards.', color: 'from-green-600 to-green-400' },
              { title: 'Floor Scrubbing', desc: '$0.15/sq ft. Specialized equipment and technique.', color: 'from-orange-600 to-orange-400' },
            ].map((service, i) => (
              <div key={i} className={`bg-gradient-to-br ${service.color} p-0.5 rounded-xl hover:shadow-2xl transition duration-300`}>
                <div className="bg-slate-900 p-8 rounded-xl h-full">
                  <h3 className="text-xl font-black mb-3">{service.title}</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROOF SECTION */}
      <section id="proof" className="bg-slate-800 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl sm:text-6xl font-black text-center mb-16">Proof of Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Burlington Coat Factory', desc: '100,597 sq ft | 3-phase | $15–25K', status: '🔴 Active' },
              { title: 'GoodVets 3-Location', desc: 'Medical Scope | $3,600', status: '✅ Submitted' },
              { title: 'Gap Factory 4-Location', desc: '4-Location | $11,800 Combined', status: '⏳ In Review' },
              { title: 'Active Pipeline', desc: '15+ bids across Phoenix metro', status: '📈 90% Win Rate' },
            ].map((item, i) => (
              <div key={i} className="bg-slate-700 bg-opacity-50 border border-slate-600 p-6 rounded-xl hover:border-amber-400 transition">
                <div className="text-amber-400 text-sm font-bold mb-2">{item.status}</div>
                <h3 className="font-black text-lg mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl sm:text-6xl font-black text-center mb-4">Ready to Partner?</h2>
          <p className="text-center text-slate-400 mb-12 text-lg">Get your free construction cleaning consultation.</p>

          <div className="bg-slate-800 border-2 border-slate-700 p-10 rounded-xl">
            {submitted ? (
              <div className="bg-green-900 bg-opacity-50 border border-green-400 text-green-100 px-6 py-4 rounded-lg text-center font-semibold">
                ✓ Thanks! We'll contact you within 24 hours.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    required
                    className="bg-slate-700 border-2 border-slate-600 text-white p-3 rounded-lg focus:border-amber-400 outline-none transition"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    required
                    className="bg-slate-700 border-2 border-slate-600 text-white p-3 rounded-lg focus:border-amber-400 outline-none transition"
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full bg-slate-700 border-2 border-slate-600 text-white p-3 rounded-lg focus:border-amber-400 outline-none transition"
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  className="w-full bg-slate-700 border-2 border-slate-600 text-white p-3 rounded-lg focus:border-amber-400 outline-none transition"
                />
                <input
                  type="text"
                  placeholder="Company / GC Name"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full bg-slate-700 border-2 border-slate-600 text-white p-3 rounded-lg focus:border-amber-400 outline-none transition"
                />
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-400 to-amber-300 text-slate-900 p-4 rounded-lg font-black hover:from-amber-300 hover:to-amber-200 transition text-lg"
                >
                  Get Free Quote
                </button>
              </form>
            )}
          </div>

          <div className="mt-12 text-center">
            <p className="text-slate-400 mb-4">Or call us directly:</p>
            <a href="tel:251-477-5676" className="text-5xl font-black text-amber-400 hover:text-amber-300 transition">251-477-5676</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 border-t-4 border-amber-400 py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-slate-400 mb-4">&copy; 2026 AMC Professionals LLC</p>
          <div className="text-slate-500 space-y-1 text-sm">
            <p>📞 <a href="tel:251-477-5676" className="hover:text-amber-400 transition">251-477-5676</a></p>
            <p>📧 <a href="mailto:amcprofessionalscs@gmail.com" className="hover:text-amber-400 transition">amcprofessionalscs@gmail.com</a></p>
            <p>🌐 amc-professionals.com</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
