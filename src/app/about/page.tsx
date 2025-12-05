import CVSection from "@/components/CVSection";


export default function About() {
  return (
    <section id="about" className="py-16 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="max-w-4xl mx-auto text-center px-6">
        <h2 className="text-4xl font-bold mb-6">About Me</h2>
        <p className="text-lg text-gray-300 leading-relaxed mb-8">
          I’m <span className="font-semibold text-white">Elvis Nyambati Orina</span>, a passionate 
          <span className="text-blue-400"> BSc. Mathematics and Computer Science </span> student at 
          <span className="text-white"> Kenyatta University</span>. I specialize in developing 
          secure, data-driven systems — from <span className="text-blue-400">AI-powered trading apps</span> 
          to <span className="text-blue-400">cybersecurity simulations</span>.
        </p>

        <p className="text-gray-400 mb-8">
          With a background in <span className="font-semibold text-white">networking (CCNA)</span>, 
          <span className="text-white"> full-stack development</span>, and <span className="text-white">ethical hacking</span>, 
          I blend analytical problem-solving with creative design to build solutions that are both functional and secure.
        </p>

        <div className="flex justify-center gap-6">
          <a
            href="/Elvis_Nyambati_CV.pdf"
            target="_blank"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-full transition-all shadow-lg"
          >
            View CV
          </a>
          <a
            href="#projects"
            className="border border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white font-semibold px-6 py-3 rounded-full transition-all shadow-lg"
          >
            View Projects
          </a>
        </div>
      </div>
    </section>
  );
}
