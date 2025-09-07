// Mock API implementation - replaces backend calls with mock data
import {
  mockAuth,
  mockCoursesAPI,
  mockUsersAPI,
  mockEnrollmentsAPI,
  mockAssignmentsAPI,
  mockMaterialsAPI,
  mockResultsAPI,
  mockDashboardAPI,
} from './mockAPI';

export const API_BASE_URL = "mock://api"; // Mock URL for reference

export function getAuthToken(): string | null {
  return localStorage.getItem("token");
}

// Mock API router that routes requests to appropriate mock functions
export async function apiFetch<T = any>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const method = options.method || "GET";
  const body = options.body ? JSON.parse(options.body as string) : {};
  
  try {
    // Authentication routes
    if (path === "/api/auth/login") {
      return await mockAuth.login(body.email, body.password, body.role) as T;
    }
    
    if (path === "/api/auth/me") {
      return await mockAuth.me() as T;
    }
    
    if (path === "/api/auth/set-password") {
      return await mockAuth.setPassword(body.email, body.password) as T;
    }
    
    if (path === "/api/auth/register") {
      return await mockAuth.register(body) as T;
    }
    
    // Dashboard routes
    if (path === "/api/dashboard/stats") {
      return await mockDashboardAPI.getStats() as T;
    }
    
    if (path === "/api/dashboard/recent-enrollments") {
      return await mockDashboardAPI.getRecentEnrollments() as T;
    }
    
    if (path === "/api/dashboard/course-performance") {
      return await mockDashboardAPI.getCoursePerformance() as T;
    }
    
    if (path === "/api/dashboard/metrics") {
      return await mockDashboardAPI.getMetrics() as T;
    }
    
    if (path === "/api/dashboard/counts") {
      return await mockDashboardAPI.getCounts() as T;
    }
    
    // Courses routes
    if (path.startsWith("/api/courses")) {
      if (path === "/api/courses" || path.includes("?")) {
        const url = new URL(path, "http://localhost");
        const limit = url.searchParams.get("limit");
        const page = url.searchParams.get("page");
        return await mockCoursesAPI.getAll({ 
          limit: limit ? parseInt(limit) : undefined,
          page: page ? parseInt(page) : undefined,
        }) as T;
      }
      
      if (path === "/api/courses/available") {
        return await mockCoursesAPI.getAvailable() as T;
      }
      
      if (path === "/api/courses/instructor") {
        return await mockCoursesAPI.getByInstructor() as T;
      }
      
      if (method === "POST") {
        return await mockCoursesAPI.create(body) as T;
      }
      
      if (method === "PUT") {
        const courseId = path.split("/").pop();
        return await mockCoursesAPI.update(courseId!, body) as T;
      }
      
      if (method === "DELETE") {
        const courseId = path.split("/").pop();
        return await mockCoursesAPI.delete(courseId!) as T;
      }
    }
    
    // Users routes
    if (path.startsWith("/api/users")) {
      if (path === "/api/users" || path.includes("?")) {
        const url = new URL(path, "http://localhost");
        const role = url.searchParams.get("role");
        const limit = url.searchParams.get("limit");
        const page = url.searchParams.get("page");
        return await mockUsersAPI.getAll({ 
          role: role || undefined,
          limit: limit ? parseInt(limit) : undefined,
          page: page ? parseInt(page) : undefined,
        }) as T;
      }
      
      if (path === "/api/users/students") {
        return await mockUsersAPI.getStudents() as T;
      }
      
      if (method === "POST") {
        return await mockUsersAPI.create(body) as T;
      }
      
      if (method === "PUT") {
        const userId = path.split("/").pop();
        return await mockUsersAPI.update(userId!, body) as T;
      }
      
      if (method === "DELETE") {
        const userId = path.split("/").pop();
        return await mockUsersAPI.delete(userId!) as T;
      }
    }
    
    // Enrollments routes
    if (path.startsWith("/api/enrollments")) {
      if (path === "/api/enrollments") {
        if (method === "GET") {
          return await mockEnrollmentsAPI.getAll() as T;
        }
        if (method === "POST") {
          return await mockEnrollmentsAPI.create(body) as T;
        }
      }
      
      if (path === "/api/enrollments/student/me") {
        return await mockEnrollmentsAPI.getByStudent() as T;
      }
      
      if (method === "PUT") {
        const enrollmentId = path.split("/").pop();
        return await mockEnrollmentsAPI.update(enrollmentId!, body) as T;
      }
    }
    
    // Assignments routes
    if (path.startsWith("/api/assignments")) {
      if (path === "/api/assignments") {
        if (method === "GET") {
          return await mockAssignmentsAPI.getAll() as T;
        }
        if (method === "POST") {
          return await mockAssignmentsAPI.create(body) as T;
        }
      }
      
      if (path === "/api/assignments/enrolled") {
        return await mockAssignmentsAPI.getEnrolled() as T;
      }
      
      if (method === "PUT") {
        const assignmentId = path.split("/").pop();
        return await mockAssignmentsAPI.update(assignmentId!, body) as T;
      }
      
      if (method === "DELETE") {
        const assignmentId = path.split("/").pop();
        return await mockAssignmentsAPI.delete(assignmentId!) as T;
      }
    }
    
    // Materials routes
    if (path.startsWith("/api/materials")) {
      if (path === "/api/materials") {
        if (method === "GET") {
          return await mockMaterialsAPI.getAll() as T;
        }
        if (method === "POST") {
          return await mockMaterialsAPI.create(body) as T;
        }
      }
      
      if (path === "/api/materials/enrolled") {
        return await mockMaterialsAPI.getEnrolled() as T;
      }
      
      if (method === "PUT") {
        const materialId = path.split("/").pop();
        return await mockMaterialsAPI.update(materialId!, body) as T;
      }
      
      if (method === "DELETE") {
        const materialId = path.split("/").pop();
        return await mockMaterialsAPI.delete(materialId!) as T;
      }
    }
    
    // Results routes
    if (path.startsWith("/api/results")) {
      if (path === "/api/results") {
        if (method === "GET") {
          return await mockResultsAPI.getAll() as T;
        }
        if (method === "POST") {
          return await mockResultsAPI.create(body) as T;
        }
      }
      
      if (method === "PUT") {
        const resultId = path.split("/").pop();
        return await mockResultsAPI.update(resultId!, body) as T;
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
