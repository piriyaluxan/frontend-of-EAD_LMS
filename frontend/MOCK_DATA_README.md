# LMS Frontend with Mock Data

This frontend application now works completely without a backend using comprehensive mock data.

## Demo Credentials

Use these credentials to test the application:

### Admin
- **Email**: `admin@university.edu`
- **Password**: `password123`
- **Role**: Administrator

### Instructor  
- **Email**: `instructor@university.edu`
- **Password**: `password123`
- **Role**: Instructor

### Student
- **Email**: `student@university.edu`
- **Password**: `password123`
- **Role**: Student

## Features Available

- ✅ User authentication and registration
- ✅ Course management and enrollment
- ✅ Assignment tracking and submission
- ✅ Course materials access
- ✅ Grade viewing and results
- ✅ Dashboard analytics
- ✅ Admin panel functionality
- ✅ Instructor dashboard
- ✅ Student portal

## Mock Data Includes

- 5 different courses across various subjects
- Student enrollments with progress tracking
- Assignments with due dates and points
- Course materials with different file types
- Student grades and performance data
- Comprehensive dashboard statistics

## Development

```bash
npm install
npm run dev
```

## Production Deployment

The application is configured to work in production environments like Vercel without requiring any backend infrastructure.

## Notes

- All data is stored in memory and resets on page refresh
- The mock API simulates network delays for realistic behavior
- All CRUD operations work as expected
- The application maintains the same interface as the original backend API
