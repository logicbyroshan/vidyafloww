# Backend Integration & API Specification: Design Lab Studio

## 1. Microservice Overview
- **Technology Stack**: FastAPI / Django REST Microservice with WeasyPrint & ReportLab vector engines
- **Local Port**: `8110`
- **Database**: PostgreSQL `design_lab_db`

## 2. Core Entities
- **DocumentTemplate**: DocumentTemplate (dimensions, margins, DPI, header, watermark, signature slots)
- **TemplateField**: TemplateField (coordinate x, y, width, height, font_family, font_size, data_binding)
- **RenderedDocument**: RenderedDocument (hash, student_id, staff_id, generated_pdf_url, sha256_checksum)
- **CertificateBatch**: CertificateBatch (batch_code, academic_year, issue_count, signed_by)

## 3. Real-Time Events
WebSocket endpoint: `ws://localhost:8110/ws/events` for live operational updates.
