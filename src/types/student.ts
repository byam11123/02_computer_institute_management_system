export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  date_of_birth: string;
  enrollment_date: string;
  batch_id: string;
  course_id: string;
  status: 'active' | 'inactive' | 'completed';
  created_at: string;
  updated_at: string;
}