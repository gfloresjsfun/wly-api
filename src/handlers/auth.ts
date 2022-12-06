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

const loginWithGoogle: RouteHandlerMethod = async (request, reply) => {
  const { providerId } = request.body as { providerId: string };

  try {
    const user = await User.findOne({ provider: "google", providerId });

    if (!user) {
      reply.badRequest("You are not registered.");
      return;
    }

    const token = request.server.jwt.sign({ id: user?.id });

    return { token, email: user.email, role: user.role };
  } catch (e) {
    console.log(e);
  }
};

const registerWithGoogle: RouteHandlerMethod = async (request, reply) => {
  const { providerId, email, name } = request.body as {
    providerId: string;
    email: string;
    name: string;
  };

  try {
    let user = await User.findOne({ provider: "google", providerId });

    if (!user) {
      user = new User({ email, name, provider: "google", providerId });
      await user.save();
    }

    const token = request.server.jwt.sign({ id: user?.id });

    return { token, email: user.email, role: user.role };
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

export { login, loginWithGoogle, registerWithGoogle, getMe };
