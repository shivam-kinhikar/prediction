import Link from "next/link";
import { ArrowRight, CheckCircle2, Brain, BarChart3, Clock } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#fdfbf7]">
      {/* Navigation */}
      <header className="px-4 sm:px-6 lg:px-12 h-16 sm:h-20 flex items-center justify-between border-b border-slate-200 bg-[#fdfbf7]/80 backdrop-blur-md sticky top-0 z-50">
        <Link className="flex items-center" href="/">
          <Brain className="h-6 w-6 sm:h-7 sm:w-7 text-amber-700 shrink-0" />
          <span className="ml-2 sm:ml-3 text-lg sm:text-2xl font-serif font-bold text-slate-900 tracking-tight shrink-0">InsightAssess</span>
        </Link>
        <nav className="flex gap-4 sm:gap-8 items-center">
          <Link className="hidden md:block text-sm font-medium hover:text-amber-700 transition-colors text-slate-600" href="#features">
            Features
          </Link>
          <Link className="hidden md:block text-sm font-medium hover:text-amber-700 transition-colors text-slate-600" href="#how-it-works">
            How it Works
          </Link>
          <Link 
            className="text-xs sm:text-sm font-medium bg-slate-900 text-white px-3 py-2 sm:px-5 sm:py-2.5 rounded hover:bg-slate-800 transition-all shadow-md hover:shadow-lg whitespace-nowrap" 
            href="/assessment/chakra-assessment"
          >
            Start Assessment
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-20 md:py-32 lg:py-40 bg-gradient-to-b from-[#fdfbf7] to-[#f4f1ea]">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-6 text-center">
              <div className="space-y-4 max-w-4xl px-2">
                <h1 className="text-4xl font-serif font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-slate-900 leading-tight">
                  Discover Your <span className="text-amber-700 italic block sm:inline">True Alignment</span>
                </h1>
                <p className="mx-auto max-w-[700px] text-slate-600 text-base sm:text-lg md:text-xl/relaxed lg:text-lg/relaxed xl:text-xl/relaxed font-light mt-6">
                  Take our comprehensive 28-question Chakra Assessment to understand the balance of your 7 energy centers and unlock your full potential.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 pt-8">
                <Link
                  className="inline-flex h-14 items-center justify-center rounded bg-amber-700 px-10 text-base font-medium text-white shadow-lg transition-all hover:bg-amber-800 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-700 focus-visible:ring-offset-2"
                  href="/assessment/chakra-assessment"
                >
                  Take the Assessment
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  className="inline-flex h-14 items-center justify-center rounded border-2 border-slate-300 bg-transparent px-10 text-base font-medium text-slate-800 transition-all hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
                  href="#how-it-works"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="features" className="w-full py-20 md:py-32 bg-white">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
              <h2 className="text-3xl font-serif font-bold sm:text-4xl md:text-5xl text-slate-900 px-2">Why take our assessment?</h2>
              <div className="w-24 h-1 bg-amber-600 mx-auto rounded-full mt-6 mb-4"></div>
              <p className="max-w-[700px] text-slate-500 text-base sm:text-lg md:text-xl/relaxed lg:text-lg/relaxed font-light px-4">
                Gain profound clarity on your spiritual and emotional profile in minutes.
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-12 py-8 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 text-center group">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-50 border border-slate-100 text-amber-700 shadow-sm transition-transform group-hover:scale-105">
                  <Clock className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-serif font-bold text-slate-900">Fast & Efficient</h3>
                <p className="text-slate-500 font-light leading-relaxed">
                  Complete the comprehensive evaluation in under 10 minutes from any device, anywhere.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center group">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-50 border border-slate-100 text-amber-700 shadow-sm transition-transform group-hover:scale-105">
                  <BarChart3 className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-serif font-bold text-slate-900">Deep Insights</h3>
                <p className="text-slate-500 font-light leading-relaxed">
                  Receive a detailed, visually stunning breakdown of your 7 chakras and their energy flow.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center group">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-50 border border-slate-100 text-amber-700 shadow-sm transition-transform group-hover:scale-105">
                  <Brain className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-serif font-bold text-slate-900">Actionable Wisdom</h3>
                <p className="text-slate-500 font-light leading-relaxed">
                  Get personalized, ancient recommendations to help leverage your strengths and heal your blockages.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="w-full py-20 md:py-32 bg-[#f9f8f6] border-y border-slate-200">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
              <h2 className="text-3xl font-serif font-bold sm:text-4xl md:text-5xl text-slate-900">How it works</h2>
              <div className="w-24 h-1 bg-amber-600 mx-auto rounded-full mt-6"></div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-12 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-amber-700 bg-[#fdfbf7] text-2xl font-serif font-bold text-amber-700 shadow-sm">
                  1
                </div>
                <h3 className="text-xl font-serif font-bold text-slate-900">Answer Questions</h3>
                <p className="text-slate-500 font-light">Reflect honestly on a series of behavioral and emotional prompts.</p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-amber-700 bg-[#fdfbf7] text-2xl font-serif font-bold text-amber-700 shadow-sm">
                  2
                </div>
                <h3 className="text-xl font-serif font-bold text-slate-900">Instant Analysis</h3>
                <p className="text-slate-500 font-light">Our engine evaluates your energetic responses in real-time.</p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-amber-700 bg-[#fdfbf7] text-2xl font-serif font-bold text-amber-700 shadow-sm">
                  3
                </div>
                <h3 className="text-xl font-serif font-bold text-slate-900">Read Your Report</h3>
                <p className="text-slate-500 font-light">View a comprehensive profile of your chakra alignments.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="w-full py-24 md:py-32 bg-slate-900 text-white">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-12 lg:grid-cols-2 max-w-5xl mx-auto items-center">
              <div className="space-y-6 sm:space-y-8 px-2">
                <h2 className="text-3xl font-serif font-bold md:text-5xl leading-tight">Trusted by spiritual seekers</h2>
                <p className="text-slate-300 text-base sm:text-lg font-light leading-relaxed">
                  Join thousands of individuals who have used our platform to understand their inner alignment and take the next step in their holistic journey.
                </p>
                <ul className="space-y-4 pt-4">
                  <li className="flex items-center text-slate-200">
                    <CheckCircle2 className="mr-4 h-6 w-6 text-amber-500" />
                    <span className="font-light text-lg">Rooted in ancient wisdom</span>
                  </li>
                  <li className="flex items-center text-slate-200">
                    <CheckCircle2 className="mr-4 h-6 w-6 text-amber-500" />
                    <span className="font-light text-lg">100% confidential and secure</span>
                  </li>
                  <li className="flex items-center text-slate-200">
                    <CheckCircle2 className="mr-4 h-6 w-6 text-amber-500" />
                    <span className="font-light text-lg">Detailed personalized report</span>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col justify-center items-center bg-slate-800/80 p-8 sm:p-12 rounded border border-slate-700 shadow-2xl backdrop-blur-sm mx-4 sm:mx-0">
                <div className="text-4xl sm:text-5xl font-serif font-bold mb-3 sm:mb-4 text-amber-500">10,000+</div>
                <div className="text-slate-300 font-light text-center mb-6 sm:mb-8 uppercase tracking-widest text-xs sm:text-sm">Assessments Completed</div>
                <Link
                  className="inline-flex h-12 sm:h-14 items-center justify-center rounded bg-amber-700 px-6 sm:px-10 text-sm sm:text-base font-medium text-white shadow-lg transition-all hover:bg-amber-600 w-full"
                  href="/assessment/chakra-assessment"
                >
                  Start Yours Today
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-10 bg-slate-950 text-slate-500">
        <div className="container px-4 md:px-6 mx-auto flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm font-light">© 2026 InsightAssess. All rights reserved.</p>
          <nav className="flex gap-6 mt-6 sm:mt-0">
            <Link className="text-sm font-light hover:text-amber-500 transition-colors" href="#">
              Terms of Service
            </Link>
            <Link className="text-sm font-light hover:text-amber-500 transition-colors" href="#">
              Privacy Policy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
