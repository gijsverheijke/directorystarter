import { Button } from "../ui/button";
import Link from "next/link";

export default function SubmitButton() {
  return (
    <Button variant="secondary" asChild>
      <Link href="/submit">+ Submit</Link>
    </Button>
  );
}