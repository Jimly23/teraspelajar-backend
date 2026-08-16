import fs from 'fs';
import path from 'path';

const dataPath = path.join(__dirname, 'swagger-data.json');
const testData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

function getType(value: any): string {
    if (value === null) return 'string'; // Default
    if (Array.isArray(value)) return 'array';
    return typeof value;
}

function generateSchema(obj: any): any {
    if (obj === null || obj === undefined) return { type: 'object' };
    const type = getType(obj);
    if (type === 'array') {
        return {
            type: 'array',
            items: obj.length > 0 ? generateSchema(obj[0]) : { type: 'object' }
        };
    }
    if (type === 'object') {
        const properties: any = {};
        for (const key in obj) {
            properties[key] = generateSchema(obj[key]);
        }
        return { type: 'object', properties };
    }
    return { type, example: obj };
}

function getTags(url: string) {
    if (url.includes('/auth/')) return ['Auth'];
    if (url.includes('/courses')) return ['Courses'];
    if (url.includes('/modules')) return ['Modules'];
    if (url.includes('/lessons')) return ['Lessons'];
    if (url.includes('/quizzes')) return ['Quizzes'];
    if (url.includes('/quests')) return ['Quests'];
    if (url.includes('/exams')) return ['Exams'];
    if (url.includes('/enrollments')) return ['Enrollments'];
    return ['Default'];
}

const paths: any = {};

testData.forEach((endpoint: any) => {
    // Replace hardcoded IDs with OpenAPI parameters, e.g., /api/courses/2 -> /api/courses/{id}
    // and slug like /api/courses/slug/belajar-pemrograman-web -> /api/courses/slug/{slug}
    
    let pathName = endpoint.url;
    const pathParams: any[] = [];

    // Simple heuristic to find IDs (numbers) in paths
    pathName = pathName.replace(/\/[0-9]+$/, (match: string) => {
        pathParams.push({
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'integer' }
        });
        return '/{id}';
    });
    
    // Simple heuristic to find slugs
    if (pathName.includes('/slug/')) {
        pathName = pathName.replace(/\/slug\/[a-zA-Z0-9-]+$/, (match: string) => {
            pathParams.push({
                name: 'slug',
                in: 'path',
                required: true,
                schema: { type: 'string' }
            });
            return '/slug/{slug}';
        });
    }
    
    // Heuristic for /course/:courseId
    if (pathName.includes('/course/')) {
        pathName = pathName.replace(/\/course\/[0-9]+$/, (match: string) => {
            pathParams.push({
                name: 'courseId',
                in: 'path',
                required: true,
                schema: { type: 'integer' }
            });
            return '/course/{courseId}';
        });
    }

    // Heuristic for /module/:moduleId
    if (pathName.includes('/module/')) {
        pathName = pathName.replace(/\/module\/[0-9]+$/, (match: string) => {
            pathParams.push({
                name: 'moduleId',
                in: 'path',
                required: true,
                schema: { type: 'integer' }
            });
            return '/module/{moduleId}';
        });
    }


    if (!paths[pathName]) paths[pathName] = {};

    const method = endpoint.method.toLowerCase();
    
    const operation: any = {
        summary: endpoint.name,
        tags: getTags(pathName),
        responses: {
            [endpoint.status]: {
                description: 'Response',
                content: {
                    'application/json': {
                        schema: generateSchema(endpoint.responseBody)
                    }
                }
            }
        }
    };

    if (endpoint.requiresToken) {
        operation.security = [{ bearerAuth: [] }];
    }

    if (pathParams.length > 0) {
        operation.parameters = pathParams;
    }

    if (endpoint.requestBody) {
        operation.requestBody = {
            required: true,
            content: {
                'application/json': {
                    schema: generateSchema(endpoint.requestBody)
                }
            }
        };
    }

    paths[pathName][method] = operation;
});

const swaggerSpec = {
    openapi: '3.0.0',
    info: {
        title: 'SafeLearn API',
        version: '1.0.0',
        description: 'Comprehensive API documentation for SafeLearn backend.'
    },
    servers: [
        {
            url: 'http://localhost:3001',
            description: 'Local Development Server'
        }
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT'
            }
        }
    },
    paths
};

const output = `export const swaggerDocument = ${JSON.stringify(swaggerSpec, null, 2)};\n`;
fs.writeFileSync(path.join(__dirname, 'swagger-docs.ts'), output);
console.log('Swagger specs generated at src/swagger-docs.ts');
