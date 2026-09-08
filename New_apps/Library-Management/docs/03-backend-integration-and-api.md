# Backend Integration & API Specification: Digital E-Library & Reading Hub

## 1. Microservice Overview
- **Technology Stack**: FastAPI / Django REST with S3 presigned URLs for DRM PDF streaming
- **Local Port**: `8114`
- **Database**: PostgreSQL `library_management_db`

## 2. Core Entities
- **LibraryBook**: LibraryBook (isbn, title, author, publisher, publication_year, total_copies, available_copies, shelf_location)
- **EBookResource**: EBookResource (title, grade_level, subject, publisher, pdf_storage_url, file_size_bytes, drm_restricted)
- **BookIssueRecord**: BookIssueRecord (book_id, student_id_or_staff_id, issue_date, due_date, return_date, fine_amount, status)
- **LibraryMember**: LibraryMember (user_id, member_type, max_borrow_limit, active_issues_count, penalty_balance)

## 3. Real-Time Events
WebSocket endpoint: `ws://localhost:8114/ws/events` for live operational updates.
