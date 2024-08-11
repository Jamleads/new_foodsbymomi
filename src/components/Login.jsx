import { useState } from "react";
import { useLoginMutation, useSignUpMutation } from "../services/auth";
import { errorToast, successToast } from "../utilities/ToastMessage";
import { setAuthFormOpen, setToken, setUser } from "../features/AuthSlice";
import BarsLoader from "../utilities/BarsLoader";
import { useDispatch } from "react-redux";

const theStyle = "w-full px-5 py-2 border-secondary border-2";

const Login = () => {
  const dispatch = useDispatch();
  const [login] = useLoginMutation();
  const [signUp] = useSignUpMutation();
  const [forPassword, setForPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasAnAcc, setHasAnAcc] = useState(true);
  const [formstate, setFormstate] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    referralCode: "",
  });

  const handleChnage = (e) => {
    const { id, value } = e.target;
    setFormstate({ ...formstate, [id]: value });
  };
  const actionAfterAuth = (res) => {
    localStorage.setItem("token", JSON.stringify(res?.token));
    localStorage.setItem("user", JSON.stringify(res?.data));
    dispatch(setToken(res?.token));
    dispatch(setUser(res?.data));
    dispatch(setAuthFormOpen(false));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await signUp(formstate).unwrap();
      actionAfterAuth(res);
      successToast("Signup successful");
    } catch (error) {
      errorToast(error?.data?.message);
    }
    setIsLoading(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const payload = {
      email: formstate.email,
      password: formstate.password,
    };
    try {
      setIsLoading(true);
      const res = await login(payload).unwrap();
      actionAfterAuth(res);
      successToast("Welcome back");
    } catch (error) {
      errorToast(error?.data?.message);
    }
    setIsLoading(false);
  };

  return (
    <div className="modal md:w-[50%] mx-auto w-[90%] p-10">
      {!forPassword ? (
        <>
          <div className="">
            <h1 className="text-center text-xl font-bold">
              {hasAnAcc ? "Login" : "Signup"}
            </h1>
          </div>
          <form action="" className="mt-5 flex flex-col gap-3">
            {!hasAnAcc && (
              <div>
                <label htmlFor="name">Full Name</label> <br />
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter your full name"
                  className={`${theStyle}`}
                  onChange={(e) => handleChnage(e)}
                />
              </div>
            )}
            <div>
              <label htmlFor="email">Email</label> <br />
              <input
                required
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email address"
                className={`${theStyle}`}
                onChange={(e) => handleChnage(e)}
              />
            </div>
            <div>
              <label htmlFor="password">Enter Password</label> <br />
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter your passworde"
                className={`${theStyle}`}
                onChange={(e) => handleChnage(e)}
              />
              {!hasAnAcc && formstate.password !== formstate.passwordConfirm ? (
                <span className=" text-red-500">password must match</span>
              ) : (
                ""
              )}
            </div>
            {!hasAnAcc && (
              <div>
                <label htmlFor="passwordConfirm">Confirm Passsword</label>{" "}
                <br />
                <input
                  type="password"
                  name="passwordConfirm"
                  id="passwordConfirm"
                  placeholder="Confirm password"
                  className={`${theStyle}`}
                  onChange={(e) => handleChnage(e)}
                />
                {!hasAnAcc &&
                formstate.password !== formstate.passwordConfirm ? (
                  <span className=" text-red-500">password must match</span>
                ) : (
                  ""
                )}
              </div>
            )}
            {!hasAnAcc ? (
              <div>
                <label htmlFor="referralCode">Referral Code (optional)</label>{" "}
                <br />
                <input
                  type="text"
                  name="referralCode"
                  id="referralCode"
                  placeholder="airElv"
                  className={`${theStyle}`}
                  onChange={(e) => handleChnage(e)}
                />
              </div>
            ) : (
              <div className="flex items-end justify-end">
                <p
                  className=" underline cursor-pointer"
                  onClick={() => setForPassword(true)}
                >
                  Forget password?
                </p>
              </div>
            )}

            <div>
              <button
                disabled={isLoading}
                onClick={hasAnAcc ? handleLogin : handleSignup}
                className={`w-full mt-5 px-5 py-2 text-white font-bold bg-primary hover:bg-secondary`}
              >
                {isLoading ? (
                  <BarsLoader height={20} color={"#fff"} />
                ) : hasAnAcc ? (
                  "Login"
                ) : (
                  "Signup"
                )}
              </button>
              {hasAnAcc ? (
                <p className=" text-center">
                  I am new here{" "}
                  <span
                    className=" text-secondary text-lg underline cursor-pointer"
                    onClick={() => setHasAnAcc(!hasAnAcc)}
                  >
                    Signup
                  </span>
                </p>
              ) : (
                <p className=" text-center">
                  I have an account already{" "}
                  <span
                    className=" text-secondary text-lg underline cursor-pointer"
                    onClick={() => setHasAnAcc(!hasAnAcc)}
                  >
                    Login
                  </span>
                </p>
              )}
            </div>
          </form>
        </>
      ) : (
        <>
          <div className="flex items-start justify-start">
            <p className="cursor-pointer" onClick={() => setForPassword(false)}>
              &larr; Back
            </p>
          </div>
          <div className="">
            <h1 className="text-center text-xl font-bold">Reset password</h1>
            <p>
              Enter your email address and we will send you a link to reset your
              password.
            </p>
          </div>

          <form
            action=""
            className="
        mt-10"
          >
            <div>
              <label htmlFor="email">Email</label> <br />
              <input
                required
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email address"
                className={`${theStyle}`}
                onChange={(e) => handleChnage(e)}
              />
            </div>

            <button
              disabled={isLoading}
              // onClick={hasAnAcc ? handleLogin : handleSignup}
              className={`w-full mt-5 px-5 py-2 text-white font-bold bg-primary hover:bg-secondary`}
            >
              {isLoading ? (
                <BarsLoader height={20} color={"#fff"} />
              ) : (
                "Reset password"
              )}
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default Login;
