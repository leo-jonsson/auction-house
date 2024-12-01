import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoginForm from "@/components/ui/LoginForm";

const LoginPage = () => {
  return (
    <section className="sm:p-0 px-2 flex flex-col items-center justify-center min-h-[80vh]">
      <h1 className="sr-only">LOGIN PAGE</h1>
      <Card className="max-w-[25rem] px-1 w-full grid">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </section>
  );
};

export default LoginPage;
