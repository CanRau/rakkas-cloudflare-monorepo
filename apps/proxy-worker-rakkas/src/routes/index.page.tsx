import { useClientSession } from "@konduktum/ui";

export default function HomePage() {
  const session = useClientSession();

  return (
    <main>
      <h1>Hello world!</h1>
    </main>
  );
}
