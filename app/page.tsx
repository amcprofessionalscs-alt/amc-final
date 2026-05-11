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
            <div className="text-3xl font-black text-amber-400">AMC Professionals</div>
            <div className="hidden md:flex gap-8">
              <a href="#services" className="text-sm font-semibold hover:text-amber-400 transition">Services</a>
              <a href="#projects" className="text-sm font-semibold hover:text-amber-400 transition">Projects</a>
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
            Commercial Cleaning <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-300">Phoenix & Scottsdale</span>
          </h1>
          <p className="text-xl sm:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Professional post-construction and commercial cleaning services trusted by contractors across the Phoenix metro area.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#contact" className="bg-gradient-to-r from-amber-400 to-amber-300 text-slate-900 px-8 py-4 rounded-lg font-bold hover:from-amber-300 hover:to-amber-200 transition text-lg">Get Free Quote</a>
            <a href="#projects" className="border-2 border-amber-400 text-amber-400 px-8 py-4 rounded-lg font-bold hover:bg-amber-400 hover:text-slate-900 transition text-lg">View Projects</a>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE AMC */}
      <section className="bg-slate-800 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-black text-center mb-16">Why Contractors Choose AMC</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: '✓', title: 'Licensed & Insured', desc: 'Full commercial liability coverage and workers comp protection' },
              { icon: '⚡', title: 'Fast Turnaround', desc: 'Coordinated scheduling to meet your project deadlines' },
              { icon: '💼', title: 'Professional Team', desc: 'Trained crews with commercial construction experience' },
            ].map((item, i) => (
              <div key={i} className="text-center p-8 bg-slate-700 bg-opacity-50 rounded-xl border border-slate-600 hover:border-amber-400 transition">
                <div className="text-5xl mb-4 text-amber-400">{item.icon}</div>
                <h3 className="text-xl font-black mb-3">{item.title}</h3>
                <p className="text-slate-300 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl sm:text-6xl font-black text-center mb-6">Our Services</h2>
          <p className="text-center text-slate-400 mb-16 text-lg max-w-3xl mx-auto">
            Professional cleaning services for commercial construction, retail, medical facilities, and more across Phoenix, Scottsdale, Tempe, and Goodyear.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                title: 'Post-Construction Cleaning', 
                desc: 'Final clean after construction. Dust removal, fixture polish, floor care, and move-in ready detailing.', 
                color: 'from-blue-600 to-blue-400',
                price: 'From $0.25/sq ft'
              },
              { 
                title: 'Commercial Janitorial', 
                desc: 'Ongoing maintenance for retail, office, and commercial spaces. Daily, weekly, or project-based.', 
                color: 'from-purple-600 to-purple-400',
                price: 'From $0.15/sq ft'
              },
              { 
                title: 'Medical Facility Cleaning', 
                desc: 'OSHA-compliant disinfection for veterinary clinics, urgent care, and dental offices.', 
                color: 'from-green-600 to-green-400',
                price: 'Custom pricing'
              },
              { 
                title: 'Floor Scrubbing & Waxing', 
                desc: 'Professional floor care with commercial equipment. VCT, ceramic, and concrete restoration.', 
                color: 'from-orange-600 to-orange-400',
                price: 'From $0.15/sq ft'
              },
            ].map((service, i) => (
              <div key={i} className={`bg-gradient-to-br ${service.color} p-0.5 rounded-xl hover:shadow-2xl transition duration-300`}>
                <div className="bg-slate-900 p-8 rounded-xl h-full flex flex-col">
                  <h3 className="text-2xl font-black mb-3">{service.title}</h3>
                  <p className="text-slate-300 leading-relaxed mb-4 flex-grow">{service.desc}</p>
                  <div className="text-amber-400 font-bold text-sm">{service.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className="bg-slate-800 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl sm:text-6xl font-black text-center mb-6">Recent Projects</h2>
          <p className="text-center text-slate-400 mb-16 text-lg max-w-3xl mx-auto">
            Trusted by general contractors, property managers, and business owners across the Phoenix metro area.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                title: 'Burlington Coat Factory', 
                location: 'Phoenix, AZ',
                desc: '100,597 sq ft retail buildout',
                type: 'Post-Construction'
              },
              { 
                title: 'GoodVets Veterinary', 
                location: 'Multi-Location',
                desc: 'Medical facility cleaning across 3 locations',
                type: 'Medical Cleaning'
              },
              { 
                title: 'Gap Factory Stores', 
                location: 'Phoenix Metro',
                desc: 'Final clean for 4 retail locations',
                type: 'Retail Cleaning'
              },
              { 
                title: 'Cosmo Prof', 
                location: 'Scottsdale, AZ',
                desc: '2,289 sq ft tenant improvement',
                type: 'Post-Construction'
              },
              { 
                title: 'Summit Logistics', 
                location: 'Phoenix, AZ',
                desc: 'Commercial warehouse facility',
                type: 'Industrial Cleaning'
              },
              { 
                title: 'Horne Hyundai', 
                location: 'Phoenix, AZ',
                desc: 'Auto dealership service area',
                type: 'Commercial Cleaning'
              },
            ].map((project, i) => (
              <div key={i} className="bg-slate-700 bg-opacity-50 border border-slate-600 p-6 rounded-xl hover:border-amber-400 transition">
                <div className="text-amber-400 text-xs font-bold mb-2 uppercase tracking-wider">{project.type}</div>
                <h3 className="font-black text-xl mb-1">{project.title}</h3>
                <p className="text-slate-400 text-sm mb-3">{project.location}</p>
                <p className="text-slate-300 text-sm leading-relaxed">{project.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICE AREAS */}
      <section className="py-20 px-4 bg-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-black mb-6">Serving the Phoenix Metro Area</h2>
          <p className="text-slate-400 text-lg mb-8">
            Phoenix • Scottsdale • Tempe • Glendale • Goodyear • Mesa • Chandler
          </p>
          <p className="text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Professional commercial cleaning services for contractors, property managers, and business owners throughout Maricopa County.
          </p>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl sm:text-6xl font-black text-center mb-4">Get Your Free Quote</h2>
          <p className="text-center text-slate-400 mb-12 text-lg">Ready to discuss your project? Contact us for a free consultation and competitive quote.</p>

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
                  placeholder="Company / GC Name (Optional)"
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
            <p className="text-slate-400 mb-4">Prefer to call? We're here to help:</p>
            <a href="tel:251-477-5676" className="text-5xl font-black text-amber-400 hover:text-amber-300 transition">251-477-5676</a>
            <p className="text-slate-500 mt-6">
              Email: <a href="mailto:amcprofessionalscs@gmail.com" className="text-amber-400 hover:text-amber-300 transition">amcprofessionalscs@gmail.com</a>
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 border-t-4 border-amber-400 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <div className="text-4xl font-black text-amber-400 mb-4">AMC Professionals LLC</div>
            <p className="text-slate-400 mb-6">Professional Commercial Cleaning Services - Phoenix Metro Area</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="text-center">
              <h3 className="text-amber-400 font-bold mb-3">Contact</h3>
              <p className="text-slate-400 text-sm mb-2">
                <a href="tel:251-477-5676" className="hover:text-amber-400 transition">251-477-5676</a>
              </p>
              <p className="text-slate-400 text-sm">
                <a href="mailto:amcprofessionalscs@gmail.com" className="hover:text-amber-400 transition">amcprofessionalscs@gmail.com</a>
              </p>
            </div>
            
            <div className="text-center">
              <h3 className="text-amber-400 font-bold mb-3">Services</h3>
              <p className="text-slate-400 text-sm mb-1">Post-Construction Cleaning</p>
              <p className="text-slate-400 text-sm mb-1">Commercial Janitorial</p>
              <p className="text-slate-400 text-sm mb-1">Medical Facility Cleaning</p>
              <p className="text-slate-400 text-sm">Floor Scrubbing & Waxing</p>
            </div>
            
            <div className="text-center">
              <h3 className="text-amber-400 font-bold mb-3">Service Areas</h3>
              <p className="text-slate-400 text-sm mb-1">Phoenix, AZ</p>
              <p className="text-slate-400 text-sm mb-1">Scottsdale, AZ</p>
              <p className="text-slate-400 text-sm mb-1">Tempe, Glendale, Goodyear</p>
              <p className="text-slate-400 text-sm">All of Maricopa County</p>
            </div>
          </div>
          
          <div className="text-center text-slate-500 text-sm border-t border-slate-800 pt-8">
            <p>&copy; 2026 AMC Professionals LLC. All rights reserved.</p>
            <p className="mt-2">Licensed & Insured Commercial Cleaning Company</p>
          </div>
        </div>
      </footer>
    </div>
  );
}