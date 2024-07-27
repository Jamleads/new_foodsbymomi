import { LocationIcon } from "../assets";

const AboutUs = () => {
  return (
    <div className="lg:w-[70%] lg:px-0 px-5 mx-auto py-10 my-10">
      <div className="flex gap-5">
        <img src={LocationIcon} alt="" />
        <h1 className=" text-xl font-semibold text-primary">
          FoodsbyMomi Ltd 128, City Road London Ec1v2nx +44 20 8133
        </h1>
      </div>

      <p className="my-5 font-light text-xl text-[#000] leading-10">
        Food By Momi is an African Food Shop based London. We specialise in the
        sale and distribution of wholesale and retail African and Caribbean food
        products. We sell both online and in-store. Our online African food shop
        also offers a next day UK wide delivery service{" "}
        <span className="text-secondary hover:text-primary font-bold">
          See our delivery information
        </span>
      </p>

      <div className="flex gap-5">
        <img src={LocationIcon} alt="" />
        <h1 className=" text-xl font-semibold text-primary">
          Ltd No 2, Adenuga Street Off Williams Estate, Surulere Lagos, Nigeria
          +234-909 011 0000
        </h1>
      </div>

      <p className="my-5 font-light text-xl text-[#000] leading-10">
        Food By Momi is an African Food Shop based London. We specialise in the
        sale and distribution of wholesale and retail African and Caribbean food
        products. We sell both online and in-store. Our online African food shop
        also offers a next day UK wide delivery service{" "}
        <span className="text-secondary hover:text-primary font-bold">
          See our delivery information
        </span>
      </p>

      <div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.2352461489595!2d-0.09354020929642338!3d51.52724493659661!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761d64c8d91b11%3A0x8fd10f948b8c6ef5!2s128%20City%20Rd%2C%20London%20EC1V%202NX%2C%20UK!5e0!3m2!1sen!2sng!4v1705584986534!5m2!1sen!2sng"
          className="w-full h-[250px]"
        ></iframe>
      </div>
    </div>
  );
};

export default AboutUs;
