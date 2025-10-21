// app/login/page.tsx
import { redirect } from "next/navigation";

export default function Page() {
  // redireciona imediatamente para /entrar
  redirect("/entrar");
}
