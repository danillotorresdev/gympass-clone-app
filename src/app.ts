import fastify from "fastify";
import { PrismaClient } from "@prisma/client";

export const app = fastify();

const prisma = new PrismaClient();

prisma.user.create({
  data: {
    name: "Danillo",
    email: "danilloept@gmail.com",
  }
})

// ORM - Object Relational Mapping
// É uma forma de mapear os dados do banco de dados para objetos.