"use client";

import { useState } from "react";
import Error from "@/components/error/Error";
import Loading from "@/components/loading/Loading";
import { IconEyeVisibility, IconEyeVisibilityOff } from "@/components/icons";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/router";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { toastAtom } from "@/global-state/toast.atom";
import { useSetRecoilState } from "@/libs/recoil";

export default function LoginWithPhoneNumber() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [disabledButton, setDisabledButton] = useState(false);
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { login } = useAuth();
  const setToast = useSetRecoilState(toastAtom);
  const handleNumberChange = (value: string) => {
    setMobile(value);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleLogin = async () => {
    if (!mobile || !password) {
      setToast({
        showToast: true,
        toastObj: {
          type: "warning",
          description: "Please fill all fields",
        },
      });
      return;
    }

    setLoading(true);
    setHasError(false);
    const cleanMobile = mobile.replace(/\s+/g, "");

    try {
      await login({
        to: cleanMobile,
        password,
      });
      setDisabledButton(true);
      setToast({
        showToast: true,
        toastObj: {
          type: "success",
          description: "Successfully logged in",
        },
      });
      router.push("/");
    } catch (error: any) {
      setHasError(true);
      setErrorMessage(error);
    } finally {
      setLoading(false);
      setDisabledButton(false);
    }
  };

  return (
    <form>
      <div className="form-group">
        <label className="form-label" htmlFor="mobile">
          Mobile Number
        </label>
        <PhoneInput
          country={"ng"}
          value={mobile}
          onChange={handleNumberChange}
          inputClass="form-input"
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <div className="relative">
          <input
            type={isPasswordVisible ? "text" : "password"}
            id="password"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />

          <div
            className="w-6 absolute top-1/2 -translate-y-1/2 right-2 cursor-pointer"
            onClick={togglePasswordVisibility}
          >
            {isPasswordVisible ? (
              <IconEyeVisibility />
            ) : (
              <IconEyeVisibilityOff />
            )}
          </div>
        </div>
      </div>

      {hasError && <Error message={errorMessage} />}

      <button
        disabled={loading || disabledButton}
        onClick={(e) => {
          e.preventDefault();
          handleLogin();
        }}
        className={`action-norm action-log ${loading ? "!bg-opacity-80" : ""}`}
      >
        {loading ? <Loading /> : <span>Login</span>}
      </button>

      <p className="text-[#faa100] p-5">
        <a href="/auth/forgot-password">Forgot password?</a>
      </p>
    </form>
  );
}
