import RegistrationForm from "@/components/auth/RegistrationForm";
import Logo from "@/components/common/Logo";

export default function SignUp() {
  return (
    <div className="h-full">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="mx-auto sm:w-full sm:max-w-md">
          <div className="text-center">
            <Logo />
          </div>
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto w-full max-w-lg">
          <RegistrationForm />
        </div>
      </div>
    </div>
  );
}
