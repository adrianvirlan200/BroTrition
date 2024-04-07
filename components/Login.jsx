import { Input } from "@nextui-org/react";
const Login = () => {
  return (
    <section className="w-1000 mt-20 mb-20 flex flex-col content-center">
      <div className="bg-lime-200 space-y-5">
        <Input
          size={"lg"}
          className="size 100"
          type="email"
          label="Email"
          placeholder="Enter your email"
        />
        <Input
          size={"lg"}
          type="password"
          label="Password"
          placeholder="Enter your password"
        />
      </div>
    </section>
  );
};

export default Login;
