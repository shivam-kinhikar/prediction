import Link from "next/link";
import { ArrowRight, CheckCircle2, Brain, BarChart3, Clock } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Navigation */}
      <header className="px-4 lg:px-6 h-16 flex items-center border-b border-gray-100">
        <Link className="flex items-center justify-center" href="/">
          <Brain className="h-6 w-6 text-indigo-600" />
          <span className="ml-2 text-xl font-bold text-gray-900">InsightAssess</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
          <Link className="text-sm font-medium hover:text-indigo-600 transition-colors text-gray-600" href="#features">
            Features
          </Link>
          <Link className="text-sm font-medium hover:text-indigo-600 transition-colors text-gray-600" href="#how-it-works">
            How it Works
          </Link>
          <Link 
            className="text-sm font-medium bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors" 
            href="/assessment/chakra-assessment"
          >
            Start Assessment
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gray-50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2 max-w-3xl">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-gray-900">
                  Discover Your True Alignment
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Take our comprehensive 35-question Chakra Assessment to understand the balance of your 7 energy centers and unlock your full potential.
                </p>
              </div>
              <div className="space-x-4">
                <Link
                  className="inline-flex h-12 items-center justify-center rounded-md bg-indigo-600 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-700"
                  href="/assessment/chakra-assessment"
                >
                  Take the Assessment
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  className="inline-flex h-12 items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium text-gray-900 shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-300"
                  href="#how-it-works"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-gray-900">Why take our assessment?</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Gain clarity on your professional profile in minutes, not months.
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center space-y-4 text-center p-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                  <Clock className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Fast & Efficient</h3>
                <p className="text-gray-500">
                  Complete the comprehensive evaluation in under 10 minutes from any device.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center p-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                  <BarChart3 className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Data-Driven Insights</h3>
                <p className="text-gray-500">
                  Receive a detailed breakdown of your competencies compared to industry benchmarks.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center p-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                  <Brain className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Actionable Feedback</h3>
                <p className="text-gray-500">
                  Get personalized recommendations on how to leverage your strengths and improve weaknesses.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-gray-900">How it works</h2>
            </div>
            <div className="mx-auto grid max-w-4xl items-center gap-8 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 text-center relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-indigo-600 bg-white text-xl font-bold text-indigo-600 mb-4 z-10">
                  1
                </div>
                <h3 className="text-xl font-bold text-gray-900">Answer Questions</h3>
                <p className="text-gray-500 text-sm">Respond to a series of situational and behavioral questions.</p>
              </div>
              <div className="flex flex-col items-center space-y-2 text-center relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-indigo-600 bg-white text-xl font-bold text-indigo-600 mb-4 z-10">
                  2
                </div>
                <h3 className="text-xl font-bold text-gray-900">Instant Analysis</h3>
                <p className="text-gray-500 text-sm">Our system evaluates your responses in real-time.</p>
              </div>
              <div className="flex flex-col items-center space-y-2 text-center relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-indigo-600 bg-white text-xl font-bold text-indigo-600 mb-4 z-10">
                  3
                </div>
                <h3 className="text-xl font-bold text-gray-900">Get Your Report</h3>
                <p className="text-gray-500 text-sm">View and download your comprehensive personalized profile.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-indigo-600 text-white">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-10 sm:grid-cols-2 max-w-4xl mx-auto">
              <div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl mb-4">Trusted by professionals</h2>
                <p className="text-indigo-100 mb-6">
                  Join thousands of individuals who have used our platform to understand their potential and take the next step in their careers.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle2 className="mr-2 h-5 w-5 text-indigo-200" />
                    <span>Scientifically validated questions</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="mr-2 h-5 w-5 text-indigo-200" />
                    <span>100% confidential and secure</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="mr-2 h-5 w-5 text-indigo-200" />
                    <span>Detailed PDF report included</span>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col justify-center items-center bg-indigo-700/50 p-8 rounded-xl border border-indigo-500">
                <div className="text-4xl font-bold mb-2">10,000+</div>
                <div className="text-indigo-200 text-center mb-6">Assessments Completed</div>
                <Link
                  className="inline-flex h-12 items-center justify-center rounded-md bg-white px-8 text-sm font-medium text-indigo-600 shadow transition-colors hover:bg-gray-100"
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
      <footer className="w-full py-6 bg-gray-900 text-gray-400">
        <div className="container px-4 md:px-6 mx-auto flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm">© 2026 InsightAssess. All rights reserved.</p>
          <nav className="flex gap-4 sm:gap-6 mt-4 sm:mt-0">
            <Link className="text-sm hover:text-white transition-colors" href="#">
              Terms of Service
            </Link>
            <Link className="text-sm hover:text-white transition-colors" href="#">
              Privacy Policy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
