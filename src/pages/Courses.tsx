import React, { useState, useEffect } from 'react';
import CardCourse from '../components/CardCourse';
import type { Course } from '../types/course';

const Courses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  // In a real app, this would fetch from Supabase
  useEffect(() => {
    // Simulating API call
    setTimeout(() => {
      const mockCourses: Course[] = [
        {
          id: '1',
          title: 'Web Development',
          description: 'Learn to build responsive websites using HTML, CSS, JavaScript and modern frameworks',
          duration: '3 months',
          fee: 15000,
          syllabus: '#',
          created_at: '2023-01-01',
          updated_at: '2023-01-01',
        },
        {
          id: '2',
          title: 'Python Programming',
          description: 'Master Python programming from basics to advanced concepts',
          duration: '2 months',
          fee: 12000,
          syllabus: '#',
          created_at: '2023-01-01',
          updated_at: '2023-01-01',
        },
        {
          id: '3',
          title: 'Data Science',
          description: 'Learn data analysis, visualization, and machine learning with Python',
          duration: '4 months',
          fee: 25000,
          syllabus: '#',
          created_at: '2023-01-01',
          updated_at: '2023-01-01',
        },
        {
          id: '4',
          title: 'Mobile App Development',
          description: 'Build cross-platform mobile applications using React Native',
          duration: '3 months',
          fee: 18000,
          syllabus: '#',
          created_at: '2023-01-01',
          updated_at: '2023-01-01',
        },
        {
          id: '5',
          title: 'UI/UX Design',
          description: 'Create beautiful and intuitive user interfaces for web and mobile applications',
          duration: '2.5 months',
          fee: 14000,
          syllabus: '#',
          created_at: '2023-01-01',
          updated_at: '2023-01-01',
        },
        {
          id: '6',
          title: 'Cybersecurity',
          description: 'Learn to protect systems and networks from digital attacks',
          duration: '4 months',
          fee: 22000,
          syllabus: '#',
          created_at: '2023-01-01',
          updated_at: '2023-01-01',
        },
      ];
      setCourses(mockCourses);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <main className="flex-grow flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-700">Loading courses...</p>
        </div>
      </main>
    );
  }

  return (
    <>
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-8">Our Courses</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <CardCourse key={course.id} {...course} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default Courses;