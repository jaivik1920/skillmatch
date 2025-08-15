import { Link } from "react-router-dom";
const Welcome = ()=>{
    return <>
        <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-blue-600 text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to SkillMatch - Job Application Platform
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Find your dream job or the perfect candidate effortlessly.
          </p>
          <Link
            to="/jobs"
            className="bg-white text-blue-600 font-semibold px-6 py-3 rounded shadow hover:bg-gray-100 transition"
          >
            Browse Jobs
          </Link>
          <Link
            to="/post-job"
            className="bg-white text-blue-600 font-semibold px-6 py-3 mx-4 rounded shadow hover:bg-gray-100 transition"
          >
            Hire Candidate
          </Link>
        </div>
      </header>

      <section className="py-20 container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-12">Why SkillMatch?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">For Job Seekers</h3>
            <p className="text-gray-600">
              Get notified instantly about jobs that match your skills and
              preferences.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">For Recruiters</h3>
            <p className="text-gray-600">
              Post jobs easily and get the right candidates faster.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">Smart Matching</h3>
            <p className="text-gray-600">
              Our platform connects the right candidates with the right jobs
              seamlessly.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-indigo-50 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
        <p className="text-gray-700 mb-6">
          Sign up now and start applying or posting jobs instantly!
        </p>
        <Link
          to="/register"
          className="bg-blue-600 text-white font-semibold px-6 py-3 rounded shadow hover:bg-blue-700 transition"
        >
          Join the Race
        </Link>
      </section>

      <footer className="bg-gray-800 text-white py-6 mt-auto">
        <div className="container mx-auto text-center">
          <p>© 2025 SkillMatch. All rights reserved.</p>
        </div>
      </footer>
    </div>
    </>
}

export default Welcome;