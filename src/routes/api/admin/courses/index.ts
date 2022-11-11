import { FastifyPluginAsync } from "fastify";
import { createCourse } from "@handlers/courses";
import { createCourseSchema } from "@schemas/courses";

const courses: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post("/", { schema: createCourseSchema }, createCourse);
};

export default courses;
