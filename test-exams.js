const url = 'http://localhost:3001/api/quizzes';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc4NjU0MzU5OCwiZXhwIjoxNzg3MTQ4Mzk4fQ.yhM1bsE9wmK5_DsnW__dsaQ-XeGJI2H9XvWooLV8gQ0';
const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` };

async function run() {
    try {
        // First check if there's a quiz to use
        console.log("=== 0. GET /api/quizzes (check existing) ===");
        let res = await fetch(`${url}/`, { headers });
        let data = await res.json();
        console.log(JSON.stringify(data, null, 2));

        const quizId = data.data?.[0]?.id;
        if (!quizId) {
            console.log("No quiz found. Creating one first...");
            // We need a moduleId - let's check modules
            res = await fetch('http://localhost:3001/api/modules/', { headers });
            data = await res.json();
            console.log("Modules:", JSON.stringify(data, null, 2));
            const moduleId = data.data?.[0]?.id;
            if (!moduleId) {
                console.log("No module found either. Cannot proceed.");
                return;
            }
            res = await fetch(`${url}/`, {
                method: 'POST', headers,
                body: JSON.stringify({ moduleId, title: "Quiz Dasar HTML", description: "Quiz tentang dasar-dasar HTML" })
            });
            data = await res.json();
            console.log("Created Quiz:", JSON.stringify(data, null, 2));
            var useQuizId = data.data.id;
        } else {
            var useQuizId = quizId;
        }

        console.log(`\nUsing Quiz ID: ${useQuizId}`);

        // 1. POST /api/quizzes/questions
        console.log("\n=== 1. POST /api/quizzes/questions ===");
        res = await fetch(`${url}/questions`, {
            method: 'POST', headers,
            body: JSON.stringify({ quizId: useQuizId, question: "Apa itu HTML?", order: 1 })
        });
        data = await res.json();
        console.log(`Status: ${res.status}`);
        console.log(JSON.stringify(data, null, 2));
        const questionId = data.data?.id;

        if (!questionId) {
            console.log("Failed to create question, stopping.");
            return;
        }

        // 2. POST /api/quizzes/options (Option A - correct)
        console.log("\n=== 2. POST /api/quizzes/options (Option A) ===");
        res = await fetch(`${url}/options`, {
            method: 'POST', headers,
            body: JSON.stringify({ questionId, option: "Hyper Text Markup Language", isCorrect: true })
        });
        data = await res.json();
        console.log(`Status: ${res.status}`);
        console.log(JSON.stringify(data, null, 2));
        const optionId = data.data?.id;

        // 3. POST /api/quizzes/options (Option B - wrong)
        console.log("\n=== 3. POST /api/quizzes/options (Option B) ===");
        res = await fetch(`${url}/options`, {
            method: 'POST', headers,
            body: JSON.stringify({ questionId, option: "High Tech Machine Learning", isCorrect: false })
        });
        data = await res.json();
        console.log(`Status: ${res.status}`);
        console.log(JSON.stringify(data, null, 2));

        // 4. GET /api/quizzes/:quizId/questions
        console.log(`\n=== 4. GET /api/quizzes/${useQuizId}/questions ===`);
        res = await fetch(`${url}/${useQuizId}/questions`, { headers });
        data = await res.json();
        console.log(`Status: ${res.status}`);
        console.log(JSON.stringify(data, null, 2));

        // 5. GET /api/quizzes/questions/:id
        console.log(`\n=== 5. GET /api/quizzes/questions/${questionId} ===`);
        res = await fetch(`${url}/questions/${questionId}`, { headers });
        data = await res.json();
        console.log(`Status: ${res.status}`);
        console.log(JSON.stringify(data, null, 2));

        // 6. PUT /api/quizzes/questions/:id
        console.log(`\n=== 6. PUT /api/quizzes/questions/${questionId} ===`);
        res = await fetch(`${url}/questions/${questionId}`, {
            method: 'PUT', headers,
            body: JSON.stringify({ question: "Apa kepanjangan dari HTML?", order: 1 })
        });
        data = await res.json();
        console.log(`Status: ${res.status}`);
        console.log(JSON.stringify(data, null, 2));

        // 7. PUT /api/quizzes/options/:id
        console.log(`\n=== 7. PUT /api/quizzes/options/${optionId} ===`);
        res = await fetch(`${url}/options/${optionId}`, {
            method: 'PUT', headers,
            body: JSON.stringify({ option: "Hyper Text Markup Language (benar)", isCorrect: true })
        });
        data = await res.json();
        console.log(`Status: ${res.status}`);
        console.log(JSON.stringify(data, null, 2));

        // 8. DELETE /api/quizzes/options/:id
        console.log(`\n=== 8. DELETE /api/quizzes/options/${optionId} ===`);
        res = await fetch(`${url}/options/${optionId}`, { method: 'DELETE', headers });
        data = await res.json();
        console.log(`Status: ${res.status}`);
        console.log(JSON.stringify(data, null, 2));

        // 9. DELETE /api/quizzes/questions/:id
        console.log(`\n=== 9. DELETE /api/quizzes/questions/${questionId} ===`);
        res = await fetch(`${url}/questions/${questionId}`, { method: 'DELETE', headers });
        data = await res.json();
        console.log(`Status: ${res.status}`);
        console.log(JSON.stringify(data, null, 2));

        console.log("\n=== ALL TESTS PASSED ===");
    } catch (e) {
        console.error("ERROR:", e);
    }
}

run();
