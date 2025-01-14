import type { ActionFunctionArgs } from "@remix-run/node";
import { destroyClientSession } from "../data/auth.server";
export async function action({ request }: ActionFunctionArgs) {
  if (request.method !== "POST") {
    throw Response.json({ message: "Method not allowed" }, { status: 405 });
  }
  return destroyClientSession(request);
}