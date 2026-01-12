'use client';

import { PortableText } from '@portabletext/react';

const portableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="mt-10 mb-4 text-2xl font-bold text-[#1F102E]">
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
      <blockquote className="pl-4 my-6 italic border-l-4 border-purple-300 text-gray-600">
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

const CourseDescription = ({ description }) => {
  if (!description) return null;

  return (
    <div className="mt-8">
      <PortableText
        value={description}
        components={portableTextComponents}
      />
    </div>
  );
};

export default CourseDescription;
