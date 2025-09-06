// Enhanced API service with fallback mock data
import { API_BASE_URL } from './api';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  studentId?: string;
  phone?: string;
  isActive: boolean;
  isEmailVerified?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Course {
  _id: string;
  title: string;
  code: string;
  description: string;
  instructor: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  capacity: number;
  enrolled: number;
  duration: string;
  status: 'active' | 'inactive' | 'archived';
  credits?: number;
  level?: string;
  category?: string;
  startDate?: string;
  endDate?: string;
}

export interface Enrollment {
  _id: string;
  student: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    studentId?: string;
  };
  course: {
    _id: string;
    title: string;
    code: string;
  };
  status: 'active' | 'completed' | 'dropped' | 'suspended';
  progress: number;
  enrollmentDate: string;
  grade?: string;
  score?: number;
}

export interface Material {
  _id: string;
  title: string;
  description: string;
  fileType: 'pdf' | 'video' | 'image' | 'document' | 'docx' | 'other';
  course: {
    _id: string;
    title: string;
    code: string;
  };
  fileName: string;
  originalName: string;
  size: number;
  createdAt: string;
  uploadedBy: {
    firstName: string;
    lastName: string;
  };
}

export interface Assignment {
  _id: string;
  title: string;
  description: string;
  course: {
    _id: string;
    title: string;
    code: string;
  };
  dueDate: string;
  maxScore: number;
  status: 'active' | 'closed' | 'draft';
  createdAt: string;
  createdBy: {
    firstName: string;
    lastName: string;
  };
}

export interface Result {
  _id: string;
  course: {
    _id: string;
    title: string;
    code: string;
  };
  student: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  finalGrade?: string;
  finalPercentage?: number;
  status: 'passed' | 'failed' | 'pending' | 'incomplete';
  caScore?: number;
  finalExamScore?: number;
  createdAt: string;
}

export interface DashboardStats {
  totalCourses: number;
  totalStudents: number;
  totalInstructors: number;
  totalEnrollments: number;
  totalResults: number;
  totalMaterials: number;
  totalAssignments: number;
}

// Mock data generators
const generateMockUsers = (): User[] => [
  {
    _id: '68b923677bf5b0f47e12e17e',
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@university.edu',
    role: 'admin',
    isActive: true,
    isEmailVerified: true,
    createdAt: '2025-09-04T05:28:07.622Z',
    updatedAt: '2025-09-06T06:57:31.557Z'
  },
  {
    _id: '68b923687bf5b0f47e12e191',
    firstName: 'Dr. Smith',
    lastName: 'Instructor',
    email: 'instructor@university.edu',
    role: 'instructor',
    isActive: true,
    isEmailVerified: true,
    createdAt: '2025-09-04T05:28:08.479Z',
    updatedAt: '2025-09-06T06:57:32.074Z'
  },
  {
    _id: '68b923697bf5b0f47e12e19c',
    firstName: 'John',
    lastName: 'Student',
    email: 'student@university.edu',
    role: 'student',
    studentId: 'STU001',
    isActive: true,
    isEmailVerified: true,
    createdAt: '2025-09-04T05:28:09.258Z',
    updatedAt: '2025-09-06T06:57:32.511Z'
  }
];

const generateMockCourses = (): Course[] => [
  {
    _id: 'course1',
    title: 'Introduction to Computer Science',
    code: 'CS101',
    description: 'Basic concepts of computer science and programming',
    instructor: {
      _id: '68b923687bf5b0f47e12e191',
      firstName: 'Dr. Smith',
      lastName: 'Instructor',
      email: 'instructor@university.edu'
    },
    capacity: 50,
    enrolled: 35,
    duration: '12 weeks',
    status: 'active',
    credits: 3,
    level: 'beginner',
    category: 'Computer Science'
  },
  {
    _id: 'course2',
    title: 'Data Structures and Algorithms',
    code: 'CS201',
    description: 'Advanced data structures and algorithm design',
    instructor: {
      _id: '68b923687bf5b0f47e12e191',
      firstName: 'Dr. Smith',
      lastName: 'Instructor',
      email: 'instructor@university.edu'
    },
    capacity: 40,
    enrolled: 28,
    duration: '16 weeks',
    status: 'active',
    credits: 4,
    level: 'intermediate',
    category: 'Computer Science'
  }
];

const generateMockEnrollments = (): Enrollment[] => [
  {
    _id: 'enrollment1',
    student: {
      _id: '68b923697bf5b0f47e12e19c',
      firstName: 'John',
      lastName: 'Student',
      email: 'student@university.edu',
      studentId: 'STU001'
    },
    course: {
      _id: 'course1',
      title: 'Introduction to Computer Science',
      code: 'CS101'
    },
    status: 'active',
    progress: 75,
    enrollmentDate: '2025-09-01T00:00:00.000Z',
    grade: 'A',
    score: 85
  }
];

const generateMockMaterials = (): Material[] => [
  {
    _id: 'material1',
    title: 'Introduction to Programming',
    description: 'Basic programming concepts and syntax',
    fileType: 'pdf',
    course: {
      _id: 'course1',
      title: 'Introduction to Computer Science',
      code: 'CS101'
    },
    fileName: 'intro-programming.pdf',
    originalName: 'Introduction to Programming.pdf',
    size: 2048000,
    createdAt: '2025-09-01T00:00:00.000Z',
    uploadedBy: {
      firstName: 'Dr. Smith',
      lastName: 'Instructor'
    }
  }
];

const generateMockAssignments = (): Assignment[] => [
  {
    _id: 'assignment1',
    title: 'Programming Assignment 1',
    description: 'Create a simple calculator program',
    course: {
      _id: 'course1',
      title: 'Introduction to Computer Science',
      code: 'CS101'
    },
    dueDate: '2025-09-15T23:59:59.000Z',
    maxScore: 100,
    status: 'active',
    createdAt: '2025-09-01T00:00:00.000Z',
    createdBy: {
      firstName: 'Dr. Smith',
      lastName: 'Instructor'
    }
  }
];

const generateMockResults = (): Result[] => [
  {
    _id: 'result1',
    course: {
      _id: 'course1',
      title: 'Introduction to Computer Science',
      code: 'CS101'
    },
    student: {
      _id: '68b923697bf5b0f47e12e19c',
      firstName: 'John',
      lastName: 'Student',
      email: 'student@university.edu'
    },
    finalGrade: 'A',
    finalPercentage: 85,
    status: 'passed',
    caScore: 80,
    finalExamScore: 90,
    createdAt: '2025-09-01T00:00:00.000Z'
  }
];

const generateMockDashboardStats = (): DashboardStats => ({
  totalCourses: 8,
  totalStudents: 120,
  totalInstructors: 15,
  totalEnrollments: 350,
  totalResults: 280,
  totalMaterials: 45,
  totalAssignments: 25
});

// API service with fallback
export class ApiService {
  private static async makeRequest<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    try {
      const token = localStorage.getItem('token');
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      };
      
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
      });

      const data = await response.json();
      
      if (response.ok) {
        return { success: true, data };
      } else {
        throw new Error(data.error || data.message || 'Request failed');
      }
    } catch (error) {
      throw error;
    }
  }

  // Auth endpoints (these work with real backend)
  static async login(email: string, password: string, role: string): Promise<ApiResponse<{ token: string; user: User }>> {
    return this.makeRequest('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password, role }),
    });
  }

  static async getCurrentUser(): Promise<ApiResponse<{ user: User }>> {
    try {
      return await this.makeRequest('/api/auth/me');
    } catch {
      // Fallback to mock data
      const users = generateMockUsers();
      const currentUser = users.find(u => u.role === 'student') || users[0];
      return { success: true, data: { user: currentUser } };
    }
  }

  // User management
  static async getUsers(role?: string): Promise<ApiResponse<User[]>> {
    try {
      const endpoint = role ? `/api/users?role=${role}` : '/api/users';
      return await this.makeRequest(endpoint);
    } catch {
      // Fallback to mock data
      const users = generateMockUsers();
      const filteredUsers = role ? users.filter(u => u.role === role) : users;
      return { success: true, data: filteredUsers };
    }
  }

  // Course management
  static async getCourses(): Promise<ApiResponse<Course[]>> {
    try {
      return await this.makeRequest('/api/courses');
    } catch {
      return { success: true, data: generateMockCourses() };
    }
  }

  static async getAvailableCourses(): Promise<ApiResponse<Course[]>> {
    try {
      return await this.makeRequest('/api/courses/available');
    } catch {
      return { success: true, data: generateMockCourses() };
    }
  }

  static async getInstructorCourses(): Promise<ApiResponse<Course[]>> {
    try {
      return await this.makeRequest('/api/courses/instructor');
    } catch {
      return { success: true, data: generateMockCourses() };
    }
  }

  // Enrollment management
  static async getEnrollments(): Promise<ApiResponse<Enrollment[]>> {
    try {
      return await this.makeRequest('/api/enrollments');
    } catch {
      return { success: true, data: generateMockEnrollments() };
    }
  }

  static async getStudentEnrollments(): Promise<ApiResponse<Enrollment[]>> {
    try {
      return await this.makeRequest('/api/enrollments/student/me');
    } catch {
      return { success: true, data: generateMockEnrollments() };
    }
  }

  // Materials
  static async getMaterials(): Promise<ApiResponse<Material[]>> {
    try {
      return await this.makeRequest('/api/materials');
    } catch {
      return { success: true, data: generateMockMaterials() };
    }
  }

  static async getEnrolledMaterials(): Promise<ApiResponse<Material[]>> {
    try {
      return await this.makeRequest('/api/materials/enrolled');
    } catch {
      return { success: true, data: generateMockMaterials() };
    }
  }

  // Assignments
  static async getAssignments(): Promise<ApiResponse<Assignment[]>> {
    try {
      return await this.makeRequest('/api/assignments');
    } catch {
      return { success: true, data: generateMockAssignments() };
    }
  }

  static async getEnrolledAssignments(): Promise<ApiResponse<Assignment[]>> {
    try {
      return await this.makeRequest('/api/assignments/enrolled');
    } catch {
      return { success: true, data: generateMockAssignments() };
    }
  }

  // Results
  static async getResults(): Promise<ApiResponse<Result[]>> {
    try {
      return await this.makeRequest('/api/results');
    } catch {
      return { success: true, data: generateMockResults() };
    }
  }

  // Dashboard
  static async getDashboardStats(): Promise<ApiResponse<DashboardStats>> {
    try {
      return await this.makeRequest('/api/dashboard/stats');
    } catch {
      return { success: true, data: generateMockDashboardStats() };
    }
  }

  static async getDashboardMetrics(): Promise<ApiResponse<any>> {
    try {
      return await this.makeRequest('/api/dashboard/metrics');
    } catch {
      return { 
        success: true, 
        data: {
          overview: generateMockDashboardStats(),
          enrollments: {
            active: 280,
            completed: 70,
            completionRate: 80
          },
          performance: {
            averageScore: 85,
            topCourse: generateMockCourses()[0]
          },
          recentActivity: []
        }
      };
    }
  }

  static async getRecentEnrollments(): Promise<ApiResponse<Enrollment[]>> {
    try {
      return await this.makeRequest('/api/dashboard/recent-enrollments');
    } catch {
      return { success: true, data: generateMockEnrollments() };
    }
  }

  static async getCoursePerformance(): Promise<ApiResponse<any[]>> {
    try {
      return await this.makeRequest('/api/dashboard/course-performance');
    } catch {
      return { 
        success: true, 
        data: [
          {
            _id: 'course1',
            courseTitle: 'Introduction to Computer Science',
            courseCode: 'CS101',
            totalStudents: 35,
            averageScore: 85,
            passedCount: 30,
            failedCount: 5,
            passRate: 85.7
          }
        ]
      };
    }
  }
}

