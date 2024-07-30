/* eslint-disable react/prop-types */
import Button from "./Button";
import { LogoBg } from "../assets";

const PopModal = ({ openForm }) => {
  return (
    <>
      <div className="modal lg:w-[70%] w-[90%] mx-auto shadow-2xl">
        <div className="relative md:px-20 p-5 md:py-10 text-center">
          <div className="flex items-center justify-center">
            <img src={LogoBg} alt="" className=" w-[200px]" />
          </div>
          <div className="content flex flex-col gap-5">
            <p className="md:text-base text-xs">
              Get ready for an exciting culinary journey! FoodsByMomi is
              thrilled to introduce you to the vibrant and diverse flavors of
              African cuisine. Our brand-new line of delicious products is
              launching soon, bringing you authentic tastes straight from the
              heart of Africa.{" "}
              <span className="text-secondary underline">
                <a
                  href="https://drive.google.com/file/d/1vJP6W-uHQ8DGw9hI3nO-tex_fZrRe5Nl/view?usp=sharing"
                  target="_blank"
                >
                  View brand product
                </a>
              </span>
            </p>

            <p className="md:text-base text-xs">
              We are looking for passionate partners to join us on this
              flavorful adventure. If you are interested in becoming a
              distributor to all African foods shop in USA, Canada, Europe and
              uk, please reach out to us at{" "}
              <span className="text-secondary underline">
                <a href="mailto: hello@foodsbymomi.com" target="_blank">
                  hello@foodsbymomi.com.
                </a>
              </span>{" "}
              Join our waitlist to be the first to hear about our product
              launch!{" "}
              <button onClick={openForm} className="text-secondary underline">
                Join waitlist
              </button>
            </p>

            <p className="md:text-base text-xs">
              Stay connected with us on social media to be the first to know
              about our launch and to explore more about African cuisine. Join
              us as we celebrate culture, community, and the joy of food!{" "}
              <span className="text-secondary underline">
                <a
                  href="https://www.instagram.com/foodsbymomi?igsh=bmMxbGxvMTV6OWN1"
                  target="_blank"
                >
                  Instagram
                </a>
              </span>
              {", "}
              <span className="text-secondary underline">
                <a href="https://whatsapp.com/+447376368788" target="_blank">
                  WhatsApp
                </a>
              </span>
            </p>

            <div>
              <Button
                btnText={"Join waitlist"}
                btnStyle={"bg-primary text-white"}
                btnClick={openForm}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PopModal;
