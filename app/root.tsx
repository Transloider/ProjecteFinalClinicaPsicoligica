import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
  isRouteErrorResponse,
  Link,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

import "./tailwind.css";

export const links: LinksFunction = () => {
  return [
    {
      rel: "preconnect",
      href: "https://fonts.googleapis.com",
    },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossOrigin: "anonymous",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;700&display=swap",
    },
    {
      rel: "stylesheet",
      href:"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
    }
  ];
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen bg-slate-700 text-gray-200">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  let title = "S'ha produït un error";
  let message = "Alguna cosa ha anat malament. Si us plau, torna-ho a intentar més tard.";

  if (isRouteErrorResponse(error)) {
    title = error.statusText;
    message = error.data?.message || message;
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <Layout>
      <main className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
        <h1 className="mb-4 text-4xl font-bold text-gray-100">{title}</h1>
        <p className="mb-6 text-lg text-gray-400">{message}</p>
        <Link
          to="/"
          className="rounded bg-gray-800 px-4 py-2 font-medium text-gray-200 hover:bg-gray-700"
        >
          Back to safety
        </Link>
      </main>
    </Layout>
  );
}

export default function App() {
  return <Outlet />;
}
