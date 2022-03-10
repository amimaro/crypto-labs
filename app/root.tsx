import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "remix";
import type { MetaFunction } from "remix";
import tailwindStyles from "./styles/tailwind.css";
import globalStyles from "./styles/global.css";
import AppLayout from "./components/AppLayout";

export const meta: MetaFunction = () => {
  return { title: "Crypto Labs" };
};

export function links() {
  return [
    { rel: "stylesheet", href: tailwindStyles },
    { rel: "stylesheet", href: globalStyles },
  ];
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <AppLayout>
          <Outlet />
        </AppLayout>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
