import React from "react";
import CardCourse from "../components/CardCourse";
import type { Course } from "../types/course";

const Home: React.FC = () => {
  // Sample course data - in a real app, this would come from Supabase
  const courses: Course[] = [
    {
      id: "1",
      title: "Web Development",
      description:
        "Learn to build responsive websites using HTML, CSS, JavaScript and modern frameworks",
      duration: "3 months",
      fee: 15000,
      syllabus: "#",
      created_at: "2023-01-01",
      updated_at: "2023-01-01",
    },
    {
      id: "2",
      title: "Python Programming",
      description: "Master Python programming from basics to advanced concepts",
      duration: "2 months",
      fee: 12000,
      syllabus: "#",
      created_at: "2023-01-01",
      updated_at: "2023-01-01",
    },
    {
      id: "3",
      title: "Data Science",
      description:
        "Learn data analysis, visualization, and machine learning with Python",
      duration: "4 months",
      fee: 25000,
      syllabus: "#",
      created_at: "2023-01-01",
      updated_at: "2023-01-01",
    },
  ];

  return (
    <>
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-500 to-indigo-700 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Computer Institute Management System
            </h1>
            <p className="text-xl mb-8">
              Transform your computer education with our comprehensive
              management platform
            </p>
            <div className="flex justify-center space-x-4">
              <a
                href="/courses"
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Explore Courses
              </a>
              <a
                href="/admission"
                className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
              >
                Apply Now
              </a>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Why Choose Us
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="text-blue-600 text-3xl mb-4">🎓</div>
                <h3 className="text-xl font-semibold mb-2">Expert Faculty</h3>
                <p className="text-gray-600">
                  Learn from industry experts with years of experience
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="text-blue-600 text-3xl mb-4">💻</div>
                <h3 className="text-xl font-semibold mb-2">
                  Hands-on Training
                </h3>
                <p className="text-gray-600">
                  Practical training with real-world projects
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="text-blue-600 text-3xl mb-4">📈</div>
                <h3 className="text-xl font-semibold mb-2">Career Support</h3>
                <p className="text-gray-600">
                  Job placement assistance and career guidance
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Courses */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Popular Courses
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <CardCourse key={course.id} {...course} />
              ))}
            </div>
            <div className="text-center mt-8">
              <a
                href="/courses"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                View All Courses
              </a>
            </div>
          </div>
        </section>

        {/* Admission Section */}
        <section className="py-12 bg-gray-100">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Start Learning?
            </h2>
            <p className="text-gray-600 mb-8">
              Join thousands of students who have transformed their careers with
              our courses
            </p>
            <a
              href="/admission"
              className="bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-700 transition-colors"
            >
              Apply for Admission Now
            </a>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
