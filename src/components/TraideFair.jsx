const TraideFair = () => {
  return (
    <div
      className="modal lg:w-[70%] w-[90%] mx-auto shadow-2xl py-5"
      onClick={() => (window.location = "https://Foodsbymomi.bumpa.shop/")}
    >
      <div className="flex md:flex-row flex-col-reverse w-full px-5">
        <div className="md:w-1/3 w-full flex flex-col justify-center items-center">
          {/* <div>
            <img src={LogoBg} alt="" />
          </div> */}
          <div className="flex flex-col justify-center items-center md:gap-5">
            <p>
              We are thrilled to announce that Foodsbymomi will be at the <br />
              <span className="md:text-4xl text-2xl text-primary font-bold">
                Naija Brand Chic Tradefair in London!
              </span>
              <br />
              Join us at the event, or if you can not make it,{" "}
              <span
                className="text-secondary font-bold underline text-lg"
                onClick={() =>
                  (window.location = "https://Foodsbymomi.bumpa.shop/")
                }
              >
                check out our online showcase
              </span>{" "}
              and stay connected with all the exciting updates
            </p>
          </div>
        </div>

        <div className="w-full md:w-2/3 flex items-center justify-center">
          <img
            src="https://res.cloudinary.com/dkmddgqsl/image/upload/v1723362106/London_tradefair_hsfuli.jpg"
            alt="trade_fair banner"
            className="w-[90%]"
          />
        </div>
      </div>
    </div>
  );
};

export default TraideFair;
