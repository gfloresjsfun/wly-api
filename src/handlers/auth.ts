import { RouteHandlerMethod } from "fastify";
import User from "@models/User";

const login: RouteHandlerMethod = async (request, reply) => {
  const { username, password } = request.body as {
    username: string;
    password: string;
  };

  try {
    const user = await User.findOne({ username });

    if (!user) {
      reply.badRequest("Username is not correct.");
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

    return { token, username, role: user.role };
  } catch (e) {
    console.log(e);
  }
};

export { login };
