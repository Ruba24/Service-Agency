"use client";

import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import { PortableText } from "@portabletext/react";

const AllCoursesPage = () => {
  const [activeTab, setActiveTab] = useState("free");
  const [freeCourses, setFreeCourses] = useState([]);
  const [paidCourses, setPaidCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch Free Courses
  useEffect(() => {
    if (activeTab === "free" && freeCourses.length === 0) {
      setLoading(true);
      client
        .fetch(
          `*[_type == "course" && price == 0]{
            _id, 
            title, 
            description, 
            price, 
            "slug": slug.current
          }`
        )
        .then((data) => setFreeCourses(data))
        .finally(() => setLoading(false));
    }
  }, [activeTab, freeCourses]);

  // Fetch Paid Courses
  useEffect(() => {
    if (activeTab === "paid" && paidCourses.length === 0) {
      setLoading(true);
      client
        .fetch(
          `*[_type == "course" && price > 0]{
            _id, 
            title, 
            description, 
            price, 
            "slug": slug.current
          }`
        )
        .then((data) => setPaidCourses(data))
        .finally(() => setLoading(false));
    }
  }, [activeTab, paidCourses]);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">All Courses</h1>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded ${activeTab === "free" ? "bg-purple-600 text-white" : "bg-gray-200"}`}
          onClick={() => setActiveTab("free")}
        >
          Free Courses
        </button>
        <button
          className={`px-4 py-2 rounded ${activeTab === "paid" ? "bg-purple-600 text-white" : "bg-gray-200"}`}
          onClick={() => setActiveTab("paid")}
        >
          Paid Courses
        </button>
      </div>

      {/* Loader */}
      {loading && <p>Loading...</p>}

      {/* Free Courses List */}
      {activeTab === "free" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {freeCourses.map((course) => (
            <div key={course._id} className="p-4 border rounded">
              <h2 className="text-xl font-semibold">{course.title}</h2>
              <div className="text-sm text-gray-700">
                <PortableText value={course.description} />
              </div>
              <p className="mt-2 text-green-600">Free</p>
            </div>
          ))}
        </div>
      )}

      {/* Paid Courses List */}
      {activeTab === "paid" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {paidCourses.map((course) => (
            <div key={course._id} className="p-4 border rounded">
              <h2 className="text-xl font-semibold">{course.title}</h2>
              <div className="text-sm text-gray-700">
                <PortableText value={course.description} />
              </div>
              <p className="mt-2 text-blue-600">Price: ${course.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllCoursesPage;
