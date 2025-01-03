import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { deleteReport } from "../data/reports.server";

export async function action({ request }: ActionFunctionArgs) {
  if (request.method !== "POST") {
    throw Response.json({ message: "Method not allowed" }, { status: 405 });
    return {};
  }
  const formData = await request.formData();
  const reportID = formData.get("reportID");
  const clientID = formData.get("clientID");

  if (!reportID) {
    throw Response.json({ message: "Method not allowed" }, { status: 405 });
  }
  if (!clientID) {
    throw Response.json({ message: "Method not allowed" }, { status: 405 });
  }
  await deleteReport(request, reportID as string);
  return redirect(`/clients/${clientID}`);
}