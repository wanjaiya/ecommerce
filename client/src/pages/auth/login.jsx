import CommonForm from "@/components/common/form";
import { loginFormControls } from "@/config";
import { loginUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Cookies from "js-cookie";

const initialState = {
  email: "",
  password: "",
};
function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onSubmit(event) {
    event.preventDefault();
    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast.success(data?.payload?.message);
      } else {
        if (data?.payload?.verify) {
          Cookies.set("email", data?.payload?.email, {
            expires: 7,
            secure: true,
          });
          navigate("/auth/account-verify");
        }

        toast.success(data?.payload?.message);
      }
    });
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-cente">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Sign in to your account
        </h1>
      </div>
      <CommonForm
        formControls={loginFormControls}
        buttonText={"Sign in"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />

      <p className="mt-2">
        <Link
          className="font-medium  text-primary hover:underline"
          to="/auth/reset-password"
        >
          Forgot Password
        </Link>
      </p>

      <p>
        Don't have an account
        <Link
          className="font-medium ml-2 text-primary hover:underline"
          to="/auth/register"
        >
          Register
        </Link>
      </p>
    </div>
  );
}

export default AuthLogin;
