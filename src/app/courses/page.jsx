export const revalidate = 600;

import { Suspense } from "react";
import AllCoursesPage from "./AllCoursesPage";
import { client } from "@/lib/sanity";

export default async function Page() {
  const data = await client.fetch(`{
    
    "freeCourses" : *[_type == "freeCourse"] | order(_createdAt desc){
      _id,
      title,
      videoId
    },

    "paidCourses" : *[_type == "course"] | order(_createdAt desc){
      _id,
      title,
      price,
      slug,
      icon,
        "description": pt::text(description),
      // optional image if your card needs it
      "imageUrl": image.asset->url
    }

  }`);

  return (
    <Suspense fallback={<div>Loading courses...</div>}>
      <AllCoursesPage
        freeCourses={data.freeCourses}
        paidCourses={data.paidCourses}
      />
    </Suspense>
  );
}
