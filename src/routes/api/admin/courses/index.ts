import { FastifyPluginAsync } from "fastify";
import {
  createCourse,
  getCourses,
  deleteCourse,
  deleteSession,
} from "@handlers/courses";
import {
  createCourseSchema,
  getCoursesSchema,
  deleteCourseSchema,
  deleteSessionSchema,
} from "@schemas/courses";

const courses: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post("/", { schema: createCourseSchema }, createCourse);
  fastify.get("/", { schema: getCoursesSchema }, getCourses);
  fastify.delete("/:id", { schema: deleteCourseSchema }, deleteCourse);
  fastify.delete(
    "/:id/sessions/:sessionId",
    { schema: deleteSessionSchema },
    deleteSession
  );
};

export default courses;
