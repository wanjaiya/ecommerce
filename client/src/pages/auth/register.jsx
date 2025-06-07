import CommonForm from "@/components/common/form";
import { registerFormControls } from "@/config";
import { registerUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Cookies from "js-cookie";

const initialState = {
  username: "",
  email: "",
  password: "",
};
function AuthRegister() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onSubmit(event) {
    event.preventDefault();

    dispatch(registerUser(formData)).then((data) => {
      console.log(data);
      if (data?.payload?.success) {
        toast.success(data?.payload?.message);
        Cookies.set("email", data?.payload?.email, {
          expires: 7,
          secure: true,
        });

        navigate("/auth/account-verify");
      } else {
        toast.error(data?.payload?.message);
      }
    });

    console.log(formData);
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-cente">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Create new account
        </h1>
      </div>
      <CommonForm
        formControls={registerFormControls}
        buttonText={"Sign Up"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />

      <p className="mt-2">
        Already have an account
        <Link
          className="font-medium ml-2 text-primary hover:underline"
          to="/auth/login"
        >
          Login
        </Link>
      </p>
    </div>
  );
}

export default AuthRegister;
