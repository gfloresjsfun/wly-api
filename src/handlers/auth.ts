import { RouteHandlerMethod } from "fastify";
import User from "@models/User";

const login: RouteHandlerMethod = async (request, reply) => {
  const { email, password } = request.body as {
    email: string;
    password: string;
  };

  try {
    const user = await User.findOne({ email });

    if (!user) {
      reply.badRequest("Email is not correct.");
      return;
    }

    const passwordMatch = await request.server.bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!passwordMatch) {
      reply.badRequest("Password is not correct.");
      return;
    }

    const token = request.server.jwt.sign({ id: user?.id });

    return { token, email, role: user.role };
  } catch (e) {
    console.log(e);
  }
};

const getMe: RouteHandlerMethod = async (request, reply) => {
  const user = await User.findById(request.user.id);

  if (!user) {
    reply.unauthorized("Unauthenticated.");
    return;
  }

  return user;
};

export { login, getMe };
