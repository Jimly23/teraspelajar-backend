import { prisma } from './src/config/database';

const categories = ["Web Development", "Data Science", "Mobile Development", "UI/UX Design", "Machine Learning"];

async function main() {
    console.log('Fetching all courses...');
    const courses = await prisma.course.findMany();
    console.log(`Found ${courses.length} courses.`);

    for (const course of courses) {
        if (!course.category) {
            const randomCategory = categories[Math.floor(Math.random() * categories.length)];
            await prisma.course.update({
                where: { id: course.id },
                data: { category: randomCategory }
            });
            console.log(`Updated course ${course.id} with category: ${randomCategory}`);
        }
    }
    console.log('Category update complete!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
