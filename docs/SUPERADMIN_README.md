# Super Admin Feature

## Overview
Super Admin can approve or reject tutor registrations. When a tutor registers, their account is in PENDING status and they cannot login until approved by Super Admin.

## Super Admin Credentials
- **Username:** `admin`
- **Password:** `admin123`

## Features

### 1. Tutor Approval System
- All new tutor registrations are automatically set to PENDING status
- Tutors cannot login until their account is APPROVED
- Super Admin can view all tutors in different tabs:
  - **Pending Approval**: Tutors waiting for approval
  - **Approved**: Tutors who can login
  - **Rejected**: Tutors who were rejected
  - **All Tutors**: Complete list

### 2. Actions Available
- **Approve**: Allow tutor to login and access the system
- **Reject**: Deny tutor access
- **Revoke**: Remove approval from an approved tutor
- **Re-approve**: Approve a previously rejected tutor

### 3. Dashboard Statistics
- Total Pending Tutors
- Total Approved Tutors
- Total Rejected Tutors
- Total Tutors

## API Endpoints

### Get All Tutors
```
GET /api/superadmin/tutors
Authorization: Bearer <token>
```

### Get Pending Tutors
```
GET /api/superadmin/tutors/pending
Authorization: Bearer <token>
```

### Approve/Reject Tutor
```
POST /api/superadmin/tutors/approve
Authorization: Bearer <token>
Content-Type: application/json

{
  "tutorId": 1,
  "status": "APPROVED" // or "REJECTED"
}
```

## Database Changes

### Tutor Entity
Added new field:
- `approvalStatus` (String): PENDING, APPROVED, REJECTED (default: PENDING)

### SuperAdmin Entity
New table created with fields:
- `id` (Long)
- `username` (String, unique)
- `password` (String, encrypted)
- `name` (String)

## Frontend Routes

### Super Admin Routes
- `/superadmin/dashboard` - Main dashboard with tutor management

## How It Works

1. **Tutor Registration**
   - Tutor fills registration form
   - Account created with `approvalStatus = PENDING`
   - Tutor receives success message but cannot login yet

2. **Super Admin Login**
   - Login with username: `admin` and password: `admin123`
   - Redirected to Super Admin Dashboard

3. **Tutor Approval**
   - Super Admin sees all pending tutors
   - Can approve or reject each tutor
   - Approved tutors can now login
   - Rejected tutors cannot login

4. **Tutor Login**
   - If status is PENDING or REJECTED: Error message shown
   - If status is APPROVED: Login successful

## Security
- Super Admin routes protected with `@PreAuthorize("hasRole('SUPER_ADMIN')")`
- Only Super Admin can access tutor approval endpoints
- Passwords are encrypted using BCrypt

## Notes
- Super Admin is hardcoded and created automatically on application startup
- Only one Super Admin exists in the system
- Super Admin cannot be deleted or modified through the application
