import { LoaderFunction, redirect } from "remix";

export const loader: LoaderFunction = async () => {
  return redirect("decimals");
};

export default function HomePage() {
  return <div>Redirect to decimals...</div>;
}
