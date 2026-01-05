export const revalidate = 600;

import { client } from "@/lib/sanity";
import Image from "next/image";
import Footer from "@/components/Footer";
import { urlFor } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";

export async function generateStaticParams() {
  const query = `*[_type == "blog"]{ slug }`;
  const blogs = await client.fetch(query);

  return blogs.map((b) => ({
    slug: b.slug.current,
  }));
}

export default async function BlogDetailPage({ params }) {
  const { slug } = params;

  const query = `*[_type == "blog" && slug.current == $slug][0]{
    title,
    mainImage,
    excerpt,
    body
  }`;

  const blog = await client.fetch(query, { slug });

  return (
    <>
      <section className="w-full bg-[#F8F3FC] min-h-screen pb-20">
        <div className="max-w-4xl px-4 pt-24 mx-auto">
          <h1 className="text-4xl font-extrabold text-[#1F102E]">
            {blog.title}
          </h1>

          {blog.mainImage && (
            <Image
              src={urlFor(blog.mainImage).url()}
              alt={blog.title}
              width={1000}
              height={600}
              className="w-full mt-8 rounded-3xl"
            />
          )}

          <p className="mt-8 leading-relaxed text-gray-700">{blog.excerpt}</p>

          {blog.body && (
            <div className="mt-10 prose prose-purple max-w-none">
              <PortableText value={blog.body} />
            </div>
          )}
        </div>
      </section>

      {/* Footer should be INSIDE the fragment */}
      <Footer />
    </>
  );
}
