import { Button } from "@/components/elements/Button";
import { ButtonProps } from "@/components/ui/button";

const LoginButton = ({ onClick }: { onClick?: ButtonProps["onClick"] }) => {
  // const handleLogin = useCallback(() => {}, []);
  return (
    <Button
      text="로그인"
      textColor="white"
      className="h-[6.2rem] w-full rounded-2xl"
      onClick={onClick}
    />
  );
};

export default LoginButton;
