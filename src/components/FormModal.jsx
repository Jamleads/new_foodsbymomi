import { useState } from "react";
import { LogoBg, waitlistBanner } from "../assets";
import { useJoinWaitlistMutation } from "../services/waitlist";
import { validateForm } from "../utilities/validateForm";
import { errorToast, successToast } from "../utilities/ToastMessage";
import BarsLoader from "../utilities/BarsLoader";
import { useNavigate } from "react-router-dom";

const FormModal = () => {
  const navigate = useNavigate();
  const [joinWaitlist] = useJoinWaitlistMutation();
  const [isLoading, setIsLoading] = useState(false);
  const [waitlist, setWaitlist] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
    heard_about_us: "",
  });
  const handleChnage = (e) => {
    const { id, value } = e.target;
    setWaitlist({ ...waitlist, [id]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (!validateForm(waitlist)) {
      errorToast("All fields are required");
    } else {
      setIsLoading(true);
      try {
        await joinWaitlist(waitlist).unwrap();
        successToast("You have joined waitlist");
        setIsLoading(false);
        navigate("/shop");
      } catch (error) {
        errorToast(error?.message);
      }
    }
  };

  return (
    <div className="md:flex md:h-[90vh]">
      <div className="md:w-3/5 w-full h-full">
        <img
          src={waitlistBanner}
          alt="waitlistBanner"
          className="w-full h-full"
        />
      </div>

      <div className="md:w-2/5 w-full flex items-center justify-center">
        <div className="relative md:w-[80%] w-[90%] mx-auto md:py-10 py-5">
          <div className="brand">
            <img src={LogoBg} alt="" className="w-[100px] mx-auto" />
          </div>

          <div className="text-center">
            <h1 className="font-showcase !md:text-2xl !text-base">
              You’re one step to be the first to try It
            </h1>
            <p className="inter-small !text-xs !font-lighter">
              Please enter your details.
            </p>
          </div>

          <form
            action=""
            method="POST"
            className="flex flex-col md:gap-5 gap-3"
          >
            <div className="">
              <label htmlFor="name">Name</label> <br />
              <input
                required
                type="text"
                name="name"
                id="name"
                onChange={(e) => handleChnage(e)}
                placeholder="Enter your name"
                className="px-5 py-2 md:mt-3 mt-1 bg-transparent border-[1px] border-black w-full"
              />
            </div>
            <div className="">
              <label htmlFor="phone_number">Phone Number</label> <br />
              <input
                required
                type="tel"
                name="phone"
                id="phone"
                onChange={(e) => handleChnage(e)}
                placeholder="Enter your phone pumber"
                className="px-5 py-2 md:mt-3 mt-1 bg-transparent border-[1px] border-black w-full"
              />
            </div>
            <div className="">
              <label htmlFor="email">Email</label> <br />
              <input
                required
                type="email"
                id="email"
                name="email"
                onChange={(e) => handleChnage(e)}
                placeholder="Enter your email"
                className="px-5 py-2 md:mt-3 mt-1 bg-transparent border-[1px] border-black w-full"
              />
            </div>
            <div className="">
              <label htmlFor="location">Where are you located?</label> <br />
              <select
                name="location"
                id="location"
                onChange={(e) => handleChnage(e)}
                className="px-5 py-2 md:mt-3 mt-1 bg-transparent border-[1px] border-black w-full"
              >
                <option value="" className="text-red">
                  Select option
                </option>
                {/* TODO: TRY GET LOCATION BASE ON THE COUNTRY MARKET WE ARE */}
                <option value="nigeria">Nigeria</option>
                <option value="unitesd state">United State</option>
                <option value="kenya">United Kingdom</option>
                <option value="gambia">Gambia</option>
                <option value="gambia">Other</option>
              </select>
            </div>

            <div className="">
              <label htmlFor="location">
                How did you hear about FoodsByMomi?
              </label>
              <br />
              <select
                name="heard_about_us"
                id="heard_about_us"
                onChange={(e) => handleChnage(e)}
                className="px-5 py-2 md:mt-3 mt-1 bg-transparent border-[1px] border-black w-full"
              >
                <option value="" className="font-lighter">
                  Select option
                </option>
                <option value="friend">Friend</option>
                <option value="news">News</option>
                <option value="social">Social Media</option>
                <option value="event">Event</option>
              </select>
            </div>

            <div className="text-center">
              <button
                disabled={isLoading}
                className={`px-8 py-3 text-white ${
                  isLoading ? "bg-[#aca9a9]" : "bg-primary"
                }`}
                onClick={submitForm}
              >
                {isLoading ? (
                  <BarsLoader height={20} color={"#354231"} />
                ) : (
                  "Join waitlist"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormModal;
