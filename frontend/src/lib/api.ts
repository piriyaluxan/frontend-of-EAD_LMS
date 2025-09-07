// Production-ready Mock API for Vercel deployment
export const API_BASE_URL = "https://api.example.com"; // This won't be used, but prevents build errors

export function getAuthToken(): string | null {
  return localStorage.getItem("token");
}

// In-memory storage for mock data (persists during session)
let mockData = {
  users: [
    {
      _id: "admin1",
      firstName: "Admin",
      lastName: "User",
      email: "admin@university.edu",
      role: "admin",
      isActive: true,
    },
    {
      _id: "instructor1",
      firstName: "Dr. Sarah",
      lastName: "Johnson",
      email: "instructor@university.edu",
      role: "instructor",
      isActive: true,
    },
    {
      _id: "student1",
      firstName: "John",
      lastName: "Doe",
      email: "student@university.edu",
      role: "student",
      isActive: true,
      studentId: "STU001",
    },
    {
      _id: "student2",
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@university.edu",
      role: "student",
      isActive: true,
      studentId: "STU002",
    },
  ],
  courses: [
    {
      _id: "course1",
      title: "Introduction to Computer Science",
      code: "CS101",
      description: "A comprehensive introduction to computer science fundamentals including programming, algorithms, and data structures.",
      instructor: {
        _id: "instructor1",
        firstName: "Dr. Sarah",
        lastName: "Johnson",
        email: "instructor@university.edu",
      },
      capacity: 50,
      enrolled: 35,
      duration: "16 weeks",
      credits: 3,
      level: "beginner",
      category: "Computer Science",
      status: "active",
      createdAt: "2024-01-01T00:00:00Z",
    },
    {
      _id: "course2",
      title: "Data Structures and Algorithms",
      code: "CS201",
      description: "Advanced study of data structures and algorithmic problem-solving techniques.",
      instructor: {
        _id: "instructor1",
        firstName: "Dr. Sarah",
        lastName: "Johnson",
        email: "instructor@university.edu",
      },
      capacity: 40,
      enrolled: 28,
      duration: "16 weeks",
      credits: 4,
      level: "intermediate",
      category: "Computer Science",
      status: "active",
      createdAt: "2024-01-01T00:00:00Z",
    },
    {
      _id: "course3",
      title: "Web Development Fundamentals",
      code: "WEB101",
      description: "Learn HTML, CSS, JavaScript and modern web development practices.",
      instructor: {
        _id: "instructor1",
        firstName: "Dr. Sarah",
        lastName: "Johnson",
        email: "instructor@university.edu",
      },
      capacity: 45,
      enrolled: 42,
      duration: "12 weeks",
      credits: 3,
      level: "beginner",
      category: "Web Development",
      status: "active",
      createdAt: "2024-01-01T00:00:00Z",
    },
  ],
  enrollments: [
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
      grade: "A",
      score: 92,
    },
    {
      _id: "enrollment2",
      student: {
        _id: "student2",
        firstName: "Jane",
        lastName: "Smith",
        email: "jane.smith@university.edu",
        studentId: "STU002",
      },
      course: {
        _id: "course1",
        title: "Introduction to Computer Science",
        code: "CS101",
      },
      status: "active",
      progress: 80,
      enrollmentDate: "2024-01-15T00:00:00Z",
      grade: "A-",
      score: 88,
    },
  ],
  assignments: [
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
      createdAt: "2024-02-01T00:00:00Z",
    },
    {
      _id: "assignment2",
      title: "Algorithm Analysis",
      description: "Analyze time complexity of given algorithms",
      course: {
        _id: "course2",
        title: "Data Structures and Algorithms",
        code: "CS201",
      },
      dueDate: "2024-03-20T23:59:59Z",
      maxPoints: 150,
      createdBy: {
        firstName: "Dr. Sarah",
        lastName: "Johnson",
      },
      createdAt: "2024-02-05T00:00:00Z",
    },
  ],
  materials: [
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
      createdAt: "2024-01-20T00:00:00Z",
    },
    {
      _id: "material2",
      title: "Data Structures Overview",
      description: "Visual guide to common data structures",
      fileType: "video",
      course: {
        _id: "course2",
        title: "Data Structures and Algorithms",
        code: "CS201",
      },
      fileName: "data_structures_overview.mp4",
      originalName: "Data Structures Overview.mp4",
      size: 52428800,
      uploadedBy: {
        firstName: "Dr. Sarah",
        lastName: "Johnson",
      },
      createdAt: "2024-01-25T00:00:00Z",
    },
  ],
  results: [
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
      caScore: 88,
      finalExamScore: 96,
    },
  ],
};

// Helper function to simulate network delay
const delay = (ms: number = 100) => new Promise(resolve => setTimeout(resolve, ms));

// Helper function to get current user from localStorage
const getCurrentUser = () => {
  try {
    const userData = localStorage.getItem("user");
    return userData ? JSON.parse(userData) : null;
  } catch {
    return null;
  }
};

// Main API function that handles all requests
export async function apiFetch<T = any>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const method = options.method || "GET";
  let body: any = {};
  
  try {
    if (options.body) {
      body = typeof options.body === 'string' ? JSON.parse(options.body) : options.body;
    }
  } catch (e) {
    body = {};
  }
  
  // Simulate network delay
  await delay(100);
  
  try {
    // Authentication routes
    if (path === "/api/auth/login") {
      const user = mockData.users.find(u => u.email === body.email && u.role === body.role);
      
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
      const user = getCurrentUser();
      if (!user) {
        throw new Error("Not authenticated");
      }
      
      const fullUser = mockData.users.find(u => u._id === user.id);
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
      const existingUser = mockData.users.find(u => u.email === body.email);
      if (existingUser) {
        throw new Error("User already exists");
      }
      
      const newUser = {
        _id: `student${mockData.users.length + 1}`,
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        role: "student",
        isActive: true,
        studentId: `STU${String(mockData.users.filter(u => u.role === "student").length + 1).padStart(3, '0')}`,
        createdAt: new Date().toISOString(),
      };
      
      mockData.users.push(newUser);
      
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
          totalCourses: mockData.courses.length,
          totalStudents: mockData.users.filter(u => u.role === "student").length,
          totalEnrollments: mockData.enrollments.length,
          completedCourses: mockData.enrollments.filter(e => e.status === "completed").length,
        },
      } as T;
    }
    
    if (path === "/api/dashboard/recent-enrollments") {
      return {
        success: true,
        data: mockData.enrollments.slice(0, 5).map(enrollment => ({
          _id: enrollment._id,
          student: enrollment.student,
          course: enrollment.course,
          status: enrollment.status,
          createdAt: enrollment.enrollmentDate,
        })),
      } as T;
    }
    
    if (path === "/api/dashboard/course-performance") {
      return {
        success: true,
        data: mockData.courses.map(course => {
          const courseEnrollments = mockData.enrollments.filter(e => e.course._id === course._id);
          const passedCount = courseEnrollments.filter(e => e.status === "completed" && e.score && e.score >= 60).length;
          const failedCount = courseEnrollments.filter(e => e.status === "completed" && e.score && e.score < 60).length;
          const averageScore = courseEnrollments.length > 0 
            ? courseEnrollments.reduce((sum, e) => sum + (e.score || 0), 0) / courseEnrollments.length 
            : 0;
          
          return {
            _id: course._id,
            courseTitle: course.title,
            courseCode: course.code,
            totalStudents: courseEnrollments.length,
            averageScore: Math.round(averageScore),
            passedCount,
            failedCount,
            passRate: courseEnrollments.length > 0 ? Math.round((passedCount / courseEnrollments.length) * 100) : 0,
          };
        }),
      } as T;
    }
    
    if (path === "/api/dashboard/metrics") {
      return {
        success: true,
        data: {
          overview: {
            totalCourses: mockData.courses.length,
            totalStudents: mockData.users.filter(u => u.role === "student").length,
            totalInstructors: mockData.users.filter(u => u.role === "instructor").length,
            totalEnrollments: mockData.enrollments.length,
            totalResults: mockData.results.length,
          },
          enrollments: {
            active: mockData.enrollments.filter(e => e.status === "active").length,
            completed: mockData.enrollments.filter(e => e.status === "completed").length,
            completionRate: mockData.enrollments.length > 0 
              ? Math.round((mockData.enrollments.filter(e => e.status === "completed").length / mockData.enrollments.length) * 100)
              : 0,
          },
          performance: {
            averageScore: mockData.results.length > 0 
              ? Math.round(mockData.results.reduce((sum, r) => sum + (r.finalPercentage || 0), 0) / mockData.results.length)
              : 0,
            topCourse: mockData.courses[0] || null,
          },
          recentActivity: mockData.enrollments.slice(0, 5).map(enrollment => ({
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
          totalMaterials: mockData.materials.length,
          totalAssignments: mockData.assignments.length,
        },
      } as T;
    }
    
    // Courses routes
    if (path.startsWith("/api/courses")) {
      if (path === "/api/courses" || path.includes("?")) {
        return {
          success: true,
          data: mockData.courses,
        } as T;
      }
      
      if (path === "/api/courses/available") {
        return {
          success: true,
          data: mockData.courses.filter(c => c.status === "active"),
        } as T;
      }
      
      if (path === "/api/courses/instructor") {
        const user = getCurrentUser();
        if (!user) {
          throw new Error("Not authenticated");
        }
        
        return {
          success: true,
          data: mockData.courses.filter(c => c.instructor._id === user.id),
        } as T;
      }
      
      if (method === "POST") {
        const newCourse = {
          _id: `course${mockData.courses.length + 1}`,
          ...body,
          enrolled: 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        mockData.courses.push(newCourse);
        return {
          success: true,
          data: newCourse,
        } as T;
      }
      
      if (method === "PUT") {
        const courseId = path.split("/").pop();
        const courseIndex = mockData.courses.findIndex(c => c._id === courseId);
        if (courseIndex === -1) {
          throw new Error("Course not found");
        }
        
        mockData.courses[courseIndex] = {
          ...mockData.courses[courseIndex],
          ...body,
          updatedAt: new Date().toISOString(),
        };
        
        return {
          success: true,
          data: mockData.courses[courseIndex],
        } as T;
      }
      
      if (method === "DELETE") {
        const courseId = path.split("/").pop();
        const courseIndex = mockData.courses.findIndex(c => c._id === courseId);
        if (courseIndex === -1) {
          throw new Error("Course not found");
        }
        
        mockData.courses.splice(courseIndex, 1);
        return {
          success: true,
          message: "Course deleted successfully",
        } as T;
      }
    }
    
    // Users routes
    if (path.startsWith("/api/users")) {
      if (path === "/api/users" || path.includes("?")) {
        return {
          success: true,
          data: mockData.users,
        } as T;
      }
      
      if (path === "/api/users/students") {
        return {
          success: true,
          data: mockData.users.filter(u => u.role === "student"),
        } as T;
      }
      
      if (method === "POST") {
        const newUser = {
          _id: `user${mockData.users.length + 1}`,
          ...body,
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        mockData.users.push(newUser);
        return {
          success: true,
          data: newUser,
        } as T;
      }
      
      if (method === "PUT") {
        const userId = path.split("/").pop();
        const userIndex = mockData.users.findIndex(u => u._id === userId);
        if (userIndex === -1) {
          throw new Error("User not found");
        }
        
        mockData.users[userIndex] = {
          ...mockData.users[userIndex],
          ...body,
          updatedAt: new Date().toISOString(),
        };
        
        return {
          success: true,
          data: mockData.users[userIndex],
        } as T;
      }
      
      if (method === "DELETE") {
        const userId = path.split("/").pop();
        const userIndex = mockData.users.findIndex(u => u._id === userId);
        if (userIndex === -1) {
          throw new Error("User not found");
        }
        
        mockData.users.splice(userIndex, 1);
        return {
          success: true,
          message: "User deleted successfully",
        } as T;
      }
    }
    
    // Enrollments routes
    if (path.startsWith("/api/enrollments")) {
      if (path === "/api/enrollments") {
        if (method === "GET") {
          return {
            success: true,
            data: mockData.enrollments,
          } as T;
        }
        if (method === "POST") {
          const user = getCurrentUser();
          if (!user) {
            throw new Error("Not authenticated");
          }
          
          const course = mockData.courses.find(c => c._id === body.courseId);
          if (!course) {
            throw new Error("Course not found");
          }
          
          // Check if already enrolled
          const existingEnrollment = mockData.enrollments.find(
            e => e.student._id === user.id && e.course._id === body.courseId
          );
          
          if (existingEnrollment) {
            throw new Error("Already enrolled in this course");
          }
          
          // Check capacity
          if (course.enrolled >= course.capacity) {
            throw new Error("Course is full");
          }
          
          const newEnrollment = {
            _id: `enrollment${mockData.enrollments.length + 1}`,
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
            grade: undefined,
            score: undefined,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          
          mockData.enrollments.push(newEnrollment);
          course.enrolled += 1;
          
          return {
            success: true,
            data: newEnrollment,
          } as T;
        }
      }
      
      if (path === "/api/enrollments/student/me") {
        const user = getCurrentUser();
        if (!user) {
          throw new Error("Not authenticated");
        }
        
        const studentEnrollments = mockData.enrollments.filter(e => e.student._id === user.id);
        
        return {
          success: true,
          data: studentEnrollments,
        } as T;
      }
      
      if (method === "PUT") {
        const enrollmentId = path.split("/").pop();
        const enrollmentIndex = mockData.enrollments.findIndex(e => e._id === enrollmentId);
        if (enrollmentIndex === -1) {
          throw new Error("Enrollment not found");
        }
        
        mockData.enrollments[enrollmentIndex] = {
          ...mockData.enrollments[enrollmentIndex],
          ...body,
          updatedAt: new Date().toISOString(),
        };
        
        return {
          success: true,
          data: mockData.enrollments[enrollmentIndex],
        } as T;
      }
    }
    
    // Assignments routes
    if (path.startsWith("/api/assignments")) {
      if (path === "/api/assignments") {
        if (method === "GET") {
          return {
            success: true,
            data: mockData.assignments,
          } as T;
        }
        if (method === "POST") {
          const newAssignment = {
            _id: `assignment${mockData.assignments.length + 1}`,
            ...body,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          mockData.assignments.push(newAssignment);
          return {
            success: true,
            data: newAssignment,
          } as T;
        }
      }
      
      if (path === "/api/assignments/enrolled") {
        const user = getCurrentUser();
        if (!user) {
          throw new Error("Not authenticated");
        }
        
        const studentEnrollments = mockData.enrollments.filter(e => e.student._id === user.id);
        const enrolledCourseIds = studentEnrollments.map(e => e.course._id);
        const enrolledAssignments = mockData.assignments.filter(a => enrolledCourseIds.includes(a.course._id));
        
        return {
          success: true,
          data: enrolledAssignments,
        } as T;
      }
      
      if (method === "PUT") {
        const assignmentId = path.split("/").pop();
        const assignmentIndex = mockData.assignments.findIndex(a => a._id === assignmentId);
        if (assignmentIndex === -1) {
          throw new Error("Assignment not found");
        }
        
        mockData.assignments[assignmentIndex] = {
          ...mockData.assignments[assignmentIndex],
          ...body,
          updatedAt: new Date().toISOString(),
        };
        
        return {
          success: true,
          data: mockData.assignments[assignmentIndex],
        } as T;
      }
      
      if (method === "DELETE") {
        const assignmentId = path.split("/").pop();
        const assignmentIndex = mockData.assignments.findIndex(a => a._id === assignmentId);
        if (assignmentIndex === -1) {
          throw new Error("Assignment not found");
        }
        
        mockData.assignments.splice(assignmentIndex, 1);
        return {
          success: true,
          message: "Assignment deleted successfully",
        } as T;
      }
    }
    
    // Materials routes
    if (path.startsWith("/api/materials")) {
      if (path === "/api/materials") {
        if (method === "GET") {
          return {
            success: true,
            data: mockData.materials,
          } as T;
        }
        if (method === "POST") {
          const newMaterial = {
            _id: `material${mockData.materials.length + 1}`,
            ...body,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          mockData.materials.push(newMaterial);
          return {
            success: true,
            data: newMaterial,
          } as T;
        }
      }
      
      if (path === "/api/materials/enrolled") {
        const user = getCurrentUser();
        if (!user) {
          throw new Error("Not authenticated");
        }
        
        const studentEnrollments = mockData.enrollments.filter(e => e.student._id === user.id);
        const enrolledCourseIds = studentEnrollments.map(e => e.course._id);
        const enrolledMaterials = mockData.materials.filter(m => enrolledCourseIds.includes(m.course._id));
        
        return {
          success: true,
          data: enrolledMaterials,
        } as T;
      }
      
      if (method === "PUT") {
        const materialId = path.split("/").pop();
        const materialIndex = mockData.materials.findIndex(m => m._id === materialId);
        if (materialIndex === -1) {
          throw new Error("Material not found");
        }
        
        mockData.materials[materialIndex] = {
          ...mockData.materials[materialIndex],
          ...body,
          updatedAt: new Date().toISOString(),
        };
        
        return {
          success: true,
          data: mockData.materials[materialIndex],
        } as T;
      }
      
      if (method === "DELETE") {
        const materialId = path.split("/").pop();
        const materialIndex = mockData.materials.findIndex(m => m._id === materialId);
        if (materialIndex === -1) {
          throw new Error("Material not found");
        }
        
        mockData.materials.splice(materialIndex, 1);
        return {
          success: true,
          message: "Material deleted successfully",
        } as T;
      }
    }
    
    // Results routes
    if (path.startsWith("/api/results")) {
      if (path === "/api/results") {
        if (method === "GET") {
          return {
            success: true,
            data: mockData.results,
          } as T;
        }
        if (method === "POST") {
          const newResult = {
            _id: `result${mockData.results.length + 1}`,
            ...body,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          mockData.results.push(newResult);
          return {
            success: true,
            data: newResult,
          } as T;
        }
      }
      
      if (method === "PUT") {
        const resultId = path.split("/").pop();
        const resultIndex = mockData.results.findIndex(r => r._id === resultId);
        if (resultIndex === -1) {
          throw new Error("Result not found");
        }
        
        mockData.results[resultIndex] = {
          ...mockData.results[resultIndex],
          ...body,
          updatedAt: new Date().toISOString(),
        };
        
        return {
          success: true,
          data: mockData.results[resultIndex],
        } as T;
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