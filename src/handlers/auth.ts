import { RouteHandlerMethod } from "fastify";
import mongoose from "mongoose";
import User from "@models/User";
import { ActivityLevel, Interest } from "@wly/types";

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

    return { token, email };
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

    return { token, email: user.email };
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

    return { token, email: user.email };
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

const patchMe: RouteHandlerMethod = async (request, reply) => {
  const user = await User.findById(request.user.id);
  if (!user) {
    reply.unauthorized("Unauthenticated.");
    return;
  }

  const { birthdate, activityLevel, interest, painPoints } = request.body as {
    birthdate: string;
    activityLevel: ActivityLevel;
    interest: Interest;
    painPoints: mongoose.Types.ObjectId[];
  };

  if (birthdate) user.birthdate = birthdate;
  if (activityLevel) user.activityLevel = activityLevel;
  if (interest) user.interest = interest;
  if (painPoints) user.painPoints = painPoints;

  await user.save();

  return user;
};

export { login, loginWithGoogle, registerWithGoogle, getMe, patchMe };
