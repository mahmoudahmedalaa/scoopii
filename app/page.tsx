"use client";

import Image from "next/image";
import { CheckCircle2, ChevronDown, MoveRight, Zap } from "lucide-react";
import { useState } from "react";
import { savePreOrder } from "./actions";

export default function Home() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    setFeedback(null);
    const result = await savePreOrder(formData);
    setFeedback({
      type: result.success ? 'success' : 'error',
      message: result.message
    });
    setIsSubmitting(false);
    if (result.success) {
      (document.getElementById('pre-order-form') as HTMLFormElement).reset();
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-white text-zinc-950 selection:bg-zinc-900 selection:text-white font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-1 font-black tracking-tighter text-xl uppercase italic select-none">
            <Zap className="w-5 h-5 fill-zinc-950 mr-1" />
            <span>S</span>
            <span>C</span>
            <span>O</span>
            <span>O</span>
            <span>P</span>
            <span className="relative">
              I
              <span className="absolute top-[1px] left-1/2 -translate-x-[70%] w-1 h-1 bg-yellow-400 rounded-full" />
            </span>
            <span className="relative">
              I
              <span className="absolute top-[1px] left-1/2 -translate-x-[70%] w-1 h-1 bg-yellow-400 rounded-full" />
            </span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-zinc-500 uppercase tracking-wider">
            <a href="#problem" className="hover:text-zinc-950 transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-zinc-950 transition-colors">How it Works</a>
            <a href="#faq" className="hover:text-zinc-950 transition-colors">FAQ</a>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => document.getElementById('pre-order')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-zinc-950 text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors shadow-sm cursor-pointer whitespace-nowrap"
            >
              Pre-order Now
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-white pt-32 pb-16 md:pt-48 md:pb-24 px-6 text-center flex flex-col items-center">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 text-[10px] font-bold uppercase tracking-widest text-zinc-600 mb-8 border border-zinc-200">
              Shipping Q3 2026
            </div>
            <h1 className="text-5xl md:text-8xl font-black tracking-tight leading-[0.9] uppercase mb-8">
              Stop Scooping.<br />
              <span className="text-zinc-400">Start Pouring.</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-zinc-500 leading-relaxed mb-12">
              The world&apos;s first precision powder dispenser for elite performance. No mess, no digging, just the perfect dose in under 2 seconds.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
              <button
                onClick={() => document.getElementById('pre-order')?.scrollIntoView({ behavior: 'smooth' })}
                className="h-14 px-10 bg-zinc-950 text-white text-xs font-black uppercase tracking-[0.2em] rounded-full hover:bg-zinc-800 transition-all cursor-pointer"
              >
                Pre-order Now
              </button>
              <button
                onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                className="h-14 px-10 bg-white text-zinc-950 border border-zinc-200 text-xs font-black uppercase tracking-[0.2em] rounded-full hover:bg-zinc-50 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                How it Works <MoveRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="mt-16 relative w-full max-w-6xl mx-auto aspect-video rounded-2xl md:rounded-[3rem] overflow-hidden border border-zinc-100 shadow-sm">
            <Image
              src="/images/scoopii_lifestyle_real.jpg"
              alt="Scoopii Lifestyle"
              fill
              className="object-cover"
              priority
            />
          </div>
        </section>

        {/* Features (Problem) */}
        <section id="problem" className="bg-zinc-50 py-20 md:py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-4xl mx-auto mb-16">
              <span className="text-xs font-black uppercase tracking-[0.4em] text-zinc-400 mb-6 block">The Problem</span>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none mb-8">
                Scooping is <br /><span className="text-zinc-400">Antiquated Technology.</span>
              </h2>
              <div className="max-w-2xl mx-auto space-y-6 text-zinc-500 text-xl leading-relaxed">
                <p>Every morning, millions of athletes perform a clumsy ritual: digging in plastic tubs with unsanitary cups, spilling expensive powder on counters, and guessing their macros.</p>
                <p>It&apos;s messy, inconsistent, and fundamentally broken.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: "Messy", desc: "Kitchen counters covered in protein dust." },
                { title: "Unsanitary", desc: "Hands digging in your supplements daily." },
                { title: "Slow", desc: "Searching for the 'bottom of the tub' scoop." },
                { title: "Wasteful", desc: "Losing 3-5% of powder to spills annually." }
              ].map((item, i) => (
                <div key={i} className="p-8 bg-white border border-zinc-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="font-extrabold uppercase text-base tracking-widest mb-3 text-zinc-950">{item.title}</h4>
                  <p className="text-lg text-zinc-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Solution (Split View) */}
        <section className="py-0 md:py-0 border-y border-zinc-100 overflow-hidden">
          <div className="grid md:grid-cols-2 min-h-[600px]">
            <div className="bg-white flex items-center justify-center p-12 md:p-24 order-2 md:order-1">
              <div className="max-w-lg">
                <span className="text-xs font-black uppercase tracking-[0.4em] text-zinc-400 mb-6 block">The Solution</span>
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9] mb-8">
                  Precision <br />Meets <span className="text-zinc-400">Performance.</span>
                </h2>
                <p className="text-xl text-zinc-500 leading-relaxed mb-12">
                  Scoopii replaces bulky tubs and messy scoops with a sleek, sealed dispenser that delivers a precise dose directly into your bottle.
                </p>
                <ul className="space-y-4 mb-12">
                  {[
                    "Airtight Seal Technology",
                    "Simple Button Activation",
                    "Universal Bottle Fit",
                    "Dishwasher Safe Core",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-base font-bold uppercase tracking-wider text-zinc-800">
                      <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => document.getElementById('pre-order')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-sm font-black uppercase tracking-[0.2em] border-b-2 border-zinc-950 pb-1 hover:text-zinc-600 hover:border-zinc-600 transition-colors cursor-pointer"
                >
                  Reserve Yours
                </button>
              </div>
            </div>
            <div className="relative bg-zinc-100 h-[500px] md:h-auto order-1 md:order-2">
              <Image
                src="/images/product_render.jpg"
                alt="Scoopii Precision Dispenser"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="bg-zinc-50 py-20 md:py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-16">
              {[
                { step: "01", title: "Load", desc: "Fill the high-capacity chamber with your favorite protein or pre-workout." },
                { step: "02", title: "Lock", desc: "Military-grade seal keeps moisture out and freshness in for months." },
                { step: "03", title: "Pour", desc: "Press the button to dispense your calibrated dose. Clean, fast, and satisfying." }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center">
                  <div className="text-5xl md:text-7xl font-black text-zinc-200 mb-6">{item.step}</div>
                  <h3 className="text-2xl font-black uppercase tracking-tighter mb-4">{item.title}</h3>
                  <p className="text-zinc-500 leading-relaxed text-base max-w-[240px]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="bg-white py-20 px-6 text-center border-t border-zinc-100">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">
                Built for <br /><span className="text-zinc-400">Your Lifestyle.</span>
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: "Serious Athletes", desc: "Hit your macro goals with gram-perfect precision without kitchen mess." },
                { title: "Modern Professionals", desc: "A sleek addition to any office or kitchen counter. Simple and functional." },
                { title: "Efficiency Geeks", desc: "Save minutes every morning and never hunt for a scoop again." }
              ].map((item, i) => (
                <div key={i} className="p-10 bg-zinc-50 rounded-3xl border border-zinc-100 flex flex-col items-center hover:bg-zinc-100 transition-colors">
                  <div className="w-12 h-12 bg-zinc-200 rounded-xl flex items-center justify-center font-black text-zinc-600 mb-6">{i + 1}</div>
                  <h4 className="text-xl font-black uppercase mb-4">{item.title}</h4>
                  <p className="text-zinc-500 text-base leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison */}
        <section className="bg-zinc-50 py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-7xl font-black tracking-tighter uppercase">Side by Side</h2>
            </div>
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 border border-zinc-100 rounded-[3rem] overflow-hidden shadow-xl bg-white">
              <div className="p-12 md:p-16 border-b md:border-b-0 md:border-r border-zinc-100 bg-white">
                <h4 className="text-xs font-black uppercase tracking-[0.4em] text-zinc-400 mb-8">Legacy Tubs</h4>
                <ul className="space-y-6">
                  {["Constant spills", "Unsanitary digging", "Ugly counter clutter", "Guessing portions"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-zinc-400 text-base font-bold uppercase italic">
                      <div className="w-1.5 h-1.5 rounded-full bg-zinc-200" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-12 md:p-16 bg-zinc-950 text-white">
                <h4 className="text-xs font-black uppercase tracking-[0.4em] text-zinc-500 mb-8">Scoopii System</h4>
                <ul className="space-y-6">
                  {["Zero mess", "Push-button pouring", "Award-winning design", "Precision calibrated"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-base font-black uppercase tracking-wide">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Pre-Order CTA */}
        <section id="pre-order" className="bg-white py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="bg-zinc-50 rounded-[3rem] md:rounded-[4rem] border border-zinc-100 p-12 md:p-32 text-center flex flex-col items-center">
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase mb-8 leading-[0.85]">
                Clean <br /><span className="text-zinc-300 italic">Your Routine.</span>
              </h2>
              <p className="max-w-xl text-xl text-zinc-500 mb-12">
                Join over 5,000 customers on the waitlist for priority access to our first production batch.
              </p>
              <form id="pre-order-form" action={handleSubmit} className="w-full max-w-xl space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    required
                    name="firstName"
                    type="text"
                    placeholder="First Name"
                    className="w-full bg-white border border-zinc-200 px-6 py-4 rounded-2xl outline-none text-sm focus:ring-2 focus:ring-zinc-950/10 transition-all"
                  />
                  <input
                    required
                    name="lastName"
                    type="text"
                    placeholder="Last Name"
                    className="w-full bg-white border border-zinc-200 px-6 py-4 rounded-2xl outline-none text-sm focus:ring-2 focus:ring-zinc-950/10 transition-all"
                  />
                </div>
                <input
                  required
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  className="w-full bg-white border border-zinc-200 px-6 py-4 rounded-2xl outline-none text-sm focus:ring-2 focus:ring-zinc-950/10 transition-all"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-zinc-950 text-white h-14 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-zinc-800 transition-colors disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? "Submitting..." : "Pre-order Now"}
                </button>
                {feedback && (
                  <p className={`mt-4 text-xs font-bold uppercase tracking-widest ${feedback.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                    {feedback.type === 'success' ? "Pre-order saved successfully!" : "Failed to save pre-order. Please try again later."}
                  </p>
                )}
              </form>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="bg-white py-20 px-6 max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black uppercase tracking-tighter">FAQ</h2>
          </div>
          <div className="space-y-4">
            {[
              { q: "Is it dishwasher safe?", a: "Yes, the entire dispensing chamber is top-rack dishwasher safe for easy cleaning between refills." },
              { q: "What powders work best?", a: "We've optimized Scoopii for whey protein, plant protein, pre-workout, and creatine. Very fine powders work perfectly too." },
              { q: "What is the storage capacity?", a: "A full standard 2lb protein tub fits comfortably in the XL series, or over 30 servings of pre-workout in the Compact series." }
            ].map((faq, i) => (
              <details key={i} className="group p-8 bg-zinc-50 rounded-3xl border border-zinc-100 cursor-pointer">
                <summary className="list-none flex items-center justify-between font-black uppercase text-sm tracking-tight">
                  {faq.q}
                  <ChevronDown className="w-5 h-5 group-open:rotate-180 transition-transform" />
                </summary>
                <p className="mt-6 text-zinc-500 text-sm leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-white max-w-7xl mx-auto px-6 border-t border-zinc-100 py-16">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <div className="flex items-center gap-1 font-black tracking-tighter text-2xl uppercase italic mb-2 select-none">
                <Zap className="w-6 h-6 fill-zinc-950 mr-1" />
                <span>S</span>
                <span>C</span>
                <span>O</span>
                <span>O</span>
                <span>P</span>
                <span className="relative">
                  I
                  <span className="absolute top-[2px] left-1/2 -translate-x-[75%] w-1.5 h-1.5 bg-yellow-400 rounded-full" />
                </span>
                <span className="relative">
                  I
                  <span className="absolute top-[2px] left-1/2 -translate-x-[75%] w-1.5 h-1.5 bg-yellow-400 rounded-full" />
                </span>
              </div>
              <p className="text-zinc-500 text-xs text-center md:text-left">
                Stop Scooping. Start Pouring.
              </p>
            </div>

            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">© 2026 Scoopii Labs Inc.</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
