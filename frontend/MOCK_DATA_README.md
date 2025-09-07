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

### Vercel Deployment

1. **Connect your repository to Vercel**
2. **Set build command**: `npm run build`
3. **Set output directory**: `dist`
4. **Deploy**: The application will work immediately without any backend

### Environment Variables (Optional)

If you want to add environment variables in Vercel:
- `VITE_API_URL`: `https://api.example.com` (not used, but prevents build errors)
- `VITE_USE_MOCK_API`: `true`

### Important Notes

- ✅ **No backend required**: All API calls are handled internally
- ✅ **Works in production**: Tested and verified for Vercel deployment
- ✅ **Persistent data**: Mock data persists during the user session
- ✅ **Realistic behavior**: Simulates network delays and API responses

## Notes

- All data is stored in memory and resets on page refresh
- The mock API simulates network delays for realistic behavior
- All CRUD operations work as expected
- The application maintains the same interface as the original backend API
