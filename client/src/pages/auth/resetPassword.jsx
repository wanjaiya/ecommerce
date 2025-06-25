import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "../../components/ui/button";
import { resetEmailFormControls, resetPasswordFormControls } from "@/config";
import CommonForm from "@/components/common/form";
import { useDispatch } from "react-redux";
import { passwordOtp, resetPassword } from "@/store/auth-slice";

const initialState = {
  email: "",
};
const initialStatePassword = {
  password: "",
};
function ResetPassword() {
  const [formData, setFormData] = useState(initialState);
  const [formDataPassword, setFormDataPassword] =
    useState(initialStatePassword);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [isEmailSent, setIsEmailSent] = useState(false);
  const [otp, setOtp] = useState(0);
  const [isOtpSubmited, setIsOtpSubmited] = useState(false);

  const inputRefs = React.useRef([]);

  // function to handle moving to next input field without having to move the cursor

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  //  function to handle delete using backspace
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  //function to handle paste the otp from clipboard
  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text");
    const pasteArray = paste.split("").slice(0, 6);
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };

  // function to handle the submit of the email to send the reset otp

  const onSubmitEmail = async (e) => {
    e.preventDefault();
    setEmail(formData.email);
    dispatch(passwordOtp(formData)).then((data) => {
      if (data?.payload?.success) {
        setIsEmailSent(true);
        toast.success(data?.payload?.message);
      } else {
        toast.success(data?.payload?.message);
      }
    });
  };

  // function to handle the submit of the otp to verify it

  const onSubmitOtp = async (e) => {
    e.preventDefault();
    const otpValue = inputRefs.current.map((input) => input.value);
    setOtp(otpValue.join(""));
    setIsOtpSubmited(true);
  };

  // function to handle the submit of the new password
  const onSubmitNewPassword = async (e) => {
    e.preventDefault();
    const formData = {
      email: email,
      otp: otp,
      newPassword: formDataPassword.password,
    };
    dispatch(resetPassword(formData)).then((data) => {
      if (data?.payload?.success) {
        setIsEmailSent(true);
        toast.success(data?.payload?.message);
        navigate("/auth/login");
      } else {
        toast.success(data?.payload?.message);
      }
    });
  };

  // function to handle the resend otp button
  const handleResendOtp = async () => {};

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-96">
      {/* form to enter email address */}
      {!isEmailSent && (
        <div className="w-full">
          <h1 className="text-2xl font-semibold text-center mb-4">
            Reset Password
          </h1>
          <p className="text-center mb-6 ">
            Enter your registered email address{" "}
          </p>

          <CommonForm
            formControls={resetEmailFormControls}
            buttonText={"Submit"}
            formData={formData}
            setFormData={setFormData}
            onSubmit={onSubmitEmail}
          />
        </div>
      )}

      {/* form to enter otp */}

      {isEmailSent && !isOtpSubmited && (
        <form onSubmit={onSubmitOtp} className=" p-8 rounded-lg  w-96 text-sm">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Reset Password OTP
          </h1>
          <p className="font-bold tracking-tight text-foreground mb-6">
            Enter the 6-digit code sent to your email{" "}
          </p>

          <div className="flex justify-between mb-8" onPaste={handlePaste}>
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  required
                  className="w-12 h-12 bg-[#333A5C] text-center text-2xl rounded-md text-white"
                  ref={(e) => (inputRefs.current[index] = e)}
                  onInput={(e) => handleInput(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                />
              ))}
          </div>
          <Button type="submit" className="mt-2 w-full">
            Submit
          </Button>

          {/* <p
            className="mt-2 w-full py-2.5 bg-gradient-to-r from-red-500 to-red-900 text-white text-center rounded-full cursor-pointer"
            onClick={handleResendOtp}
          >
            Resend OTP
          </p> */}
        </form>
      )}

      {/* form to enter new password */}

      {isOtpSubmited && isEmailSent && (
        <div className="w-full">
          <h1 className="text-2xl font-semibold text-center mb-4">
            New Password
          </h1>
          <p className="text-center mb-6 ">Enter the new password below </p>

          <CommonForm
            formControls={resetPasswordFormControls}
            buttonText={"Submit"}
            formData={formDataPassword}
            setFormData={setFormDataPassword}
            onSubmit={onSubmitNewPassword}
          />
        </div>
      )}
    </div>
  );
}

export default ResetPassword;
