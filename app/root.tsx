import type {
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import tailwindStylesheetUrl from "./styles/tailwind.css";

export type ContextType = {};

export const loader = (async () => {
  return json({
    data: "data",
  });
}) satisfies LoaderFunction;

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: tailwindStylesheetUrl }];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Remix Template",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data } = useLoaderData<typeof loader>();
  const context: ContextType = {};

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet context={context} />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
