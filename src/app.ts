import express from "express";
import authRoutes from "./routes/auth.routes";
import courseRoutes from "./routes/course.routes";
import enrollmentRoutes from "./routes/enrollment.routes";
import moduleRoutes from "./routes/module.routes";
import lessonRoutes from "./routes/lesson.routes";
import quizRoutes from "./routes/quiz.routes";
import examRoutes from "./routes/exam.routes";
import examQuestionRoutes from "./routes/exam-question.routes";
import quizQuestionRoutes from "./routes/quiz-question.routes";
import progressRoutes from "./routes/progress.routes";
import { errorMiddleware } from "./middlewares/error.middleware";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { swaggerDocument } from "./swagger-docs";
import path from "path";
import credentialRoutes from "./routes/credential.route";
import adminCredentialRoutes from "./routes/admin.credential.route";
import verifyRoutes from "./routes/verify.route";

const app = express();

app.use(
    cors({
        origin: [
            "http://localhost:3000",
            "https://teraspelajar.com",
            "https://www.teraspelajar.com",
        ],

        credentials: true,
    })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "SafeLearn API is running",
  });
});

// Serve static files (certificates)
app.use(express.static(path.join(__dirname, "../public")));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get("/api-docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerDocument);
});

app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/modules", moduleRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/quizzes", quizRoutes);
app.use("/api/quizzes", quizQuestionRoutes);
app.use("/api/exams", examRoutes);
app.use("/api/exams", examQuestionRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/credentials", credentialRoutes);
app.use("/api/admin/credentials", adminCredentialRoutes);
app.use("/api/verify", verifyRoutes);

app.use(errorMiddleware);

export default app;