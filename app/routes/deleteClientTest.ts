import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { deleteClientTest } from "../data/clientTest.server";

export async function action({ request }: ActionFunctionArgs) {
  if (request.method !== "POST") {
    throw Response.json({ message: "Method not allowed" }, { status: 405 });
    return {};
  }
  const formData = await request.formData();
  const event_id = formData.get("client_id") as string;
  const client_id = await deleteClientTest(request,event_id);
  return redirect(`/clients/${client_id}`);
}