export const revalidate = 600;

import { client } from "@/lib/sanity";
import Image from "next/image";
import Footer from "@/components/Footer";
import { urlFor } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";

export async function generateStaticParams() {
  const query = `*[_type == "caseStudy"]{ slug }`;
  const caseStudies = await client.fetch(query);

  return caseStudies.map((cs) => ({
    slug: cs.slug.current,
  }));
}

const portableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="mt-12 mb-4 text-2xl font-bold text-[#1F102E]">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 mb-3 text-xl font-semibold text-[#1F102E]">
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p className="mb-6 leading-relaxed text-gray-700">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="pl-4 italic border-l-4 border-purple-300 text-gray-600 my-6">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc ml-6 mb-6 space-y-2">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal ml-6 mb-6 space-y-2">{children}</ol>
    ),
  },
};

export default async function CaseStudyDetailPage({ params }) {
  const { slug } = params;

  const query = `*[_type == "caseStudy" && slug.current == $slug][0]{
    title,
    mainImage,
    excerpt,
    body
  }`;

  const caseStudy = await client.fetch(query, { slug });

  if (!caseStudy) return null;

  return (
    <>
      <section className="w-full bg-[#F8F3FC] min-h-screen pb-20">
        <div className="max-w-4xl px-4 pt-24 mx-auto">
          <h1 className="text-4xl font-extrabold text-[#1F102E]">
            {caseStudy.title}
          </h1>

          {caseStudy.mainImage && (
            <Image
              src={urlFor(caseStudy.mainImage).url()}
              alt={caseStudy.title}
              width={1000}
              height={600}
              className="w-full mt-8 rounded-3xl"
            />
          )}

          {caseStudy.excerpt && (
            <p className="mt-8 text-lg leading-relaxed text-gray-700">
              {caseStudy.excerpt}
            </p>
          )}

          {caseStudy.body && (
            <div className="mt-12">
              <PortableText
                value={caseStudy.body}
                components={portableTextComponents}
              />
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
