// Mock API functions to replace backend calls
import {
  mockUsers,
  mockCourses,
  mockEnrollments,
  mockAssignments,
  mockMaterials,
  mockResults,
  mockDashboardStats,
  mockRecentEnrollments,
  mockCoursePerformance,
  mockDashboardMetrics,
  mockDashboardCounts,
  User,
  Course,
  Enrollment,
  Assignment,
  Material,
  Result,
} from './mockData';

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock authentication
export const mockAuth = {
  login: async (email: string, password: string, role: string) => {
    await delay(500); // Simulate network delay
    
    const user = mockUsers.find(u => u.email === email && u.role === role);
    
    if (!user) {
      throw new Error("Invalid credentials");
    }
    
    // Mock password validation (in real app, this would be hashed)
    if (password !== "password123") {
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
        instructorId: user.instructorId,
      },
    };
  },
  
  me: async () => {
    await delay(200);
    
    // Get user from localStorage (simulating token validation)
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
        instructorId: fullUser.instructorId,
      },
    };
  },
  
  setPassword: async (email: string, password: string) => {
    await delay(500);
    
    const user = mockUsers.find(u => u.email === email);
    if (!user) {
      throw new Error("User not found");
    }
    
    return {
      success: true,
      message: "Password set successfully",
    };
  },
  
  register: async (userData: any) => {
    await delay(500);
    
    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email === userData.email);
    if (existingUser) {
      throw new Error("User already exists");
    }
    
    const newUser: User = {
      _id: `student${mockUsers.length + 1}`,
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      phone: userData.phone,
      role: "student",
      isActive: true,
      studentId: `STU${String(mockUsers.filter(u => u.role === "student").length + 1).padStart(3, '0')}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    // Add to mock data (in real app, this would be saved to database)
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
    };
  },
};

// Mock courses API
export const mockCoursesAPI = {
  getAll: async (params?: { limit?: number; page?: number }) => {
    await delay(300);
    
    const limit = params?.limit || 50;
    const page = params?.page || 1;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    
    return {
      success: true,
      data: mockCourses.slice(startIndex, endIndex),
      pagination: {
        page,
        limit,
        total: mockCourses.length,
        pages: Math.ceil(mockCourses.length / limit),
      },
    };
  },
  
  getAvailable: async () => {
    await delay(300);
    
    return {
      success: true,
      data: mockCourses.filter(c => c.status === "active"),
    };
  },
  
  getByInstructor: async () => {
    await delay(300);
    
    // Get current user from localStorage
    const userData = localStorage.getItem("user");
    if (!userData) {
      throw new Error("Not authenticated");
    }
    
    const user = JSON.parse(userData);
    const instructorCourses = mockCourses.filter(c => c.instructor._id === user.id);
    
    return {
      success: true,
      data: instructorCourses,
    };
  },
  
  create: async (courseData: any) => {
    await delay(500);
    
    const newCourse: Course = {
      _id: `course${mockCourses.length + 1}`,
      title: courseData.title,
      code: courseData.code,
      description: courseData.description,
      instructor: {
        _id: "instructor1", // Mock instructor
        firstName: "Dr. Sarah",
        lastName: "Johnson",
        email: "instructor@university.edu",
      },
      capacity: parseInt(courseData.capacity),
      enrolled: 0,
      duration: courseData.duration,
      credits: parseInt(courseData.credits) || 3,
      level: courseData.level || "beginner",
      category: courseData.category || "General",
      status: "active",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    mockCourses.push(newCourse);
    
    return {
      success: true,
      data: newCourse,
    };
  },
  
  update: async (id: string, courseData: any) => {
    await delay(500);
    
    const courseIndex = mockCourses.findIndex(c => c._id === id);
    if (courseIndex === -1) {
      throw new Error("Course not found");
    }
    
    mockCourses[courseIndex] = {
      ...mockCourses[courseIndex],
      ...courseData,
      updatedAt: new Date().toISOString(),
    };
    
    return {
      success: true,
      data: mockCourses[courseIndex],
    };
  },
  
  delete: async (id: string) => {
    await delay(500);
    
    const courseIndex = mockCourses.findIndex(c => c._id === id);
    if (courseIndex === -1) {
      throw new Error("Course not found");
    }
    
    mockCourses.splice(courseIndex, 1);
    
    return {
      success: true,
      message: "Course deleted successfully",
    };
  },
};

// Mock users API
export const mockUsersAPI = {
  getAll: async (params?: { role?: string; limit?: number; page?: number }) => {
    await delay(300);
    
    let filteredUsers = mockUsers;
    
    if (params?.role) {
      filteredUsers = mockUsers.filter(u => u.role === params.role);
    }
    
    const limit = params?.limit || 50;
    const page = params?.page || 1;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    
    return {
      success: true,
      data: filteredUsers.slice(startIndex, endIndex),
      pagination: {
        page,
        limit,
        total: filteredUsers.length,
        pages: Math.ceil(filteredUsers.length / limit),
      },
    };
  },
  
  getStudents: async () => {
    await delay(300);
    
    return {
      success: true,
      data: mockUsers.filter(u => u.role === "student"),
    };
  },
  
  create: async (userData: any) => {
    await delay(500);
    
    const newUser: User = {
      _id: `user${mockUsers.length + 1}`,
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      phone: userData.phone,
      role: userData.role || "student",
      isActive: true,
      studentId: userData.role === "student" ? `STU${String(mockUsers.filter(u => u.role === "student").length + 1).padStart(3, '0')}` : undefined,
      instructorId: userData.role === "instructor" ? `INST${String(mockUsers.filter(u => u.role === "instructor").length + 1).padStart(3, '0')}` : undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    mockUsers.push(newUser);
    
    return {
      success: true,
      data: newUser,
    };
  },
  
  update: async (id: string, userData: any) => {
    await delay(500);
    
    const userIndex = mockUsers.findIndex(u => u._id === id);
    if (userIndex === -1) {
      throw new Error("User not found");
    }
    
    mockUsers[userIndex] = {
      ...mockUsers[userIndex],
      ...userData,
      updatedAt: new Date().toISOString(),
    };
    
    return {
      success: true,
      data: mockUsers[userIndex],
    };
  },
  
  delete: async (id: string) => {
    await delay(500);
    
    const userIndex = mockUsers.findIndex(u => u._id === id);
    if (userIndex === -1) {
      throw new Error("User not found");
    }
    
    mockUsers.splice(userIndex, 1);
    
    return {
      success: true,
      message: "User deleted successfully",
    };
  },
};

// Mock enrollments API
export const mockEnrollmentsAPI = {
  getAll: async () => {
    await delay(300);
    
    return {
      success: true,
      data: mockEnrollments,
    };
  },
  
  getByStudent: async () => {
    await delay(300);
    
    // Get current user from localStorage
    const userData = localStorage.getItem("user");
    if (!userData) {
      throw new Error("Not authenticated");
    }
    
    const user = JSON.parse(userData);
    const studentEnrollments = mockEnrollments.filter(e => e.student._id === user.id);
    
    return {
      success: true,
      data: studentEnrollments,
    };
  },
  
  create: async (enrollmentData: any) => {
    await delay(500);
    
    // Get current user from localStorage
    const userData = localStorage.getItem("user");
    if (!userData) {
      throw new Error("Not authenticated");
    }
    
    const user = JSON.parse(userData);
    const course = mockCourses.find(c => c._id === enrollmentData.courseId);
    
    if (!course) {
      throw new Error("Course not found");
    }
    
    // Check if already enrolled
    const existingEnrollment = mockEnrollments.find(
      e => e.student._id === user.id && e.course._id === enrollmentData.courseId
    );
    
    if (existingEnrollment) {
      throw new Error("Already enrolled in this course");
    }
    
    // Check capacity
    if (course.enrolled >= course.capacity) {
      throw new Error("Course is full");
    }
    
    const newEnrollment: Enrollment = {
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
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    mockEnrollments.push(newEnrollment);
    
    // Update course enrollment count
    course.enrolled += 1;
    
    return {
      success: true,
      data: newEnrollment,
    };
  },
  
  update: async (id: string, enrollmentData: any) => {
    await delay(500);
    
    const enrollmentIndex = mockEnrollments.findIndex(e => e._id === id);
    if (enrollmentIndex === -1) {
      throw new Error("Enrollment not found");
    }
    
    mockEnrollments[enrollmentIndex] = {
      ...mockEnrollments[enrollmentIndex],
      ...enrollmentData,
      updatedAt: new Date().toISOString(),
    };
    
    return {
      success: true,
      data: mockEnrollments[enrollmentIndex],
    };
  },
};

// Mock assignments API
export const mockAssignmentsAPI = {
  getAll: async () => {
    await delay(300);
    
    return {
      success: true,
      data: mockAssignments,
    };
  },
  
  getEnrolled: async () => {
    await delay(300);
    
    // Get current user from localStorage
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
    };
  },
  
  create: async (assignmentData: any) => {
    await delay(500);
    
    const course = mockCourses.find(c => c._id === assignmentData.courseId);
    if (!course) {
      throw new Error("Course not found");
    }
    
    const newAssignment: Assignment = {
      _id: `assignment${mockAssignments.length + 1}`,
      title: assignmentData.title,
      description: assignmentData.description,
      course: {
        _id: course._id,
        title: course.title,
        code: course.code,
      },
      dueDate: assignmentData.dueDate,
      maxPoints: parseInt(assignmentData.maxPoints),
      createdBy: {
        firstName: "Dr. Sarah", // Mock instructor
        lastName: "Johnson",
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    mockAssignments.push(newAssignment);
    
    return {
      success: true,
      data: newAssignment,
    };
  },
  
  update: async (id: string, assignmentData: any) => {
    await delay(500);
    
    const assignmentIndex = mockAssignments.findIndex(a => a._id === id);
    if (assignmentIndex === -1) {
      throw new Error("Assignment not found");
    }
    
    mockAssignments[assignmentIndex] = {
      ...mockAssignments[assignmentIndex],
      ...assignmentData,
      updatedAt: new Date().toISOString(),
    };
    
    return {
      success: true,
      data: mockAssignments[assignmentIndex],
    };
  },
  
  delete: async (id: string) => {
    await delay(500);
    
    const assignmentIndex = mockAssignments.findIndex(a => a._id === id);
    if (assignmentIndex === -1) {
      throw new Error("Assignment not found");
    }
    
    mockAssignments.splice(assignmentIndex, 1);
    
    return {
      success: true,
      message: "Assignment deleted successfully",
    };
  },
};

// Mock materials API
export const mockMaterialsAPI = {
  getAll: async () => {
    await delay(300);
    
    return {
      success: true,
      data: mockMaterials,
    };
  },
  
  getEnrolled: async () => {
    await delay(300);
    
    // Get current user from localStorage
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
    };
  },
  
  create: async (materialData: any) => {
    await delay(500);
    
    const course = mockCourses.find(c => c._id === materialData.courseId);
    if (!course) {
      throw new Error("Course not found");
    }
    
    const newMaterial: Material = {
      _id: `material${mockMaterials.length + 1}`,
      title: materialData.title,
      description: materialData.description,
      fileType: materialData.fileType || "other",
      course: {
        _id: course._id,
        title: course.title,
        code: course.code,
      },
      fileName: materialData.fileName || "uploaded_file",
      originalName: materialData.originalName || "Uploaded File",
      size: materialData.size || 0,
      uploadedBy: {
        firstName: "Dr. Sarah", // Mock instructor
        lastName: "Johnson",
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    mockMaterials.push(newMaterial);
    
    return {
      success: true,
      data: newMaterial,
    };
  },
  
  update: async (id: string, materialData: any) => {
    await delay(500);
    
    const materialIndex = mockMaterials.findIndex(m => m._id === id);
    if (materialIndex === -1) {
      throw new Error("Material not found");
    }
    
    mockMaterials[materialIndex] = {
      ...mockMaterials[materialIndex],
      ...materialData,
      updatedAt: new Date().toISOString(),
    };
    
    return {
      success: true,
      data: mockMaterials[materialIndex],
    };
  },
  
  delete: async (id: string) => {
    await delay(500);
    
    const materialIndex = mockMaterials.findIndex(m => m._id === id);
    if (materialIndex === -1) {
      throw new Error("Material not found");
    }
    
    mockMaterials.splice(materialIndex, 1);
    
    return {
      success: true,
      message: "Material deleted successfully",
    };
  },
};

// Mock results API
export const mockResultsAPI = {
  getAll: async () => {
    await delay(300);
    
    return {
      success: true,
      data: mockResults,
    };
  },
  
  getByStudent: async () => {
    await delay(300);
    
    // Get current user from localStorage
    const userData = localStorage.getItem("user");
    if (!userData) {
      throw new Error("Not authenticated");
    }
    
    const user = JSON.parse(userData);
    const studentResults = mockResults.filter(r => r.student._id === user.id);
    
    return {
      success: true,
      data: studentResults,
    };
  },
  
  create: async (resultData: any) => {
    await delay(500);
    
    const newResult: Result = {
      _id: `result${mockResults.length + 1}`,
      student: {
        _id: resultData.studentId,
        firstName: "Student",
        lastName: "Name",
        studentId: "STU001",
      },
      course: {
        _id: resultData.courseId,
        title: "Course Title",
        code: "COURSE001",
      },
      finalGrade: resultData.finalGrade,
      finalPercentage: resultData.finalPercentage,
      status: resultData.status || "pending",
      caScore: resultData.caScore,
      finalExamScore: resultData.finalExamScore,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    mockResults.push(newResult);
    
    return {
      success: true,
      data: newResult,
    };
  },
  
  update: async (id: string, resultData: any) => {
    await delay(500);
    
    const resultIndex = mockResults.findIndex(r => r._id === id);
    if (resultIndex === -1) {
      throw new Error("Result not found");
    }
    
    mockResults[resultIndex] = {
      ...mockResults[resultIndex],
      ...resultData,
      updatedAt: new Date().toISOString(),
    };
    
    return {
      success: true,
      data: mockResults[resultIndex],
    };
  },
};

// Mock dashboard API
export const mockDashboardAPI = {
  getStats: async () => {
    await delay(300);
    
    return {
      success: true,
      data: mockDashboardStats,
    };
  },
  
  getRecentEnrollments: async () => {
    await delay(300);
    
    return {
      success: true,
      data: mockRecentEnrollments,
    };
  },
  
  getCoursePerformance: async () => {
    await delay(300);
    
    return {
      success: true,
      data: mockCoursePerformance,
    };
  },
  
  getMetrics: async () => {
    await delay(300);
    
    return {
      success: true,
      data: mockDashboardMetrics,
    };
  },
  
  getCounts: async () => {
    await delay(300);
    
    return {
      success: true,
      data: mockDashboardCounts,
    };
  },
};
