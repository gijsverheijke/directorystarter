import { Button } from "../ui/button";

export default function SubmitButton() {
  return (
    <Button variant="secondary" asChild>
      <a href="/submit">+ Submit</a>
    </Button>
  );
}