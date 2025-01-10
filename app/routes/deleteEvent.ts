import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { deleteEvent } from "../data/calendar.server";

export async function action({ request }: ActionFunctionArgs) {
  if (request.method !== "POST") {
    throw Response.json({ message: "Method not allowed" }, { status: 405 });
    return {};
  }
  const formData = await request.formData();
  const event_id = formData.get("event_id") as string;
  await deleteEvent(request,event_id);
  return redirect(`/calendar`);
}