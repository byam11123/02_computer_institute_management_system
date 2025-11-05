import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Check environment variables during runtime
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

// Create a conditional client
let supabaseClient: SupabaseClient | any;

// Only initialize the real client if environment variables exist and are valid URLs
if (supabaseUrl && supabaseAnonKey && typeof supabaseUrl === 'string' && supabaseUrl.startsWith('http')) {
  supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
} else {
  // Mock client for development without Supabase
  console.warn('Supabase environment variables not set or invalid, using mock client');
  
  // Define mock data
  const mockStudents = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '1234567890',
      address: '123 Main St',
      date_of_birth: '2000-01-01',
      enrollment_date: '2023-09-01',
      batch_id: 'batch1',
      course_id: 'course1',
      status: 'active',
      created_at: '2023-01-01',
      updated_at: '2023-01-01',
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '0987654321',
      address: '456 Oak Ave',
      date_of_birth: '2001-05-15',
      enrollment_date: '2023-09-01',
      batch_id: 'batch1',
      course_id: 'course1',
      status: 'active',
      created_at: '2023-01-01',
      updated_at: '2023-01-01',
    }
  ];
  
  const mockCourses = [
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
    }
  ];
  
  const mockBatches = [
    {
      id: 'batch1',
      name: 'Batch #1',
      course_id: 'course1',
      start_date: '2023-09-01',
      end_date: '2023-12-01',
      max_students: 30,
      current_students: 25,
      status: 'active',
      created_at: '2023-01-01',
      updated_at: '2023-01-01',
    }
  ];

  // Define mock implementations
  const mockFrom = (table: string) => {
    let mockData: any[];
    
    switch (table) {
      case 'students':
        mockData = [...mockStudents];
        break;
      case 'courses':
        mockData = [...mockCourses];
        break;
      case 'batches':
        mockData = [...mockBatches];
        break;
      default:
        mockData = [];
    }
    
    return {
      select: (_columns?: string) => {
        return {
          order: (_column: string, _options: any) => {
            return {
              eq: (col: string, val: any) => {
                const data = mockData.filter((item: any) => item[col] === val);
                return Promise.resolve({ data, error: null });
              },
              or: (_condition: string) => {
                return Promise.resolve({ data: mockData, error: null });
              },
              single: () => {
                return Promise.resolve({ data: mockData[0], error: null });
              },
              then: (callback: (result: any) => any) => {
                return callback({ data: mockData, error: null });
              }
            };
          },
          then: (callback: (result: any) => any) => {
            return callback({ data: mockData, error: null });
          }
        };
      },
      insert: (data: any) => {
        return {
          select: () => {
            return {
              single: () => {
                // Add mock ID and timestamps
                const newItem = { 
                  ...data[0], 
                  id: Math.random().toString(36).substr(2, 9),
                  created_at: new Date().toISOString(),
                  updated_at: new Date().toISOString()
                };
                
                // Add to appropriate mock data array
                switch (table) {
                  case 'students':
                    mockStudents.push(newItem);
                    break;
                  case 'courses':
                    mockCourses.push(newItem);
                    break;
                  case 'batches':
                    mockBatches.push(newItem);
                    break;
                }
                
                return Promise.resolve({ data: newItem, error: null });
              }
            };
          }
        };
      },
      update: (data: any) => {
        return {
          eq: (col: string, val: any) => {
            const dataArray = 
              table === 'students' ? mockStudents :
              table === 'courses' ? mockCourses :
              table === 'batches' ? mockBatches : [];
              
            const index = dataArray.findIndex((item: any) => item[col] === val);
            if (index !== -1) {
              dataArray[index] = { ...dataArray[index], ...data, updated_at: new Date().toISOString() };
              return {
                select: () => {
                  return {
                    single: () => {
                      return Promise.resolve({ data: dataArray[index], error: null });
                    }
                  };
                }
              };
            }
            return {
              select: () => {
                return {
                  single: () => {
                    return Promise.resolve({ data: null, error: { message: 'Item not found' } });
                  }
                };
              }
            };
          }
        };
      },
      delete: () => {
        return {
          eq: (col: string, val: any) => {
            const dataArray = 
              table === 'students' ? mockStudents :
              table === 'courses' ? mockCourses :
              table === 'batches' ? mockBatches : [];
              
            const filteredData = dataArray.filter((item: any) => item[col] !== val);
            // Update the array in place
            if (table === 'students') {
              mockStudents.splice(0, mockStudents.length, ...filteredData as any);
            } else if (table === 'courses') {
              mockCourses.splice(0, mockCourses.length, ...filteredData as any);
            } else if (table === 'batches') {
              mockBatches.splice(0, mockBatches.length, ...filteredData as any);
            }
            
            return Promise.resolve({ error: null });
          }
        };
      }
    };
  };

  const mockAuth = {
    signInWithPassword: (credentials: any) => {
      // Mock authentication
      if (credentials.email === 'admin@example.com' && credentials.password) {
        return Promise.resolve({ 
          data: { 
            user: { id: '1', email: 'admin@example.com', user_metadata: { name: 'Admin User' } } 
          }, 
          error: null 
        });
      } else if (credentials.email === 'student@example.com' && credentials.password) {
        return Promise.resolve({ 
          data: { 
            user: { id: '2', email: 'student@example.com', user_metadata: { name: 'Student User' } } 
          }, 
          error: null 
        });
      } else {
        return Promise.resolve({ data: null, error: { message: 'Invalid credentials' } });
      }
    },
    signUp: (data: any) => {
      return Promise.resolve({ 
        data: { user: { id: Math.random().toString(36).substr(2, 9), email: data.email, user_metadata: { name: data.options?.data?.name || 'New User' } } }, 
        error: null 
      });
    },
    signOut: () => {
      return Promise.resolve({ error: null });
    },
    getUser: () => {
      // Return a mock user if one is "logged in"
      const mockUser = localStorage.getItem('mockUser');
      if (mockUser) {
        return Promise.resolve({ data: { user: JSON.parse(mockUser) } });
      }
      return Promise.resolve({ data: { user: null } });
    },
    getSession: () => {
      return Promise.resolve({ data: { session: null }, error: null });
    }
  };

  supabaseClient = {
    from: mockFrom,
    auth: mockAuth
  };
}

export const supabase = supabaseClient;