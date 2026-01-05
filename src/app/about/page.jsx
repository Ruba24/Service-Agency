export const revalidate = 600;

import Image from "next/image";
import Footer from "@/components/Footer";
import { client } from "@/lib/sanity";

const AboutPage = async () => {
  const data =
    await client.fetch(`*[_type == "teamMember"] | order(_createdAt asc){
    name,
    role,
    description,
    "image": image.asset->url
  }`);

  const ceoAndCoFounder = data.filter(
    (member) =>
      member.role.toLowerCase().includes("ceo") ||
      member.role.toLowerCase().includes("co-founder")
  );
  const others = data.filter(
    (member) =>
      !member.role.toLowerCase().includes("ceo") &&
      !member.role.toLowerCase().includes("co-founder")
  );

  const teamMembers = [...ceoAndCoFounder, ...others];

  const cardHeight = 400;
  const cardOverlap = 64;
  const verticalGap = cardHeight - cardOverlap;

  const renderLines = () => {
    const lines = [];
    for (let i = 0; i < teamMembers.length - 1; i++) {
      const startY = 300 + i * verticalGap;
      const endY = startY + verticalGap;
      const x1 = i % 2 === 0 ? "30%" : "70%";
      const x2 = i % 2 === 0 ? "70%" : "30%";

      lines.push(
        <line
          key={i}
          x1={x1}
          y1={startY}
          x2={x2}
          y2={endY}
          stroke="#B877F7"
          strokeWidth="2"
          strokeDasharray="5,5"
          markerEnd={i === teamMembers.length - 2 ? "url(#arrow)" : undefined}
        >
          <animate
            attributeName="stroke-dashoffset"
            from="100"
            to="0"
            dur="2s"
            repeatCount="indefinite"
          />
        </line>
      );
    }
    return lines;
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-[#1F102E] text-white pt-20 pb-8 sm:pt-24 sm:pb-10">
        <div className="max-w-6xl px-4 mx-auto text-center">
          <h2 className="text-4xl font-extrabold leading-tight sm:text-5xl">
            About <span className="text-[#B877F7]">ZELLVERSE</span>
          </h2>
          <p className="mt-4 text-[#E2E8F0] max-w-2xl mx-auto text-lg">
            At ZELLVERSE, we empower eCommerce brands through bold design,
            seamless tech, and powerful marketing strategies.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="relative bg-[#F9F6FF] py-12 px-4 sm:px-6 overflow-hidden">
        {/* Arrow Lines (Desktop Only) */}
        <svg
          className="absolute top-0 left-0 z-0 hidden w-full h-full pointer-events-none lg:block"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <marker
              id="arrow"
              markerWidth="6"
              markerHeight="6"
              refX="5"
              refY="3"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <path d="M0,0 L0,6 L6,3 z" fill="#B877F7" />
            </marker>
          </defs>
          {renderLines()}
        </svg>

        <div className="relative z-10 max-w-6xl mx-auto mb-10 text-center">
          <h3 className="text-4xl font-bold text-[#1F102E]">
            Meet Our <span className="text-[#B877F7]">Team</span>
          </h3>
        </div>

        <div className="relative z-10 flex flex-col max-w-6xl gap-0 mx-auto">
          {teamMembers.length === 0 ? (
            <p className="text-center text-red-500">No team members found.</p>
          ) : (
            teamMembers.map((member, index) => (
              <div
                key={index}
                className={`w-full flex ${
                  index % 2 === 0 ? "justify-start" : "justify-end"
                } ${index !== 0 ? "mt-6 lg:-mt-16" : "mt-0"}`}
              >
                <div className="w-full max-w-[400px] bg-white border border-gray-200 rounded-3xl shadow-lg p-6 text-center transition-all duration-300 hover:ring-2 hover:ring-[#B877F7] hover:shadow-[0_0_25px_2px_rgba(184,119,247,0.3)] mx-auto lg:mx-0">
                  <div className="w-32 h-32 rounded-full overflow-hidden mb-5 mx-auto border-2 border-[#B877F7]">
                    <Image
                      src={member.image || "/images/team_members/member2.jpg"}
                      alt={member.name}
                      width={128}
                      height={128}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <h4 className="text-2xl font-semibold text-[#1F102E]">
                    {member.name}
                  </h4>
                  <p className="text-base text-[#B877F7] mt-1">{member.role}</p>
                  <p className="text-sm text-[#4B5563] mt-4 leading-relaxed">
                    {member.description}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default AboutPage;
