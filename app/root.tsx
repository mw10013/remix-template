import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import tailwindStylesheetUrl from "./styles/tailwind.css";

// export type ContextType = {};

// export const loader = (async () => {
//   return json({
//     data: "data",
//   });
// }) satisfies LoaderFunction;

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: tailwindStylesheetUrl }];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Remix Template",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  // const context: ContextType = {};

  // <div> with min-h-full help register layout correctly.
  // Mimics nextjs: #__next { min-height: 100%; }
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <div className="min-h-full">
          {/* <Outlet context={context} /> */}
          <Outlet />
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
