"use client";

import React, { useState } from "react";

/**
 * Fonts: same as AboutPage.jsx — add once in app/layout.js via next/font/google
 * (Kalam, Inter, JetBrains_Mono). Fallback <style> import below keeps this
 * file working standalone too.
 */

const ContactPage = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setStatus("sending");
    // Replace with your real submit call (API route / email service)
    setTimeout(() => {
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
    }, 900);
  };

  return (
    <div className="min-h-screen bg-[#F3EFE4] dark:bg-[#12131a] px-6 py-14 flex justify-center transition-colors">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Kalam:wght@400;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500&display=swap');
        .font-hand { font-family: 'Kalam', cursive; }
        .font-body { font-family: 'Inter', sans-serif; }
        .font-code { font-family: 'JetBrains Mono', monospace; }
        .ruled-paper {
          background-image: repeating-linear-gradient(
            to bottom, transparent, transparent 31px, rgba(47,75,124,0.08) 32px
          );
        }
        .dark .ruled-paper {
          background-image: repeating-linear-gradient(
            to bottom, transparent, transparent 31px, rgba(255,255,255,0.05) 32px
          );
        }
        .torn-edge {
          clip-path: polygon(
            0% 1.5%, 3% 0%, 6% 1.2%, 9% 0.2%, 12% 1.4%, 15% 0%, 18% 1.1%,
            21% 0.1%, 24% 1.3%, 27% 0%, 30% 1.2%, 33% 0.2%, 36% 1.4%, 39% 0%,
            42% 1.1%, 45% 0.1%, 48% 1.3%, 51% 0%, 54% 1.2%, 57% 0.2%, 60% 1.4%,
            63% 0%, 66% 1.1%, 69% 0.1%, 72% 1.3%, 75% 0%, 78% 1.2%, 81% 0.2%,
            84% 1.4%, 87% 0%, 90% 1.1%, 93% 0.1%, 96% 1.3%, 100% 0%,
            100% 100%, 0% 100%
          );
        }
        .highlight {
          background: linear-gradient(120deg, rgba(253,230,138,0.75) 0%, rgba(253,230,138,0.75) 100%);
          background-repeat: no-repeat;
          background-size: 100% 45%;
          background-position: 0 65%;
        }
        @keyframes pop-in {
          0% { opacity: 0; transform: translateY(6px) scale(0.98); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .pop-in { animation: pop-in 0.25s ease-out; }
      `}</style>

      <div className="max-w-2xl w-full relative">
        <div className="torn-edge ruled-paper bg-[#FDFBF4] dark:bg-[#1b1d29] shadow-xl pl-14 pr-8 sm:pr-10 pt-10 pb-8 transition-colors relative">
          {/* Title */}
          <h1 className="font-hand text-4xl sm:text-5xl font-bold text-[#EDEFF5] mb-1">
            <span className="highlight px-1 d">Contact&nbsp;Us</span>
          </h1>
          <p className="font-body text-sm uppercase tracking-[0.2em] text-[#8A8471] dark:text-[#7d81a0] mb-8">
            page 02 — leave us a note
          </p>

          {/* Description */}
          <p className="font-body text-[#3f3b33] dark:text-[#c7cad8] leading-relaxed mb-8">
            Have a question, feedback, or issue? Feel free to reach out. We{"'"}
            re here to help you improve your experience with Note Manager.
          </p>

          {/* Contact Info */}
          <div className="space-y-2 font-body text-[#3f3b33] dark:text-[#c7cad8] mb-10">
            <p>
              📧 <span className="font-medium">Email:</span>{" "}
              johirulislam574206@gmail.com
            </p>
            <p>
              📞 <span className="font-medium">Phone:</span> 01824842336
            </p>
            <p>
              📍 <span className="font-medium">Location:</span>Wireless gate
              mohakhali, Dhaka, Bangladesh
            </p>
          </div>

          {/* Form */}
          <section>
            <h2 className="font-hand text-2xl text-[#2F4B7C] dark:text-[#EDEFF5] mb-4">
              Send us a message
            </h2>

            {status === "sent" ? (
              <div className="pop-in flex flex-col items-center text-center gap-3 py-10 border-2 border-dashed border-[#2F4B7C]/25 dark:border-[#8b93c9]/25 rounded">
                <div className="w-14 h-14 rounded-full bg-[#2F4B7C]/10 dark:bg-[#8b93c9]/15 flex items-center justify-center">
                  <svg
                    className="w-7 h-7 text-[#2F4B7C] dark:text-[#c3c9ef]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                </div>
                <p className="font-hand text-2xl text-[#2F4B7C] dark:text-[#EDEFF5]">
                  Message sent!
                </p>
                <p className="font-body text-sm text-[#8A8471] dark:text-[#9ba0c0]">
                  Thanks for reaching out — we{"'"}ll get back to you within
                  24–48 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full border-b-2 border-[#c9c2ae] dark:border-[#3a3d4a] focus:border-[#2F4B7C] dark:focus:border-[#8b93c9] bg-transparent text-[#2f2b23] dark:text-[#e7e9f2] font-body py-2.5 px-1 outline-none transition-colors placeholder:text-[#8A8471]/70 dark:placeholder:text-[#7d81a0]/70"
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  className="w-full border-b-2 border-[#c9c2ae] dark:border-[#3a3d4a] focus:border-[#2F4B7C] dark:focus:border-[#8b93c9] bg-transparent text-[#2f2b23] dark:text-[#e7e9f2] font-body py-2.5 px-1 outline-none transition-colors placeholder:text-[#8A8471]/70 dark:placeholder:text-[#7d81a0]/70"
                  required
                />
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Your Message"
                  className="w-full border-b-2 border-[#c9c2ae] dark:border-[#3a3d4a] focus:border-[#2F4B7C] dark:focus:border-[#8b93c9] bg-transparent text-[#2f2b23] dark:text-[#e7e9f2] font-body py-2.5 px-1 outline-none transition-colors resize-none placeholder:text-[#8A8471]/70 dark:placeholder:text-[#7d81a0]/70"
                  required
                />

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full bg-[#2F4B7C] hover:bg-[#274069] disabled:opacity-60 text-[#FDFBF4] font-body font-medium py-3 rounded-lg transition-colors"
                >
                  {status === "sending" ? "Sending…" : "Send Message"}
                </button>
              </form>
            )}
          </section>

          {/* Footer */}
          <div className="pt-6 mt-8 border-t-2 border-dashed border-[#c9c2ae] dark:border-[#3a3d4a] font-code text-[11px] text-[#8A8471] dark:text-[#6a6e88] text-center">
            We usually respond within 24–48 hours.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
