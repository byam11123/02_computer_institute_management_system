import { supabase } from '../../lib/supabaseClient';
import type { Student } from '../../types/student';

// Student Service
const studentService = {
  // Fetch all students
  async getAllStudents() {
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Student[];
  },

  // Fetch student by ID
  async getStudentById(id: string) {
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data as Student;
  },

  // Create new student
  async createStudent(studentData: Omit<Student, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('students')
      .insert([{
        ...studentData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }])
      .select()
      .single();

    if (error) throw error;
    return data as Student;
  },

  // Update student
  async updateStudent(id: string, studentData: Partial<Student>) {
    const { data, error } = await supabase
      .from('students')
      .update({
        ...studentData,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as Student;
  },

  // Delete student
  async deleteStudent(id: string) {
    const { error } = await supabase
      .from('students')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  },

  // Search students
  async searchStudents(query: string) {
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .or(`name.ilike.%${query}%,email.ilike.%${query}%,phone.ilike.%${query}%`)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Student[];
  }
};

export default studentService;