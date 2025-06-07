import React, { useEffect } from "react";
import { Button } from "../../components/ui/button";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { verifyAccount, sendCode } from "@/store/auth-slice";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function EmailVerify() {
  const inputRefs = React.useRef([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const email = Cookies.get("email");

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text");
    const pasteArray = paste.split("").slice(0, 6);
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };
  function onSubmit(event) {
    event.preventDefault();
    const otpArray = inputRefs.current.map((e) => e.value);
    const otp = otpArray.join("");
    const formData = {
      otp: otp,
      email: email,
    };

    dispatch(verifyAccount(formData)).then((data) => {
      console.log(data);
      if (data?.payload?.success) {
        toast.success(data?.payload?.message);
        Cookies.remove("email");
        navigate("/auth/login");
      } else {
        toast.error(data?.payload?.message);
      }
    });
  }

  function sendVerificationOpt() {
    const formData = {
      email: email,
    };
    dispatch(sendCode(formData)).then((data) => {
      console.log(data);
      if (data?.payload?.success) {
        toast.success(data?.payload?.message);
        Cookies.remove("email");
      } else {
        toast.error(data?.payload?.message);
      }
    });
  }

  useEffect(() => {
    if (!email) {
      navigate("/auth/register");
    }
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen sm:px-0 w-96">
      <form className=" p-8 rounded-lg  w-full text-sm" onSubmit={onSubmit}>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Email verify OTP
        </h1>
        <p className="font-bold tracking-tight text-foreground mb-6">
          Enter the 6-digit code sent to your email
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
          Verify Email
        </Button>
      </form>
      <div>
        <p className="mt-2">
          Click{" "}
          <button
            onClick={sendVerificationOpt}
            className="font-bold text-indigo-500 cursor-pointer"
          >
            {" "}
            here
          </button>{" "}
          to request a fresh activation code.
        </p>
      </div>
    </div>
  );
}

export default EmailVerify;
