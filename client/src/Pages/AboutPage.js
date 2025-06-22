import { NavLink } from "react-router-dom";
import Navbar from "../components/Navbar";

const AboutPage = ()=>{
    return (
        <div className="bg-slate-900 min-h-screen py-10 px-5 md:px-20">
        <Navbar></Navbar>
      <div className="max-w-4xl mx-auto bg-black shadow-lg mt-16 rounded-lg p-8">
        <div>
        <div>
            <h1 className="text-4xl font-bold text-amber-400 mb-6 text-center">About SyncWrite</h1>
            <p className="text-stone-200 text-lg mb-6">
            <strong className="text-orange-400">SyncWrite</strong> is a collaborative writing platform designed to bring writers, teams, and creators together in a seamless and dynamic environment. Whether you're drafting documents, brainstorming ideas, or managing projects, SyncWrite empowers you to write, edit, and share content in real-time.
            </p>
        </div>
        <div>
            
        </div>
        </div>

        <h2 className="text-2xl font-semibold text-amber-300 mb-4">Our Mission</h2>
        <p className="text-stone-200 mb-6">
          To revolutionize the writing experience by providing an intuitive and powerful platform that fosters creativity, collaboration, and productivity.
        </p>

        <h2 className="text-2xl font-semibold text-amber-300 mb-4">What Makes SyncWrite Different?</h2>
        <ul className="list-disc list-inside text-stone-200 mb-6 space-y-2">
          <li><strong className="text-orange-400">Real-Time Collaboration</strong> – Work with your team in real-time with instant updates and edits.</li>
          <li><strong className="text-orange-400">Cloud-Based Access</strong> – Write and access your documents anytime, anywhere.</li>
          <li><strong className="text-orange-400">Secure & Reliable</strong> – Your content is encrypted and protected with the highest security standards.</li>
          <li><strong className="text-orange-400">Organized Workspace</strong> – Keep your projects, documents, and notes well-structured and easily accessible.</li>
          <li><strong className="text-orange-400">Auto-Save & Version History</strong> – Never lose your work with automatic backups and version tracking.</li>
          <li><strong className="text-orange-400">Customizable Editor</strong> – Write your way with a clean, distraction-free interface tailored to your needs.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-amber-300 mb-4">Who We Serve</h2>
        <ul className="list-disc list-inside text-stone-200 mb-6 space-y-2">
          <li><strong className="text-orange-400">Writers & Authors</strong> looking for a focused, distraction-free writing space.</li>
          <li><strong className="text-orange-400">Teams & Startups</strong> needing real-time collaboration and project management.</li>
          <li><strong className="text-orange-400">Students & Educators</strong> working on group projects and academic papers.</li>
          <li><strong className="text-orange-400">Businesses</strong> streamlining document workflows and internal communications.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-amber-300 mb-4">Our Vision</h2>
        <p className="text-stone-200 mb-6">
          To create a world where ideas flow freely and collaboration knows no boundaries.
        </p>

        <h2 className="text-2xl font-semibold text-amber-300 mb-4">Join the SyncWrite Community</h2>
        <p className="text-stone-200 mb-6">
          Whether you're writing solo or collaborating with a team, <strong className="text-orange-400">SyncWrite</strong> is here to support your creative process every step of the way.
        </p>

        <div className="text-center mt-8">
          <p className="text-stone-300">📧 <strong className="text-orange-400">Contact Us:</strong> support@syncwrite.com</p>
          <p className="text-stone-300">🌐 <strong className="text-orange-400">Website:</strong> www.syncwrite.com</p>
        </div>
      </div>
    </div>
    )
}

export default AboutPage ; 