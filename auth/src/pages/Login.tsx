import React, { useEffect, useState, useCallback } from "react";
import BtnLoading from "../helper/BtnLoading";
import { BsDashLg } from "react-icons/bs";
import LoginSlider from "../components/LoginSlider";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import authReducer, {
  InitialStateProp,
  login,
} from "../features/auth/authSlice";
import { StandaloneRootState } from "../main";

const Button = React.lazy(() => import("component/Button"));
const Input = React.lazy(() => import("component/Input"));
const Card = React.lazy(() => import("component/Card"));

import { RootState as ContainerRootState } from "container/store";
import { getUserFromLocalStorage } from "../helper/localstorage";
import { deCrypter } from "../helper/encrypt";

interface RootState {
  auth: InitialStateProp;
}

interface LoginProps {
  onNavigate?: (path: string) => void;
}

const Login: React.FC<LoginProps> = ({ onNavigate }) => {
  const [usrStatus, setUsrStatus] = useState<any>(null);
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const updateUserStatus = useCallback(() => {
    const localUsr = getUserFromLocalStorage();
    setUsrStatus((prevStatus: any | null) =>
      JSON.stringify(prevStatus) !== JSON.stringify(localUsr)
        ? localUsr
        : prevStatus
    );
  }, []);

  useEffect(() => {
    updateUserStatus();
  }, []);

  const [formData, setFormData] = useState({
    UserName: "",
    Password: "",
    OneToken: "",
    SwitchOneToken: import.meta.env.VITE_ONETOKEN_ENV ?? "LocaLOneToken",
  });

  const { userData, errorMessage, isLoading, loginStatus } = useSelector(
    (state: RootState | StandaloneRootState) => ({
      userData: state.auth?.userData ?? null,
      errorMessage: state.auth?.errorMessage ?? "",
      isLoading: state.auth?.isLoading ?? false,
      loginStatus: state.auth?.loginStatus ?? "idle",
    })
  );

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const isFormValid =
    formData.UserName && formData.Password && formData.OneToken;

  const handleLogin = useCallback(async () => {
    if (isFormValid) {
      try {
        const response = await dispatch(login(formData));
        const loginSuccesRes = await response?.payload;

        if (loginSuccesRes?.IsSuccess) {
          toast.success(
            loginSuccesRes?.ResponseDescription ||
              "Login Successful, Redirecting!!!"
          );
        } else {
          const decryptedRes = deCrypter(response?.payload?.response?.data);
          toast.error(decryptedRes?.ErrorMessage || "Login failed!");
        }
      } catch (error) {
        toast.error("Login failed!");
      }
    } else {
      toast.error("Please fill in all fields!");
    }
  }, [formData, dispatch, errorMessage, isFormValid]);

  useEffect(() => {
    if (loginStatus === "fulfilled" || "failed") {
      const timeoutId = setTimeout(() => {
        window.parent.postMessage(
          {
            type: "auth-mfe-navigation",
            path: "/dashboard/home",
          },
          "*"
        );
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, [loginStatus, usrStatus, navigate]);

  return (
    <div className="flex">
      <div className="w-[40%] bg-authBackground flex items-start justify-items-center h-screen bg-cover bg-no-repeat bg-center">
        {" "}
      </div>
      <div className="w-[60%] flex flex-col justify-center items-center ">
        <React.Suspense fallback={<div>Loading...</div>}>
          <Card className="!w-[440px] !h-[460px] space-y-4 !p-4">
            <div className="flex justify-center w-full">
              <BsDashLg className="w-[100px] h-[30px] text-[#E1E1E1]" />
            </div>
            <div>
              <p className="text-[#303030] text-[28px] font-bold">
                Welcome Back
              </p>
              <p className="text-[#000000] text-[16px]">
                Enter your login details to continue
              </p>
            </div>
            <Input
              label="Username"
              className="w-[100%] "
              id="username"
              type="text"
              placeholder="Enter here"
              variant="filled"
              name="UserName"
              onChange={handleChange}
            />
            <Input
              label="Password"
              className="w-[100%] "
              id="password"
              type="password"
              placeholder="Password"
              variant="filled"
              name="Password"
              onChange={handleChange}
            />
            <Input
              label="One Token"
              className="w-[100%] "
              id="otp"
              type="number"
              placeholder="Enter OTP"
              variant="filled"
              name="OneToken"
              onChange={handleChange}
            />
            <Button
              onClick={handleLogin}
              variant="primary"
              size="small"
              disabled={!isFormValid || loginStatus === "pending"}
              className={`w-[100%] text-[14px] !text-[#ffffff] border border-[#ADB5BD] flex items-center justify-center space-x-3 ${
                !isFormValid || loginStatus === "pending"
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              {loginStatus === "pending" ? "Loading..." : "Login"}
            </Button>
          </Card>
        </React.Suspense>
      </div>
    </div>
  );
};

export default React.memo(Login);
