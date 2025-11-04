export interface Batch {
  id: string;
  name: string;
  course_id: string;
  start_date: string;
  end_date: string;
  max_students: number;
  current_students: number;
  status: 'active' | 'completed' | 'upcoming';
  created_at: string;
  updated_at: string;
}