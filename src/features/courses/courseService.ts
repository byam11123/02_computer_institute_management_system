import { supabase } from '../../lib/supabaseClient';
import type { Course } from '../../types/course';

// Course Service
const courseService = {
  // Fetch all courses
  async getAllCourses() {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Course[];
  },

  // Fetch course by ID
  async getCourseById(id: string) {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data as Course;
  },

  // Create new course
  async createCourse(courseData: Omit<Course, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('courses')
      .insert([{
        ...courseData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }])
      .select()
      .single();

    if (error) throw error;
    return data as Course;
  },

  // Update course
  async updateCourse(id: string, courseData: Partial<Course>) {
    const { data, error } = await supabase
      .from('courses')
      .update({
        ...courseData,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as Course;
  },

  // Delete course
  async deleteCourse(id: string) {
    const { error } = await supabase
      .from('courses')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  },

  // Search courses
  async searchCourses(query: string) {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Course[];
  }
};

export default courseService;