import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { LoginForm } from "./login-form";

export function LoginCard() {
  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="space-y-2 text-center">
        <CardTitle className="text-2xl font-bold">
          ERP Bibit Net
        </CardTitle>

        <CardDescription>
          Sign in to continue to your account.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <LoginForm />
      </CardContent>
    </Card>
  );
}