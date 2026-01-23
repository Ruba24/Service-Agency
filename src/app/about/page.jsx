// export const revalidate = 600;

// import Image from "next/image";
// import Footer from "@/components/Footer";
// import { client } from "@/lib/sanity";

// const AboutPage = async () => {
//   const data =
//     await client.fetch(`*[_type == "teamMember"] | order(_createdAt asc){
//     name,
//     role,
//     description,
//     "image": image.asset->url
//   }`);

//   const ceoAndCoFounder = data.filter(
//     (member) =>
//       member.role.toLowerCase().includes("ceo") ||
//       member.role.toLowerCase().includes("co-founder")
//   );
//   const others = data.filter(
//     (member) =>
//       !member.role.toLowerCase().includes("ceo") &&
//       !member.role.toLowerCase().includes("co-founder")
//   );

//   const teamMembers = [...ceoAndCoFounder, ...others];

//   const cardHeight = 400;
//   const cardOverlap = 64;
//   const verticalGap = cardHeight - cardOverlap;

//   const renderLines = () => {
//     const lines = [];
//     for (let i = 0; i < teamMembers.length - 1; i++) {
//       const startY = 300 + i * verticalGap;
//       const endY = startY + verticalGap;
//       const x1 = i % 2 === 0 ? "30%" : "70%";
//       const x2 = i % 2 === 0 ? "70%" : "30%";

//       lines.push(
//         <line
//           key={i}
//           x1={x1}
//           y1={startY}
//           x2={x2}
//           y2={endY}
//           stroke="#B877F7"
//           strokeWidth="2"
//           strokeDasharray="5,5"
//           markerEnd={i === teamMembers.length - 2 ? "url(#arrow)" : undefined}
//         >
//           <animate
//             attributeName="stroke-dashoffset"
//             from="100"
//             to="0"
//             dur="2s"
//             repeatCount="indefinite"
//           />
//         </line>
//       );
//     }
//     return lines;
//   };

//   return (
//     <>
//       {/* Hero Section */}
//       <section className="relative bg-[#1F102E] text-white pt-20 pb-8 sm:pt-24 sm:pb-10">
//         <div className="max-w-6xl px-4 mx-auto text-center">
//           <h2 className="text-4xl font-extrabold leading-tight sm:text-5xl">
//             About <span className="text-[#B877F7]">ZELLVERSE</span>
//           </h2>
//           <p className="mt-4 text-[#E2E8F0] max-w-2xl mx-auto text-lg">
//             At ZELLVERSE, we empower eCommerce brands through bold design,
//             seamless tech, and powerful marketing strategies.
//           </p>
//         </div>
//       </section>

//       {/* Team Section */}
//       <section className="relative bg-[#F9F6FF] py-12 px-4 sm:px-6 overflow-hidden">
//         {/* Arrow Lines (Desktop Only) */}
//         <svg
//           className="absolute top-0 left-0 z-0 hidden w-full h-full pointer-events-none lg:block"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <defs>
//             <marker
//               id="arrow"
//               markerWidth="6"
//               markerHeight="6"
//               refX="5"
//               refY="3"
//               orient="auto"
//               markerUnits="strokeWidth"
//             >
//               <path d="M0,0 L0,6 L6,3 z" fill="#B877F7" />
//             </marker>
//           </defs>
//           {renderLines()}
//         </svg>

//         <div className="relative z-10 max-w-6xl mx-auto mb-10 text-center">
//           <h3 className="text-4xl font-bold text-[#1F102E]">
//             Meet Our <span className="text-[#B877F7]">Team</span>
//           </h3>
//         </div>

//         <div className="relative z-10 flex flex-col max-w-6xl gap-0 mx-auto">
//           {teamMembers.length === 0 ? (
//             <p className="text-center text-red-500">No team members found.</p>
//           ) : (
//             teamMembers.map((member, index) => (
//               <div
//                 key={index}
//                 className={`w-full flex ${
//                   index % 2 === 0 ? "justify-start" : "justify-end"
//                 } ${index !== 0 ? "mt-6 lg:-mt-16" : "mt-0"}`}
//               >
//                 <div className="w-full max-w-[400px] bg-white border border-gray-200 rounded-3xl shadow-lg p-6 text-center transition-all duration-300 hover:ring-2 hover:ring-[#B877F7] hover:shadow-[0_0_25px_2px_rgba(184,119,247,0.3)] mx-auto lg:mx-0">
//                   <div className="w-32 h-32 rounded-full overflow-hidden mb-5 mx-auto border-2 border-[#B877F7]">
//                     <Image
//                       src={member.image || "/images/team_members/member2.jpg"}
//                       alt={member.name}
//                       width={128}
//                       height={128}
//                       className="object-cover w-full h-full"
//                     />
//                   </div>
//                   <h4 className="text-2xl font-semibold text-[#1F102E]">
//                     {member.name}
//                   </h4>
//                   <p className="text-base text-[#B877F7] mt-1">{member.role}</p>
//                   <p className="text-sm text-[#4B5563] mt-4 leading-relaxed">
//                     {member.description}
//                   </p>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </section>

//       <Footer />
//     </>
//   );
// };

// export default AboutPage;

"use client"; // required for Framer Motion animations

import Image from "next/image";
import Footer from "@/components/Footer";
import Link from "next/link";
import { motion } from "framer-motion";

const AboutPage = () => {
  const ceoData = {
    name: "Muhammad Bilal Shahab",
    role: "Founder & CEO",
    description:
      "Muhammad Bilal Shahab, Founder & CEO of Zellverse, helps ecommerce sellers build scalable Amazon and Shopify businesses through proven systems, not shortcuts. His focus is simple: real strategies, real execution, real growth.",
    image: "/images/team_members/muhammad-bilal.jpg",
  };

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
  };

  return (
    <>
      {/* Hero Section */}
      <motion.section
        className="relative bg-[rgb(31,16,47)] text-white pt-28 pb-20 overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
      >
        {/* Soft Circles */}
        <div className="absolute -top-32 -right-32 w-72 h-72 bg-[#B877F7] opacity-20 rounded-full blur-3xl pointer-events-none animate-blob"></div>
        <div className="absolute -bottom-28 -left-28 w-64 h-64 bg-[#B877F7] opacity-20 rounded-full blur-2xl pointer-events-none animate-blob animation-delay-2000"></div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight">
            About <span className="text-[#B877F7]">ZELLVERSE</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
            Power up your eCommerce journey with Zellverse. We specialize in Amazon Private Label, LLC creation, and comprehensive e-commerce solutions.
          </p>
        </div>
      </motion.section>

      {/* Our Mission & Vision */}
      <motion.section
        className="relative bg-white py-16 px-4 sm:px-6 overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Mission Card */}
          <motion.div
            className="relative bg-white rounded-3xl shadow-lg p-8 hover:shadow-xl transition duration-300 overflow-hidden"
            variants={fadeUp}
          >
            <div className="absolute -top-16 -right-16 w-40 h-40 bg-[#B877F7] opacity-20 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-[#B877F7] opacity-20 rounded-full blur-2xl pointer-events-none"></div>
            <h3 className="text-2xl font-bold text-[rgb(31,16,47)] mb-4">Our Mission</h3>
            <p className="text-gray-700 leading-relaxed">
              Our mission is to provide state-of-the-art e-commerce services and solutions for Amazon and Shopify sellers worldwide, helping businesses thrive with expert guidance.
            </p>
          </motion.div>

          {/* Vision Card */}
          <motion.div
            className="relative bg-white rounded-3xl shadow-lg p-8 hover:shadow-xl transition duration-300 overflow-hidden"
            variants={fadeUp}
          >
            <div className="absolute -top-16 -right-16 w-40 h-40 bg-[#B877F7] opacity-20 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-[#B877F7] opacity-20 rounded-full blur-2xl pointer-events-none"></div>
            <h3 className="text-2xl font-bold text-[rgb(31,16,47)] mb-4">Our Vision</h3>
            <p className="text-gray-700 leading-relaxed">
              We envision a future where everyone can succeed in the digital economy. Through training and support, we unlock the full potential of our clients and community members.
            </p>
          </motion.div>
        </div>
      </motion.section>

     {/* CEO Section */}
<section className="relative bg-[rgb(31,16,47)] text-white py-20 px-4 sm:px-6 overflow-hidden">
  {/* Soft Circles */}
  <div className="absolute -top-32 -right-32 w-72 h-72 bg-[#B877F7] opacity-20 rounded-full blur-3xl pointer-events-none animate-blob"></div>
  <div className="absolute -bottom-28 -left-28 w-64 h-64 bg-[#B877F7] opacity-20 rounded-full blur-2xl pointer-events-none animate-blob animation-delay-2000"></div>

  <div className="relative z-10 max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8">
    {/* Image */}
    <div className="flex-shrink-0 w-72 h-[400px] rounded-3xl overflow-hidden shadow-xl border-2 border-[#B877F7] animate-float animate-glow">
  <Image
    src="/images/team_members/ceo.jpg"
    alt="Muhammad Bilal Shahab"
    width={288}
    height={400}
    className="object-cover w-full h-full"
  />
</div>


    {/* Text */}
    <div className="flex-1 text-center md:text-left">
      <h3 className="text-3xl font-bold mb-2">{ceoData.name}</h3>
      <p className="text-[#B877F7] font-semibold mb-4">{ceoData.role}</p>
      <p className="text-gray-300 leading-relaxed">{ceoData.description}</p>
    </div>
  </div>
</section>


      {/* Start Your Journey Section */}
      <motion.section
        className="relative bg-white py-20 px-4 sm:px-6 overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
      >
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#B877F7] opacity-20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-56 h-56 bg-[#B877F7] opacity-20 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h3 className="text-4xl font-bold text-[rgb(31,16,47)] mb-6">
            Start Your Journey
          </h3>
          <p className="text-gray-700 text-lg leading-relaxed mb-8">
            Start your eCommerce journey with Zellverse, where innovation and expertise propel your business forward.
          </p>
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link
              href="/contact"
              className="px-8 py-4 bg-[#B877F7] text-white rounded-full font-semibold hover:bg-[#A062D5] transition-colors"
            >
              Contact Us
            </Link>
          </motion.div>
        </div>
      </motion.section>

      <Footer />
    </>
  );
};

export default AboutPage;
