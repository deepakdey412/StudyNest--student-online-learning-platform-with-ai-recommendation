# 🚀 StudyNest - Quick Start Guide

## Prerequisites

Before running the application, ensure you have:

- **Java 17 or higher** - [Download](https://adoptium.net/)
- **Node.js 16 or higher** - [Download](https://nodejs.org/)
- **Maven** (included via Maven Wrapper)

## 🎯 Quick Start (Windows)

### Option 1: Start Everything (Recommended)
Double-click `START_APPLICATION.bat` to start both backend and frontend automatically.

### Option 2: Start Separately

**Backend:**
```bash
# Double-click START_BACKEND.bat
# OR run manually:
cd backend
mvnw spring-boot:run
```

**Frontend:**
```bash
# Double-click START_FRONTEND.bat
# OR run manually:
cd frontend
npm install
npm run dev
```

## 🌐 Access URLs

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8080/api
- **H2 Console**: http://localhost:8080/h2-console
- **Health Check**: http://localhost:8080/api/health

## 🔑 Default Login Credentials

### Super Admin
- Email: `admin@studynest.com`
- Password: `admin123`

### Test Student (Semester 6 with test results)
- Email: `test@studynest.com`
- Password: `test123`

## 📊 Database Configuration

The application uses H2 in-memory database:

```properties
URL: jdbc:h2:mem:studynest
Username: sa
Password: (leave blank)
```

## 🎓 System Features

### For Students:
1. Register with PRN, Roll No, Email, Semester
2. Browse modules for your semester
3. Take MCQ tests (10 questions per module)
4. View results and track progress
5. Generate certificates after completing semester

### For Tutors:
1. Register with email and specialization
2. View all modules across semesters
3. Monitor student performance
4. Manage module content

### For Super Admin:
1. Approve tutor registrations
2. Manage system-wide settings
3. View comprehensive analytics

## 📚 Available Modules

- **Semester 2**: 5 modules (Engineering Mathematics II, Physics, etc.)
- **Semester 3**: 5 modules (Data Structures, DBMS, etc.)
- **Semester 4**: 5 modules (Operating Systems, Networks, etc.)
- **Semester 5**: 5 modules (AI, Compiler Design, etc.)
- **Semester 6**: 5 modules (Machine Learning, Cloud Computing, etc.)

**Total**: 25 modules with 250 MCQ questions (10 per module)

## 🏆 Certificate Eligibility

Students can earn certificates when they:
- Score ≥ 40% average across all semester tests
- Pass ≥ 80% of semester tests

## 🛠️ Build Commands

### Backend
```bash
cd backend
./mvnw clean package -DskipTests  # Build JAR
./mvnw spring-boot:run             # Run application
./mvnw clean install               # Full build with tests
```

### Frontend
```bash
cd frontend
npm install          # Install dependencies
npm run dev          # Development server
npm run build        # Production build
npm run preview      # Preview production build
```

## 🐳 Docker Deployment

### Build Backend Image
```bash
cd backend
docker build -t studynest-backend .
docker run -p 8080:8080 studynest-backend
```

## 📝 API Documentation

### Authentication Endpoints
- `POST /api/auth/student/register` - Register new student
- `POST /api/auth/student/login` - Student login
- `POST /api/auth/tutor/register` - Register new tutor
- `POST /api/auth/tutor/login` - Tutor login

### Student Endpoints
- `GET /api/students/profile` - Get profile
- `PUT /api/students/profile` - Update profile

### Module Endpoints
- `GET /api/modules` - List all modules
- `GET /api/modules/semester/{semester}` - Get semester modules
- `GET /api/modules/{id}` - Get module details

### Test Endpoints
- `GET /api/questions/module/{moduleId}` - Get test questions
- `POST /api/tests/submit` - Submit test answers
- `GET /api/tests/results` - Get student results

### Certificate Endpoints
- `GET /api/certificate/eligibility` - Check eligibility
- `GET /api/certificate/generate` - Generate PDF certificate

## 🔧 Troubleshooting

### Backend won't start
- Check if Java 17+ is installed: `java -version`
- Ensure port 8080 is not in use
- Check logs for error messages

### Frontend won't start
- Check if Node.js is installed: `node -v`
- Delete `node_modules` and run `npm install` again
- Ensure port 5173 is not in use

### Database issues
- H2 database is in-memory and recreates on each restart
- Check H2 console at http://localhost:8080/h2-console
- Verify connection URL: `jdbc:h2:mem:studynest`

### Build failures
- Clear Maven cache: `mvnw clean`
- Clear npm cache: `npm cache clean --force`
- Ensure internet connection for dependency downloads

## 📱 Mobile Support

The application is optimized for desktop browsers. Mobile access will show a warning banner but remains functional.

## 🔐 Security Notes

- JWT tokens expire after 24 hours
- Passwords are encrypted using BCrypt
- CORS is configured for local development
- H2 console is enabled for development only

## 📞 Support

For issues or questions:
1. Check the documentation in `/docs` folder
2. Review backend logs for errors
3. Check browser console for frontend errors
4. Verify all prerequisites are installed

## 🎉 Success Indicators

Your application is running correctly when you see:
- ✅ Backend logs show "Started StudyNestApplication"
- ✅ Data seeding completed with 250 questions
- ✅ Frontend shows login page at localhost:5173
- ✅ You can login with test credentials
- ✅ H2 console is accessible

---

**Enjoy using StudyNest! 📚🎓**
