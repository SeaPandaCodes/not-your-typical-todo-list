import { initTRPC } from "@trpc/server";

interface Context {
  userId: string;
}

const t = initTRPC.context<Context>().create();
export const router = t.router;
export const procedure = t.procedure;
