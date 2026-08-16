const url = 'http://localhost:3001/api/quest-scenarios';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc4NjU0MzU5OCwiZXhwIjoxNzg3MTQ4Mzk4fQ.yhM1bsE9wmK5_DsnW__dsaQ-XeGJI2H9XvWooLV8gQ0';
const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` };

async function run() {
    try {
        // Find an existing quest or create one
        let res = await fetch('http://localhost:3001/api/quests', { headers });
        let data = await res.json();
        
        let questId = data.data?.[0]?.id;
        
        if (!questId) {
            console.log("No quest found. Trying to create one...");
            // Need a module first
            res = await fetch('http://localhost:3001/api/modules', { headers });
            data = await res.json();
            const moduleId = data.data?.[0]?.id;
            
            if (!moduleId) {
                console.log("No module found. Cannot proceed with testing Quest Scenarios.");
                return;
            }
            
            res = await fetch('http://localhost:3001/api/quests', {
                method: 'POST', headers,
                body: JSON.stringify({ moduleId, title: "Test Quest", description: "This is a test quest" })
            });
            data = await res.json();
            questId = data.data?.id;
        }

        console.log(`\n=== Using Quest ID: ${questId} ===`);

        // 1. POST /api/quest-scenarios
        console.log("\n=== 1. POST /api/quest-scenarios ===");
        res = await fetch(`${url}`, {
            method: 'POST', headers,
            body: JSON.stringify({ 
                questId: questId, 
                title: "Scenario 1: Pendahuluan", 
                description: "Pendahuluan untuk quest ini",
                content: "Di suatu hari yang cerah...",
                order: 1 
            })
        });
        data = await res.json();
        console.log(`Status: ${res.status}`);
        console.log(JSON.stringify(data, null, 2));
        const scenarioId = data.data?.id;

        if (!scenarioId) {
            console.log("Failed to create scenario, stopping.");
            return;
        }

        // 2. GET /api/quest-scenarios/quest/:questId
        console.log(`\n=== 2. GET /api/quest-scenarios/quest/${questId} ===`);
        res = await fetch(`${url}/quest/${questId}`, { headers });
        data = await res.json();
        console.log(`Status: ${res.status}`);
        console.log(JSON.stringify(data, null, 2));

        // 3. GET /api/quest-scenarios/:id
        console.log(`\n=== 3. GET /api/quest-scenarios/${scenarioId} ===`);
        res = await fetch(`${url}/${scenarioId}`, { headers });
        data = await res.json();
        console.log(`Status: ${res.status}`);
        console.log(JSON.stringify(data, null, 2));

        // 4. PATCH /api/quest-scenarios/:id
        console.log(`\n=== 4. PATCH /api/quest-scenarios/${scenarioId} ===`);
        res = await fetch(`${url}/${scenarioId}`, {
            method: 'PATCH', headers,
            body: JSON.stringify({ 
                title: "Scenario 1: Pendahuluan (Updated)", 
                content: "Di suatu malam yang gelap..." 
            })
        });
        data = await res.json();
        console.log(`Status: ${res.status}`);
        console.log(JSON.stringify(data, null, 2));

        // 5. DELETE /api/quest-scenarios/:id
        console.log(`\n=== 5. DELETE /api/quest-scenarios/${scenarioId} ===`);
        res = await fetch(`${url}/${scenarioId}`, { method: 'DELETE', headers });
        data = await res.json();
        console.log(`Status: ${res.status}`);
        console.log(JSON.stringify(data, null, 2));

        console.log("\n=== ALL TESTS PASSED ===");
    } catch (e) {
        console.error("ERROR:", e);
    }
}

run();
