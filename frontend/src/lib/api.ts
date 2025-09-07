// Simple mock API that definitely works in production
export const API_BASE_URL = "mock://api";

export function getAuthToken(): string | null {
  return localStorage.getItem("token");
}

// Simple mock data
const mockUsers = [
  {
    _id: "admin1",
    firstName: "Admin",
    lastName: "User",
    email: "admin@university.edu",
    role: "admin",
  },
  {
    _id: "instructor1",
    firstName: "Dr. Sarah",
    lastName: "Johnson",
    email: "instructor@university.edu",
    role: "instructor",
  },
  {
    _id: "student1",
    firstName: "John",
    lastName: "Doe",
    email: "student@university.edu",
    role: "student",
    studentId: "STU001",
  },
];

const mockCourses = [
  {
    _id: "course1",
    title: "Introduction to Computer Science",
    code: "CS101",
    description: "A comprehensive introduction to computer science fundamentals",
    instructor: {
      _id: "instructor1",
      firstName: "Dr. Sarah",
      lastName: "Johnson",
      email: "instructor@university.edu",
    },
    capacity: 50,
    enrolled: 35,
    duration: "16 weeks",
    status: "active",
  },
  {
    _id: "course2",
    title: "Data Structures and Algorithms",
    code: "CS201",
    description: "Advanced study of data structures and algorithmic problem-solving",
    instructor: {
      _id: "instructor1",
      firstName: "Dr. Sarah",
      lastName: "Johnson",
      email: "instructor@university.edu",
    },
    capacity: 40,
    enrolled: 28,
    duration: "16 weeks",
    status: "active",
  },
];

const mockEnrollments = [
  {
    _id: "enrollment1",
    student: {
      _id: "student1",
      firstName: "John",
      lastName: "Doe",
      email: "student@university.edu",
      studentId: "STU001",
    },
    course: {
      _id: "course1",
      title: "Introduction to Computer Science",
      code: "CS101",
    },
    status: "active",
    progress: 75,
    enrollmentDate: "2024-01-15T00:00:00Z",
  },
];

const mockAssignments = [
  {
    _id: "assignment1",
    title: "Programming Assignment 1",
    description: "Implement basic data structures in Python",
    course: {
      _id: "course1",
      title: "Introduction to Computer Science",
      code: "CS101",
    },
    dueDate: "2024-03-15T23:59:59Z",
    maxPoints: 100,
    createdBy: {
      firstName: "Dr. Sarah",
      lastName: "Johnson",
    },
  },
];

const mockMaterials = [
  {
    _id: "material1",
    title: "Introduction to Programming Concepts",
    description: "Comprehensive guide to programming fundamentals",
    fileType: "pdf",
    course: {
      _id: "course1",
      title: "Introduction to Computer Science",
      code: "CS101",
    },
    fileName: "intro_programming.pdf",
    originalName: "Introduction to Programming Concepts.pdf",
    size: 2048576,
    uploadedBy: {
      firstName: "Dr. Sarah",
      lastName: "Johnson",
    },
  },
];

const mockResults = [
  {
    _id: "result1",
    student: {
      _id: "student1",
      firstName: "John",
      lastName: "Doe",
      studentId: "STU001",
    },
    course: {
      _id: "course1",
      title: "Introduction to Computer Science",
      code: "CS101",
    },
    finalGrade: "A",
    finalPercentage: 92,
    status: "passed",
  },
];

// Mock API functions
export async function apiFetch<T = any>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const method = options.method || "GET";
  const body = options.body ? JSON.parse(options.body as string) : {};
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 100));
  
  try {
    // Authentication routes
    if (path === "/api/auth/login") {
      const user = mockUsers.find(u => u.email === body.email && u.role === body.role);
      
      if (!user) {
        throw new Error("Invalid credentials");
      }
      
      if (body.password !== "password123") {
        throw new Error("Invalid password");
      }
      
      const token = `mock_token_${user._id}_${Date.now()}`;
      
      return {
        success: true,
        token,
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
          studentId: user.studentId,
        },
      } as T;
    }
    
    if (path === "/api/auth/me") {
      const userData = localStorage.getItem("user");
      if (!userData) {
        throw new Error("Not authenticated");
      }
      
      const user = JSON.parse(userData);
      const fullUser = mockUsers.find(u => u._id === user.id);
      
      if (!fullUser) {
        throw new Error("User not found");
      }
      
      return {
        user: {
          id: fullUser._id,
          firstName: fullUser.firstName,
          lastName: fullUser.lastName,
          email: fullUser.email,
          role: fullUser.role,
          studentId: fullUser.studentId,
        },
      } as T;
    }
    
    if (path === "/api/auth/set-password") {
      return {
        success: true,
        message: "Password set successfully",
      } as T;
    }
    
    if (path === "/api/auth/register") {
      const existingUser = mockUsers.find(u => u.email === body.email);
      if (existingUser) {
        throw new Error("User already exists");
      }
      
      const newUser = {
        _id: `student${mockUsers.length + 1}`,
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        role: "student",
        studentId: `STU${String(mockUsers.filter(u => u.role === "student").length + 1).padStart(3, '0')}`,
      };
      
      mockUsers.push(newUser);
      
      return {
        success: true,
        message: "Registration successful",
        user: {
          id: newUser._id,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
          role: newUser.role,
          studentId: newUser.studentId,
        },
      } as T;
    }
    
    // Dashboard routes
    if (path === "/api/dashboard/stats") {
      return {
        success: true,
        data: {
          totalCourses: mockCourses.length,
          totalStudents: mockUsers.filter(u => u.role === "student").length,
          totalEnrollments: mockEnrollments.length,
          completedCourses: mockEnrollments.filter(e => e.status === "completed").length,
        },
      } as T;
    }
    
    if (path === "/api/dashboard/recent-enrollments") {
      return {
        success: true,
        data: mockEnrollments.slice(0, 5),
      } as T;
    }
    
    if (path === "/api/dashboard/course-performance") {
      return {
        success: true,
        data: mockCourses.map(course => ({
          _id: course._id,
          courseTitle: course.title,
          courseCode: course.code,
          totalStudents: mockEnrollments.filter(e => e.course._id === course._id).length,
          averageScore: 85,
          passedCount: 20,
          failedCount: 5,
          passRate: 80,
        })),
      } as T;
    }
    
    if (path === "/api/dashboard/metrics") {
      return {
        success: true,
        data: {
          overview: {
            totalCourses: mockCourses.length,
            totalStudents: mockUsers.filter(u => u.role === "student").length,
            totalInstructors: mockUsers.filter(u => u.role === "instructor").length,
            totalEnrollments: mockEnrollments.length,
            totalResults: mockResults.length,
          },
          enrollments: {
            active: mockEnrollments.filter(e => e.status === "active").length,
            completed: mockEnrollments.filter(e => e.status === "completed").length,
            completionRate: 75,
          },
          performance: {
            averageScore: 85,
            topCourse: mockCourses[0],
          },
          recentActivity: mockEnrollments.map(enrollment => ({
            id: enrollment._id,
            studentName: `${enrollment.student.firstName} ${enrollment.student.lastName}`,
            courseName: enrollment.course.title,
            status: enrollment.status,
            date: enrollment.enrollmentDate,
          })),
        },
      } as T;
    }
    
    if (path === "/api/dashboard/counts") {
      return {
        success: true,
        data: {
          totalMaterials: mockMaterials.length,
          totalAssignments: mockAssignments.length,
        },
      } as T;
    }
    
    // Courses routes
    if (path.startsWith("/api/courses")) {
      if (path === "/api/courses" || path.includes("?")) {
        return {
          success: true,
          data: mockCourses,
        } as T;
      }
      
      if (path === "/api/courses/available") {
        return {
          success: true,
          data: mockCourses.filter(c => c.status === "active"),
        } as T;
      }
      
      if (path === "/api/courses/instructor") {
        return {
          success: true,
          data: mockCourses.filter(c => c.instructor._id === "instructor1"),
        } as T;
      }
      
      if (method === "POST") {
        const newCourse = {
          _id: `course${mockCourses.length + 1}`,
          ...body,
          enrolled: 0,
          createdAt: new Date().toISOString(),
        };
        mockCourses.push(newCourse);
        return {
          success: true,
          data: newCourse,
        } as T;
      }
    }
    
    // Users routes
    if (path.startsWith("/api/users")) {
      if (path === "/api/users" || path.includes("?")) {
        return {
          success: true,
          data: mockUsers,
        } as T;
      }
      
      if (path === "/api/users/students") {
        return {
          success: true,
          data: mockUsers.filter(u => u.role === "student"),
        } as T;
      }
      
      if (method === "POST") {
        const newUser = {
          _id: `user${mockUsers.length + 1}`,
          ...body,
          createdAt: new Date().toISOString(),
        };
        mockUsers.push(newUser);
        return {
          success: true,
          data: newUser,
        } as T;
      }
    }
    
    // Enrollments routes
    if (path.startsWith("/api/enrollments")) {
      if (path === "/api/enrollments") {
        if (method === "GET") {
          return {
            success: true,
            data: mockEnrollments,
          } as T;
        }
        if (method === "POST") {
          const userData = localStorage.getItem("user");
          if (!userData) {
            throw new Error("Not authenticated");
          }
          
          const user = JSON.parse(userData);
          const course = mockCourses.find(c => c._id === body.courseId);
          
          if (!course) {
            throw new Error("Course not found");
          }
          
          const newEnrollment = {
            _id: `enrollment${mockEnrollments.length + 1}`,
            student: {
              _id: user.id,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              studentId: user.studentId,
            },
            course: {
              _id: course._id,
              title: course.title,
              code: course.code,
            },
            status: "active",
            progress: 0,
            enrollmentDate: new Date().toISOString(),
          };
          
          mockEnrollments.push(newEnrollment);
          course.enrolled += 1;
          
          return {
            success: true,
            data: newEnrollment,
          } as T;
        }
      }
      
      if (path === "/api/enrollments/student/me") {
        const userData = localStorage.getItem("user");
        if (!userData) {
          throw new Error("Not authenticated");
        }
        
        const user = JSON.parse(userData);
        const studentEnrollments = mockEnrollments.filter(e => e.student._id === user.id);
        
        return {
          success: true,
          data: studentEnrollments,
        } as T;
      }
    }
    
    // Assignments routes
    if (path.startsWith("/api/assignments")) {
      if (path === "/api/assignments") {
        if (method === "GET") {
          return {
            success: true,
            data: mockAssignments,
          } as T;
        }
        if (method === "POST") {
          const newAssignment = {
            _id: `assignment${mockAssignments.length + 1}`,
            ...body,
            createdAt: new Date().toISOString(),
          };
          mockAssignments.push(newAssignment);
          return {
            success: true,
            data: newAssignment,
          } as T;
        }
      }
      
      if (path === "/api/assignments/enrolled") {
        const userData = localStorage.getItem("user");
        if (!userData) {
          throw new Error("Not authenticated");
        }
        
        const user = JSON.parse(userData);
        const studentEnrollments = mockEnrollments.filter(e => e.student._id === user.id);
        const enrolledCourseIds = studentEnrollments.map(e => e.course._id);
        const enrolledAssignments = mockAssignments.filter(a => enrolledCourseIds.includes(a.course._id));
        
        return {
          success: true,
          data: enrolledAssignments,
        } as T;
      }
    }
    
    // Materials routes
    if (path.startsWith("/api/materials")) {
      if (path === "/api/materials") {
        if (method === "GET") {
          return {
            success: true,
            data: mockMaterials,
          } as T;
        }
        if (method === "POST") {
          const newMaterial = {
            _id: `material${mockMaterials.length + 1}`,
            ...body,
            createdAt: new Date().toISOString(),
          };
          mockMaterials.push(newMaterial);
          return {
            success: true,
            data: newMaterial,
          } as T;
        }
      }
      
      if (path === "/api/materials/enrolled") {
        const userData = localStorage.getItem("user");
        if (!userData) {
          throw new Error("Not authenticated");
        }
        
        const user = JSON.parse(userData);
        const studentEnrollments = mockEnrollments.filter(e => e.student._id === user.id);
        const enrolledCourseIds = studentEnrollments.map(e => e.course._id);
        const enrolledMaterials = mockMaterials.filter(m => enrolledCourseIds.includes(m.course._id));
        
        return {
          success: true,
          data: enrolledMaterials,
        } as T;
      }
    }
    
    // Results routes
    if (path.startsWith("/api/results")) {
      if (path === "/api/results") {
        if (method === "GET") {
          return {
            success: true,
            data: mockResults,
          } as T;
        }
        if (method === "POST") {
          const newResult = {
            _id: `result${mockResults.length + 1}`,
            ...body,
            createdAt: new Date().toISOString(),
          };
          mockResults.push(newResult);
          return {
            success: true,
            data: newResult,
          } as T;
        }
      }
    }
    
    // Default fallback
    throw new Error(`Mock API endpoint not found: ${method} ${path}`);
    
  } catch (error: any) {
    throw new Error(error.message || "Mock API error");
  }
}

export async function apiFetchForm<T = any>(
  path: string,
  formData: FormData,
  options: RequestInit = {}
): Promise<T> {
  // Convert FormData to regular object for mock API
  const body: any = {};
  formData.forEach((value, key) => {
    body[key] = value;
  });
  
  return await apiFetch<T>(path, {
    ...options,
    body: JSON.stringify(body),
  });
}