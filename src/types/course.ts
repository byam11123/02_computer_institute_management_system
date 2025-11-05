export interface Course {
  id: string;
  title: string;
  description: string;
  duration: string; // e.g., "3 months", "6 weeks"
  fee: number;
  syllabus: string; // URL or content
  created_at: string;
  updated_at: string;
}