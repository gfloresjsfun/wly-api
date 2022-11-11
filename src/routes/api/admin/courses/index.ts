import { FastifyPluginAsync } from "fastify";
import { createCourse, getCourses } from "@handlers/courses";
import { createCourseSchema, getCoursesSchema } from "@schemas/courses";

const courses: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post("/", { schema: createCourseSchema }, createCourse);
  fastify.get("/", { schema: getCoursesSchema }, getCourses);
};

export default courses;
