import { prisma } from './config/database';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';

const PORT = process.env.PORT || 3001;
const BASE_URL = `http://localhost:${PORT}`;
const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key';

function generateToken(userId: number, role: string) {
    return jwt.sign({ userId, role }, JWT_SECRET, { expiresIn: '1h' });
}

const results: any[] = [];

async function testEndpoint(name: string, method: string, url: string, token: string | null, body?: any) {
    console.log(`Testing [${method}] ${url}...`);
    try {
        const headers: Record<string, string> = {
            'Content-Type': 'application/json'
        };
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(`${BASE_URL}${url}`, {
            method,
            headers,
            body: body ? JSON.stringify(body) : undefined,
        });

        const status = response.status;
        let responseBody;
        try {
            responseBody = await response.json();
        } catch (e) {
            responseBody = await response.text();
        }

        results.push({
            name,
            method,
            url,
            requiresToken: !!token,
            requestBody: body || null,
            status,
            responseBody
        });
    } catch (error) {
        console.error(`Error testing ${url}:`, error);
        results.push({
            name,
            method,
            url,
            requiresToken: !!token,
            requestBody: body || null,
            status: 500,
            responseBody: { error: String(error) }
        });
    }
}

async function runTests() {
    try {
        // 1. Setup & Data Fetching
        let adminUser = await prisma.user.findFirst({ where: { role: 'admin' } });
        if (!adminUser) {
            adminUser = await prisma.user.create({
                data: {
                    name: 'Admin Test',
                    username: 'admintest' + Date.now(),
                    email: 'admin' + Date.now() + '@test.com',
                    passwordHash: 'dummy',
                    role: 'admin'
                }
            });
        }

        let studentUser = await prisma.user.findFirst({ where: { role: 'student' } });
        if (!studentUser) {
            studentUser = await prisma.user.create({
                data: {
                    name: 'Student Test',
                    username: 'studenttest' + Date.now(),
                    email: 'student' + Date.now() + '@test.com',
                    passwordHash: 'dummy',
                    role: 'student'
                }
            });
        }

        const adminToken = generateToken(adminUser.id, 'admin');
        const studentToken = generateToken(studentUser.id, 'student');

        let course = await prisma.course.findFirst();
        if (!course) {
            course = await prisma.course.create({
                data: { title: 'Test Course', slug: 'test-course-' + Date.now(), description: 'test' }
            });
        }

        let module = await prisma.module.findFirst({ where: { courseId: course.id } });
        if (!module) {
            module = await prisma.module.create({
                data: { courseId: course.id, title: 'Test Module', order: 1 }
            });
        }

        let lesson = await prisma.lesson.findFirst({ where: { moduleId: module.id } });
        if (!lesson) {
            lesson = await prisma.lesson.create({
                data: { moduleId: module.id, title: 'Test Lesson', order: 1 }
            });
        }

        let quiz = await prisma.quiz.findFirst({ where: { moduleId: module.id } });
        if (!quiz) {
            quiz = await prisma.quiz.create({
                data: { moduleId: module.id, title: 'Test Quiz' }
            });
        }


        let exam = await prisma.exam.findFirst({ where: { courseId: course.id } });
        if (!exam) {
            exam = await prisma.exam.create({
                data: { courseId: course.id, title: 'Test Exam' }
            });
        }

        // --- AUTH ---
        await testEndpoint('Register', 'POST', '/api/auth/register', null, { name: 'New User', username: 'newuser' + Date.now(), email: 'new' + Date.now() + '@test.com', password: 'Password_123' });
        // We skip login to avoid needing real passwords, but we can test Me
        await testEndpoint('Get Current User (Me)', 'GET', '/api/auth/me', studentToken);

        // --- COURSES ---
        await testEndpoint('Get All Courses', 'GET', '/api/courses', null);
        await testEndpoint('Get Course By ID', 'GET', `/api/courses/${course.id}`, null);
        await testEndpoint('Get Course By Slug', 'GET', `/api/courses/slug/${course.slug}`, null);
        await testEndpoint('Create Course (Admin)', 'POST', '/api/courses', adminToken, { title: 'New Course', slug: 'new-course-' + Date.now(), description: 'desc', level: 'BEGINNER', status: 'DRAFT' });
        await testEndpoint('Update Course (Admin)', 'PUT', `/api/courses/${course.id}`, adminToken, { title: 'Updated Course Title' });
        // Don't delete the course we're using, try deleting a fake one
        await testEndpoint('Delete Course (Admin)', 'DELETE', `/api/courses/999999`, adminToken);

        // --- MODULES ---
        await testEndpoint('Get Modules', 'GET', `/api/modules`, null);
        await testEndpoint('Get Module By ID', 'GET', `/api/modules/${module.id}`, null);
        await testEndpoint('Get Modules by Course', 'GET', `/api/modules/course/${course.id}`, null);
        await testEndpoint('Create Module (Admin)', 'POST', '/api/modules', adminToken, { courseId: course.id, title: 'New Module', order: 2 });
        await testEndpoint('Update Module (Admin)', 'PATCH', `/api/modules/${module.id}`, adminToken, { title: 'Updated Module Title' });
        await testEndpoint('Delete Module (Admin)', 'DELETE', `/api/modules/999999`, adminToken);

        // --- LESSONS ---
        await testEndpoint('Get Lessons', 'GET', `/api/lessons`, null);
        await testEndpoint('Get Lesson By ID', 'GET', `/api/lessons/${lesson.id}`, null);
        await testEndpoint('Get Lessons by Module', 'GET', `/api/lessons/module/${module.id}`, null);
        await testEndpoint('Create Lesson (Admin)', 'POST', '/api/lessons', adminToken, { moduleId: module.id, title: 'New Lesson', order: 2 });
        await testEndpoint('Update Lesson (Admin)', 'PATCH', `/api/lessons/${lesson.id}`, adminToken, { title: 'Updated Lesson Title' });
        await testEndpoint('Delete Lesson (Admin)', 'DELETE', `/api/lessons/999999`, adminToken);

        // --- QUIZZES ---
        await testEndpoint('Get Quizzes', 'GET', `/api/quizzes`, adminToken);
        await testEndpoint('Get Quiz By ID', 'GET', `/api/quizzes/${quiz.id}`, adminToken);
        await testEndpoint('Get Quizzes by Module', 'GET', `/api/quizzes/module/${module.id}`, adminToken);
        await testEndpoint('Create Quiz (Admin)', 'POST', '/api/quizzes', adminToken, { moduleId: module.id, title: 'New Quiz' });
        await testEndpoint('Update Quiz (Admin)', 'PATCH', `/api/quizzes/${quiz.id}`, adminToken, { title: 'Updated Quiz Title' });
        await testEndpoint('Delete Quiz (Admin)', 'DELETE', `/api/quizzes/999999`, adminToken);


        // --- EXAMS ---
        await testEndpoint('Get Exams', 'GET', `/api/exams`, adminToken);
        await testEndpoint('Get Exam By ID', 'GET', `/api/exams/${exam.id}`, adminToken);
        await testEndpoint('Get Exams by Course', 'GET', `/api/exams/course/${course.id}`, adminToken);
        await testEndpoint('Create Exam (Admin)', 'POST', '/api/exams', adminToken, { courseId: course.id, title: 'New Exam' });
        await testEndpoint('Update Exam (Admin)', 'PATCH', `/api/exams/${exam.id}`, adminToken, { title: 'Updated Exam Title' });
        await testEndpoint('Delete Exam (Admin)', 'DELETE', `/api/exams/999999`, adminToken);

        // --- ENROLLMENTS ---
        await testEndpoint('Get My Enrollments', 'GET', `/api/enrollments/my`, studentToken);
        await testEndpoint('Enroll in Course', 'POST', `/api/enrollments`, studentToken, { courseId: course.id });

        // Save Results
        const outputPath = path.join(__dirname, 'swagger-data.json');
        fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
        console.log(`Successfully wrote test results to ${outputPath}`);

    } catch (error) {
        console.error('Error running tests:', error);
    } finally {
        await prisma.$disconnect();
    }
}

runTests();
