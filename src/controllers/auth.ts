import { RouteHandlerMethod } from "fastify";
import User from "../models/User";

const login: RouteHandlerMethod = async (request, reply) => {
  const { username, password } = request.body as {
    username: string;
    password: string;
  };

  try {
    const user = await User.findOne({ username, password });

    const token = request.server.jwt.sign({ userId: user?.id });

    return { token };
  } catch (e) {
    console.log(e);
  }
};

export { login };
