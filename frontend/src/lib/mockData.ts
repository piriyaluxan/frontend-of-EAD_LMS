// Mock data for the LMS application
export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: "admin" | "instructor" | "student";
  isActive: boolean;
  studentId?: string;
  instructorId?: string;
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
  credits: number;
  level: "beginner" | "intermediate" | "advanced";
  category: string;
  status: "active" | "inactive" | "archived";
  startDate?: string;
  endDate?: string;
  createdAt: string;
  updatedAt: string;
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
  status: "active" | "completed" | "dropped" | "suspended";
  progress: number;
  enrollmentDate: string;
  grade?: string;
  score?: number;
  createdAt: string;
  updatedAt: string;
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
  maxPoints: number;
  createdBy: {
    firstName: string;
    lastName: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Material {
  _id: string;
  title: string;
  description: string;
  fileType: "pdf" | "video" | "image" | "document" | "docx" | "other";
  course: {
    _id: string;
    title: string;
    code: string;
  };
  fileName: string;
  originalName: string;
  size: number;
  uploadedBy: {
    firstName: string;
    lastName: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Result {
  _id: string;
  student: {
    _id: string;
    firstName: string;
    lastName: string;
    studentId?: string;
  };
  course: {
    _id: string;
    title: string;
    code: string;
  };
  finalGrade?: string;
  finalPercentage?: number;
  status: "passed" | "failed" | "pending" | "incomplete";
  caScore?: number;
  finalExamScore?: number;
  createdAt: string;
  updatedAt: string;
}

// Mock Users Data
export const mockUsers: User[] = [
  {
    _id: "admin1",
    firstName: "Admin",
    lastName: "User",
    email: "admin@university.edu",
    phone: "+1234567890",
    role: "admin",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    _id: "instructor1",
    firstName: "Dr. Sarah",
    lastName: "Johnson",
    email: "instructor@university.edu",
    phone: "+1234567891",
    role: "instructor",
    isActive: true,
    instructorId: "INST001",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    _id: "instructor2",
    firstName: "Prof. Michael",
    lastName: "Brown",
    email: "michael.brown@university.edu",
    phone: "+1234567892",
    role: "instructor",
    isActive: true,
    instructorId: "INST002",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    _id: "student1",
    firstName: "John",
    lastName: "Doe",
    email: "student@university.edu",
    phone: "+1234567893",
    role: "student",
    isActive: true,
    studentId: "STU001",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    _id: "student2",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@university.edu",
    phone: "+1234567894",
    role: "student",
    isActive: true,
    studentId: "STU002",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    _id: "student3",
    firstName: "Alex",
    lastName: "Wilson",
    email: "alex.wilson@university.edu",
    phone: "+1234567895",
    role: "student",
    isActive: true,
    studentId: "STU003",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    _id: "student4",
    firstName: "Emily",
    lastName: "Davis",
    email: "emily.davis@university.edu",
    phone: "+1234567896",
    role: "student",
    isActive: true,
    studentId: "STU004",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    _id: "student5",
    firstName: "David",
    lastName: "Miller",
    email: "david.miller@university.edu",
    phone: "+1234567897",
    role: "student",
    isActive: true,
    studentId: "STU005",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
];

// Mock Courses Data
export const mockCourses: Course[] = [
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
    startDate: "2024-01-15T00:00:00Z",
    endDate: "2024-05-15T00:00:00Z",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    _id: "course2",
    title: "Data Structures and Algorithms",
    code: "CS201",
    description: "Advanced study of data structures and algorithmic problem-solving techniques.",
    instructor: {
      _id: "instructor2",
      firstName: "Prof. Michael",
      lastName: "Brown",
      email: "michael.brown@university.edu",
    },
    capacity: 40,
    enrolled: 28,
    duration: "16 weeks",
    credits: 4,
    level: "intermediate",
    category: "Computer Science",
    status: "active",
    startDate: "2024-01-15T00:00:00Z",
    endDate: "2024-05-15T00:00:00Z",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
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
    startDate: "2024-01-15T00:00:00Z",
    endDate: "2024-04-15T00:00:00Z",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    _id: "course4",
    title: "Database Management Systems",
    code: "DB201",
    description: "Comprehensive study of database design, implementation, and management.",
    instructor: {
      _id: "instructor2",
      firstName: "Prof. Michael",
      lastName: "Brown",
      email: "michael.brown@university.edu",
    },
    capacity: 35,
    enrolled: 30,
    duration: "16 weeks",
    credits: 4,
    level: "intermediate",
    category: "Database",
    status: "active",
    startDate: "2024-01-15T00:00:00Z",
    endDate: "2024-05-15T00:00:00Z",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    _id: "course5",
    title: "Machine Learning Basics",
    code: "ML301",
    description: "Introduction to machine learning algorithms and applications.",
    instructor: {
      _id: "instructor1",
      firstName: "Dr. Sarah",
      lastName: "Johnson",
      email: "instructor@university.edu",
    },
    capacity: 30,
    enrolled: 25,
    duration: "16 weeks",
    credits: 4,
    level: "advanced",
    category: "Machine Learning",
    status: "active",
    startDate: "2024-01-15T00:00:00Z",
    endDate: "2024-05-15T00:00:00Z",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
];

// Mock Enrollments Data
export const mockEnrollments: Enrollment[] = [
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
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-03-01T00:00:00Z",
  },
  {
    _id: "enrollment2",
    student: {
      _id: "student1",
      firstName: "John",
      lastName: "Doe",
      email: "student@university.edu",
      studentId: "STU001",
    },
    course: {
      _id: "course2",
      title: "Data Structures and Algorithms",
      code: "CS201",
    },
    status: "active",
    progress: 60,
    enrollmentDate: "2024-01-15T00:00:00Z",
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-03-01T00:00:00Z",
  },
  {
    _id: "enrollment3",
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
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-03-01T00:00:00Z",
  },
  {
    _id: "enrollment4",
    student: {
      _id: "student2",
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@university.edu",
      studentId: "STU002",
    },
    course: {
      _id: "course3",
      title: "Web Development Fundamentals",
      code: "WEB101",
    },
    status: "completed",
    progress: 100,
    enrollmentDate: "2024-01-15T00:00:00Z",
    grade: "A+",
    score: 96,
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-04-15T00:00:00Z",
  },
  {
    _id: "enrollment5",
    student: {
      _id: "student3",
      firstName: "Alex",
      lastName: "Wilson",
      email: "alex.wilson@university.edu",
      studentId: "STU003",
    },
    course: {
      _id: "course2",
      title: "Data Structures and Algorithms",
      code: "CS201",
    },
    status: "active",
    progress: 45,
    enrollmentDate: "2024-01-15T00:00:00Z",
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-03-01T00:00:00Z",
  },
];

// Mock Assignments Data
export const mockAssignments: Assignment[] = [
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
    updatedAt: "2024-02-01T00:00:00Z",
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
      firstName: "Prof. Michael",
      lastName: "Brown",
    },
    createdAt: "2024-02-05T00:00:00Z",
    updatedAt: "2024-02-05T00:00:00Z",
  },
  {
    _id: "assignment3",
    title: "HTML/CSS Portfolio",
    description: "Create a personal portfolio website using HTML and CSS",
    course: {
      _id: "course3",
      title: "Web Development Fundamentals",
      code: "WEB101",
    },
    dueDate: "2024-03-10T23:59:59Z",
    maxPoints: 200,
    createdBy: {
      firstName: "Dr. Sarah",
      lastName: "Johnson",
    },
    createdAt: "2024-02-01T00:00:00Z",
    updatedAt: "2024-02-01T00:00:00Z",
  },
  {
    _id: "assignment4",
    title: "Database Design Project",
    description: "Design and implement a normalized database schema",
    course: {
      _id: "course4",
      title: "Database Management Systems",
      code: "DB201",
    },
    dueDate: "2024-03-25T23:59:59Z",
    maxPoints: 250,
    createdBy: {
      firstName: "Prof. Michael",
      lastName: "Brown",
    },
    createdAt: "2024-02-10T00:00:00Z",
    updatedAt: "2024-02-10T00:00:00Z",
  },
  {
    _id: "assignment5",
    title: "Linear Regression Implementation",
    description: "Implement linear regression from scratch",
    course: {
      _id: "course5",
      title: "Machine Learning Basics",
      code: "ML301",
    },
    dueDate: "2024-03-30T23:59:59Z",
    maxPoints: 300,
    createdBy: {
      firstName: "Dr. Sarah",
      lastName: "Johnson",
    },
    createdAt: "2024-02-15T00:00:00Z",
    updatedAt: "2024-02-15T00:00:00Z",
  },
];

// Mock Materials Data
export const mockMaterials: Material[] = [
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
    size: 2048576, // 2MB
    uploadedBy: {
      firstName: "Dr. Sarah",
      lastName: "Johnson",
    },
    createdAt: "2024-01-20T00:00:00Z",
    updatedAt: "2024-01-20T00:00:00Z",
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
    size: 52428800, // 50MB
    uploadedBy: {
      firstName: "Prof. Michael",
      lastName: "Brown",
    },
    createdAt: "2024-01-25T00:00:00Z",
    updatedAt: "2024-01-25T00:00:00Z",
  },
  {
    _id: "material3",
    title: "HTML Best Practices",
    description: "Guidelines for writing clean HTML code",
    fileType: "docx",
    course: {
      _id: "course3",
      title: "Web Development Fundamentals",
      code: "WEB101",
    },
    fileName: "html_best_practices.docx",
    originalName: "HTML Best Practices.docx",
    size: 1048576, // 1MB
    uploadedBy: {
      firstName: "Dr. Sarah",
      lastName: "Johnson",
    },
    createdAt: "2024-01-30T00:00:00Z",
    updatedAt: "2024-01-30T00:00:00Z",
  },
  {
    _id: "material4",
    title: "Database Design Patterns",
    description: "Common patterns in database design",
    fileType: "pdf",
    course: {
      _id: "course4",
      title: "Database Management Systems",
      code: "DB201",
    },
    fileName: "db_design_patterns.pdf",
    originalName: "Database Design Patterns.pdf",
    size: 3145728, // 3MB
    uploadedBy: {
      firstName: "Prof. Michael",
      lastName: "Brown",
    },
    createdAt: "2024-02-01T00:00:00Z",
    updatedAt: "2024-02-01T00:00:00Z",
  },
];

// Mock Results Data
export const mockResults: Result[] = [
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
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-05-15T00:00:00Z",
  },
  {
    _id: "result2",
    student: {
      _id: "student2",
      firstName: "Jane",
      lastName: "Smith",
      studentId: "STU002",
    },
    course: {
      _id: "course3",
      title: "Web Development Fundamentals",
      code: "WEB101",
    },
    finalGrade: "A+",
    finalPercentage: 96,
    status: "passed",
    caScore: 94,
    finalExamScore: 98,
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-04-15T00:00:00Z",
  },
  {
    _id: "result3",
    student: {
      _id: "student1",
      firstName: "John",
      lastName: "Doe",
      studentId: "STU001",
    },
    course: {
      _id: "course2",
      title: "Data Structures and Algorithms",
      code: "CS201",
    },
    status: "pending",
    caScore: 85,
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-03-01T00:00:00Z",
  },
];

// Dashboard Statistics
export const mockDashboardStats = {
  totalCourses: mockCourses.length,
  totalStudents: mockUsers.filter(u => u.role === "student").length,
  totalEnrollments: mockEnrollments.length,
  completedCourses: mockEnrollments.filter(e => e.status === "completed").length,
};

export const mockRecentEnrollments = mockEnrollments.slice(0, 5).map(enrollment => ({
  _id: enrollment._id,
  student: enrollment.student,
  course: enrollment.course,
  status: enrollment.status,
  createdAt: enrollment.createdAt,
}));

export const mockCoursePerformance = mockCourses.map(course => {
  const courseEnrollments = mockEnrollments.filter(e => e.course._id === course._id);
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
});

export const mockDashboardMetrics = {
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
    completionRate: mockEnrollments.length > 0 
      ? Math.round((mockEnrollments.filter(e => e.status === "completed").length / mockEnrollments.length) * 100)
      : 0,
  },
  performance: {
    averageScore: mockResults.length > 0 
      ? Math.round(mockResults.reduce((sum, r) => sum + (r.finalPercentage || 0), 0) / mockResults.length)
      : 0,
    topCourse: mockCoursePerformance.reduce((top, current) => 
      current.averageScore > top.averageScore ? current : top, mockCoursePerformance[0] || {}),
  },
  recentActivity: mockRecentEnrollments.map(enrollment => ({
    id: enrollment._id,
    studentName: `${enrollment.student.firstName} ${enrollment.student.lastName}`,
    courseName: enrollment.course.title,
    status: enrollment.status,
    date: enrollment.createdAt,
  })),
};

export const mockDashboardCounts = {
  totalMaterials: mockMaterials.length,
  totalAssignments: mockAssignments.length,
};
