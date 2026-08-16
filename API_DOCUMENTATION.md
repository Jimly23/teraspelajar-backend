# API Documentation

This document provides details for the Safe Learn API endpoints.

## Enrollments

### Enrollment

**Endpoint:** `POST` `/api/enrollments`

**Requires Bearer Token:** Yes

**Headers:**
- `Accept`: `application/json`

**Example Request Body:**
```json
{
  "courseId": 2
}
```

**Example Response:** *(No response saved in collection)*

---

### Enrollment Update Progress

**Endpoint:** `PATCH` `/api/enrollments/:id/progress`

**Requires Bearer Token:** Yes

**Headers:**
- `Accept`: `application/json`

**Example Request Body:**
```json
{
  "progress": 40
}
```

**Example Response:** *(No response saved in collection)*

---

### Enrollment

**Endpoint:** `GET` `/api/enrollments/my`

**Requires Bearer Token:** Yes

**Headers:**
- `Accept`: `application/json`

**Example Request Body:**
```json
{
  "courseId": 2
}
```

**Example Response:** *(No response saved in collection)*

---

### Enrollment By Id

**Endpoint:** `GET` `/api/enrollments/:id`

**Requires Bearer Token:** Yes

**Headers:**
- `Accept`: `application/json`

**Example Request Body:**
```json
{
  "courseId": 2
}
```

**Example Response:** *(No response saved in collection)*

---

## Courses

## Module

### Module

**Endpoint:** `POST` `/api/modules`

**Requires Bearer Token:** Yes

**Headers:**
- `Accept`: `application/json`

**Example Request Body:**
```json
{
    "courseId": 4,
    "title": "HTML Profesional",
    "description": "Mempelajari dasar HTML",
    "order": 2
}
```

**Example Response:** *(No response saved in collection)*

---

### Module

**Endpoint:** `DELETE` `/api/modules/:id`

**Requires Bearer Token:** Yes

**Headers:**
- `Accept`: `application/json`

**Example Response:** *(No response saved in collection)*

---

### Module

**Endpoint:** `PATCH` `/api/modules/:id`

**Requires Bearer Token:** Yes

**Headers:**
- `Accept`: `application/json`

**Example Request Body:**
```json
{
    "title": "HTML Dasar dan Semantik HTML",
    "description": "Mempelajari dasar HTML",
    "order": 1
}
```

**Example Response:** *(No response saved in collection)*

---

### Module

**Endpoint:** `GET` `/api/modules`

**Requires Bearer Token:** No

**Headers:**
- `Accept`: `application/json`

**Example Request Body:**
```json
{
    "courseId": 4,
    "title": "HTML Dasar",
    "description": "Mempelajari dasar HTML",
    "order": 1
}
```

**Example Response:** *(No response saved in collection)*

---

### Module By Id

**Endpoint:** `GET` `/api/modules/:id`

**Requires Bearer Token:** No

**Headers:**
- `Accept`: `application/json`

**Example Request Body:**
```json
{
    "courseId": 4,
    "title": "HTML Dasar",
    "description": "Mempelajari dasar HTML",
    "order": 1
}
```

**Example Response:** *(No response saved in collection)*

---

### Module By Course

**Endpoint:** `GET` `/api/modules/course/:idCourse`

**Requires Bearer Token:** No

**Headers:**
- `Accept`: `application/json`

**Example Request Body:**
```json
{
    "courseId": 4,
    "title": "HTML Dasar",
    "description": "Mempelajari dasar HTML",
    "order": 1
}
```

**Example Response:** *(No response saved in collection)*

---

## Lessons

### Lessons

**Endpoint:** `POST` `/api/lessons`

**Requires Bearer Token:** Yes

**Headers:**
- `Accept`: `application/json`

**Example Request Body:**
```json
{
    "moduleId": 1,
    "title": "Pengenalan CSS",
    "description": "Mengenal dasar HTML",
    "content": "HTML adalah bahasa markup untuk membuat struktur halaman web.",
    "videoUrl": "https://youtube.com/watch?v=example",
    "order": 2
}
```

**Example Response:** *(No response saved in collection)*

---

### Lessons

**Endpoint:** `GET` `/api/lessons`

**Requires Bearer Token:** No

**Example Response:** *(No response saved in collection)*

---

### Lessons By Module Id

**Endpoint:** `GET` `/api/lessons/module/:moduleId`

**Requires Bearer Token:** No

**Example Response:** *(No response saved in collection)*

---

### Lessons By Id

**Endpoint:** `GET` `/api/lessons/:id`

**Requires Bearer Token:** No

**Example Response:** *(No response saved in collection)*

---

### Lessons

**Endpoint:** `PATCH` `/api/lessons/:id`

**Requires Bearer Token:** Yes

**Headers:**
- `Accept`: `application/vnd.api+json`

**Example Request Body:**
```json
{
    "title": "Pengenalan HTML dan Struktur Dokumen",
    "description": "Mempelajari dasar HTML dan struktur dokumen HTML",
    "order": 1
}
```

**Example Response:** *(No response saved in collection)*

---

### Lessons

**Endpoint:** `DELETE` `/api/lessons/:id`

**Requires Bearer Token:** Yes

**Headers:**
- `Accept`: `application/json`

**Example Response:** *(No response saved in collection)*

---

## Quizzes

### Quizzes

**Endpoint:** `POST` `/api/quizzes`

**Requires Bearer Token:** Yes

**Headers:**
- `Accept`: `application/json`

**Example Request Body:**
```json
{
    "moduleId": 1,
    "title": "Quiz CSS Dasar",
    "description": "Uji pemahaman materi HTML dasar"
}
```

**Example Response:** *(No response saved in collection)*

---

### Quizzes

**Endpoint:** `PATCH` `/api/quizzes/:id`

**Requires Bearer Token:** Yes

**Headers:**
- `Accept`: `application/json`

**Example Request Body:**
```json
{
    "title": "Quiz HTML Dasar - Basic",
    "description": "Quiz untuk menguji pemahaman HTML dasar"
}
```

**Example Response:** *(No response saved in collection)*

---

### Quizzes Copy

**Endpoint:** `DELETE` `/api/quizzes/:id`

**Requires Bearer Token:** Yes

**Headers:**
- `Accept`: `application/json`

**Example Request Body:**
```json
{
    "moduleId": 1,
    "title": "Pengenalan CSS",
    "description": "Mengenal dasar HTML",
    "content": "HTML adalah bahasa markup untuk membuat struktur halaman web.",
    "videoUrl": "https://youtube.com/watch?v=example",
    "order": 2
}
```

**Example Response:** *(No response saved in collection)*

---

### Quizzes

**Endpoint:** `GET` `/api/quizzes`

**Requires Bearer Token:** Yes

**Headers:**
- `Accept`: `application/json`

**Example Request Body:**
```json
{
    "moduleId": 1,
    "title": "Pengenalan CSS",
    "description": "Mengenal dasar HTML",
    "content": "HTML adalah bahasa markup untuk membuat struktur halaman web.",
    "videoUrl": "https://youtube.com/watch?v=example",
    "order": 2
}
```

**Example Response:** *(No response saved in collection)*

---

### Quizzes By Id

**Endpoint:** `GET` `/api/quizzes/:id`

**Requires Bearer Token:** Yes

**Headers:**
- `Accept`: `application/json`

**Example Request Body:**
```json
{
    "moduleId": 1,
    "title": "Pengenalan CSS",
    "description": "Mengenal dasar HTML",
    "content": "HTML adalah bahasa markup untuk membuat struktur halaman web.",
    "videoUrl": "https://youtube.com/watch?v=example",
    "order": 2
}
```

**Example Response:** *(No response saved in collection)*

---

### Quizzes By Module Id

**Endpoint:** `GET` `/api/quizzes/module/:moduleId`

**Requires Bearer Token:** Yes

**Headers:**
- `Accept`: `application/json`

**Example Request Body:**
```json
{
    "moduleId": 1,
    "title": "Pengenalan CSS",
    "description": "Mengenal dasar HTML",
    "content": "HTML adalah bahasa markup untuk membuat struktur halaman web.",
    "videoUrl": "https://youtube.com/watch?v=example",
    "order": 2
}
```

**Example Response:** *(No response saved in collection)*

---

## Quests

### Quests

**Endpoint:** `POST` `/api/quests`

**Requires Bearer Token:** Yes

**Headers:**
- `Accept`: `application/json`

**Example Request Body:**
```json
{
    "moduleId": 1,
    "title": "Quest: Build a Ngantuk List",
    "description": "Buat aplikasi Ngantuk List menggunakan JavaScript."
}
```

**Example Response:** *(No response saved in collection)*

---

### Quests

**Endpoint:** `PATCH` `/api/quests/:id`

**Requires Bearer Token:** Yes

**Headers:**
- `Accept`: `application/json`

**Example Request Body:**
```json
{
    "title": "Qbuilddd",
    "description": "Quiz untuk menguji pemahaman HTML dasar"
}
```

**Example Response:** *(No response saved in collection)*

---

### Quests

**Endpoint:** `DELETE` `/api/quests/:id`

**Requires Bearer Token:** Yes

**Headers:**
- `Accept`: `application/json`

**Example Request Body:**
```json
{
    "moduleId": 1,
    "title": "Pengenalan CSS",
    "description": "Mengenal dasar HTML",
    "content": "HTML adalah bahasa markup untuk membuat struktur halaman web.",
    "videoUrl": "https://youtube.com/watch?v=example",
    "order": 2
}
```

**Example Response:** *(No response saved in collection)*

---

### Quests

**Endpoint:** `GET` `/api/quests`

**Requires Bearer Token:** Yes

**Headers:**
- `Accept`: `application/json`

**Example Request Body:**
```json
{
    "moduleId": 1,
    "title": "Pengenalan CSS",
    "description": "Mengenal dasar HTML",
    "content": "HTML adalah bahasa markup untuk membuat struktur halaman web.",
    "videoUrl": "https://youtube.com/watch?v=example",
    "order": 2
}
```

**Example Response:** *(No response saved in collection)*

---

### Quests By Id

**Endpoint:** `GET` `/api/quests/:id`

**Requires Bearer Token:** Yes

**Headers:**
- `Accept`: `application/json`

**Example Request Body:**
```json
{
    "moduleId": 1,
    "title": "Pengenalan CSS",
    "description": "Mengenal dasar HTML",
    "content": "HTML adalah bahasa markup untuk membuat struktur halaman web.",
    "videoUrl": "https://youtube.com/watch?v=example",
    "order": 2
}
```

**Example Response:** *(No response saved in collection)*

---

### Quests By Module Id

**Endpoint:** `GET` `/api/quests/module/:moduleId`

**Requires Bearer Token:** Yes

**Headers:**
- `Accept`: `application/json`

**Example Request Body:**
```json
{
    "moduleId": 1,
    "title": "Pengenalan CSS",
    "description": "Mengenal dasar HTML",
    "content": "HTML adalah bahasa markup untuk membuat struktur halaman web.",
    "videoUrl": "https://youtube.com/watch?v=example",
    "order": 2
}
```

**Example Response:** *(No response saved in collection)*

---

## Exam

### Exams

**Endpoint:** `POST` `/api/exams`

**Requires Bearer Token:** Yes

**Headers:**
- `Accept`: `application/json`

**Example Request Body:**
```json
{
  "courseId": 2,
  "title": "Final Exam",
  "description": "Ujian akhir course",
  "duration": 15,
  "passingScore": 80
}
```

**Example Response:** *(No response saved in collection)*

---

### Exams

**Endpoint:** `PATCH` `/api/exams/:id`

**Requires Bearer Token:** Yes

**Headers:**
- `Accept`: `application/json`

**Example Request Body:**
```json
{
    "title": "Qbuilddd",
    "description": "Quiz untuk menguji pemahaman HTML dasar"
}
```

**Example Response:** *(No response saved in collection)*

---

### Exams

**Endpoint:** `DELETE` `/api/exams/:id`

**Requires Bearer Token:** Yes

**Headers:**
- `Accept`: `application/json`

**Example Request Body:**
```json
{
    "moduleId": 1,
    "title": "Pengenalan CSS",
    "description": "Mengenal dasar HTML",
    "content": "HTML adalah bahasa markup untuk membuat struktur halaman web.",
    "videoUrl": "https://youtube.com/watch?v=example",
    "order": 2
}
```

**Example Response:** *(No response saved in collection)*

---

### Exams

**Endpoint:** `GET` `/api/exams`

**Requires Bearer Token:** Yes

**Headers:**
- `Accept`: `application/json`

**Example Request Body:**
```json
{
    "moduleId": 1,
    "title": "Pengenalan CSS",
    "description": "Mengenal dasar HTML",
    "content": "HTML adalah bahasa markup untuk membuat struktur halaman web.",
    "videoUrl": "https://youtube.com/watch?v=example",
    "order": 2
}
```

**Example Response:** *(No response saved in collection)*

---

### Exams By Id

**Endpoint:** `GET` `/api/exams/:id`

**Requires Bearer Token:** Yes

**Headers:**
- `Accept`: `application/json`

**Example Request Body:**
```json
{
    "moduleId": 1,
    "title": "Pengenalan CSS",
    "description": "Mengenal dasar HTML",
    "content": "HTML adalah bahasa markup untuk membuat struktur halaman web.",
    "videoUrl": "https://youtube.com/watch?v=example",
    "order": 2
}
```

**Example Response:** *(No response saved in collection)*

---

### Exams By Course Id

**Endpoint:** `GET` `/api/exams/course/:courseId`

**Requires Bearer Token:** Yes

**Headers:**
- `Accept`: `application/json`

**Example Request Body:**
```json
{
    "moduleId": 1,
    "title": "Pengenalan CSS",
    "description": "Mengenal dasar HTML",
    "content": "HTML adalah bahasa markup untuk membuat struktur halaman web.",
    "videoUrl": "https://youtube.com/watch?v=example",
    "order": 2
}
```

**Example Response:** *(No response saved in collection)*

---

### Register

**Endpoint:** `POST` `/api/auth/register`

**Requires Bearer Token:** No

**Headers:**
- `Accept`: `application/json`

**Example Request Body:**
```json
{
  "name": "Ilyas",
  "username": "ilyas",
  "email": "ilyas@gmail.com",
  "password": "Ilyas_23"
}
```

**Example Response:** *(No response saved in collection)*

---

### Course

**Endpoint:** `POST` `/api/courses`

**Requires Bearer Token:** Yes

**Headers:**
- `Accept`: `application/json`

**Example Request Body:**
```json
{
  "title": "Belajar Pemrograman Web",
  "slug": "belajar-pemrograman-web",
  "description": "Belajar dasar pemrograman web dari HTML, CSS, JavaScript hingga membuat aplikasi web.",
  "thumbnail": "https://example.com/images/web-programming.jpg",
  "level": "BEGINNER",
  "status": "DRAFT"
}
```

**Example Response:** *(No response saved in collection)*

---

### Course Copy

**Endpoint:** `PUT` `/api/courses/:id`

**Requires Bearer Token:** Yes

**Headers:**
- `Accept`: `application/json`

**Example Request Body:**
```json
{
  "title": "Belajar hahahaha",
  "description": "Belajar pemrograman web modern menggunakan HTML, CSS, JavaScript, dan framework.",
  "level": "INTERMEDIATE",
  "status": "PUBLISHED"
}
```

**Example Response:** *(No response saved in collection)*

---

### Course

**Endpoint:** `GET` `/api/courses`

**Requires Bearer Token:** Yes

**Headers:**
- `Accept`: `application/json`

**Example Request Body:**
```json
{
  "title": "Belajar Pemrograman Web",
  "slug": "belajar-pemrograman-web",
  "description": "Belajar dasar pemrograman web dari HTML, CSS, JavaScript hingga membuat aplikasi web.",
  "thumbnail": "https://example.com/images/web-programming.jpg",
  "level": "BEGINNER",
  "status": "DRAFT"
}
```

**Example Response:** *(No response saved in collection)*

---

### Course

**Endpoint:** `DELETE` `/api/courses/:id`

**Requires Bearer Token:** Yes

**Headers:**
- `Accept`: `application/json`

**Example Request Body:**
```json
{
  "title": "Belajar Pemrograman Web",
  "slug": "belajar-pemrograman-web",
  "description": "Belajar dasar pemrograman web dari HTML, CSS, JavaScript hingga membuat aplikasi web.",
  "thumbnail": "https://example.com/images/web-programming.jpg",
  "level": "BEGINNER",
  "status": "DRAFT"
}
```

**Example Response:** *(No response saved in collection)*

---

### Course By Id

**Endpoint:** `GET` `/api/courses/:id`

**Requires Bearer Token:** Yes

**Headers:**
- `Accept`: `application/json`

**Example Request Body:**
```json
{
  "title": "Belajar Pemrograman Web",
  "slug": "belajar-pemrograman-web",
  "description": "Belajar dasar pemrograman web dari HTML, CSS, JavaScript hingga membuat aplikasi web.",
  "thumbnail": "https://example.com/images/web-programming.jpg",
  "level": "BEGINNER",
  "status": "DRAFT"
}
```

**Example Response:** *(No response saved in collection)*

---

### Course By Slug

**Endpoint:** `GET` `/api/courses/slug/:slug`

**Requires Bearer Token:** Yes

**Headers:**
- `Accept`: `application/json`

**Example Request Body:**
```json
{
  "title": "Belajar Pemrograman Web",
  "slug": "belajar-pemrograman-web",
  "description": "Belajar dasar pemrograman web dari HTML, CSS, JavaScript hingga membuat aplikasi web.",
  "thumbnail": "https://example.com/images/web-programming.jpg",
  "level": "BEGINNER",
  "status": "DRAFT"
}
```

**Example Response:** *(No response saved in collection)*

---

### Course Detail By Slug

**Endpoint:** `GET` `/api/courses/slug/:slug/detail`

**Requires Bearer Token:** Yes

**Headers:**
- `Accept`: `application/json`

**Example Request Body:**
```json
{
  "title": "Belajar Pemrograman Web",
  "slug": "belajar-pemrograman-web",
  "description": "Belajar dasar pemrograman web dari HTML, CSS, JavaScript hingga membuat aplikasi web.",
  "thumbnail": "https://example.com/images/web-programming.jpg",
  "level": "BEGINNER",
  "status": "DRAFT"
}
```

**Example Response:** *(No response saved in collection)*

---

### Login

**Endpoint:** `POST` `/api/auth/login`

**Requires Bearer Token:** No

**Headers:**
- `Accept`: `application/json`

**Example Request Body:**
```json
{
  "email": "admin@safelearn.com",
  "password": "Admin_23"
}
```

**Example Response:** *(No response saved in collection)*

---

### Logout

**Endpoint:** `POST` `/api/auth/logout`

**Requires Bearer Token:** Yes

**Headers:**
- `Accept`: `application/json`

**Example Response:** *(No response saved in collection)*

---

### Me

**Endpoint:** `GET` `/api/auth/me`

**Requires Bearer Token:** Yes

**Headers:**
- `Accept`: `application/json`

**Example Request Body:**
```json
{
  "email": "jimly@gmail.com",
  "password": "Hardiansyah_23"
}
```

**Example Response:** *(No response saved in collection)*

---

### New Request

**Endpoint:** `GET` ``

**Requires Bearer Token:** No

**Example Response:** *(No response saved in collection)*

---

### New Request

**Endpoint:** `GET` ``

**Requires Bearer Token:** No

**Example Response:** *(No response saved in collection)*

---

