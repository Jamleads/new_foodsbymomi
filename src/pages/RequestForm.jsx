import Button from "../components/Button";

const RequestForm = () => {
  return (
    <div className="lg:w-[70%] mx-auto my-10">
      <form className="lg:w-[70%] mx-auto p-5 flex flex-col gap-5 shadow-2xl">
        <div>
          <label htmlFor="product_name">Product Name</label> <br />
          <input
            type="text"
            placeholder="Enter product name"
            className="bg-transparent border-primary border-2 px-2 py-1 w-full"
          />
        </div>
        <div>
          <label htmlFor="product_img">Upload Product img (optional)</label>{" "}
          <br />
          <input
            type="file"
            className="bg-transparent border-primary border-2 px-2 py-1 w-full"
          />
        </div>
        <div>
          <label htmlFor="description">Product Description</label> <br />
          <textarea
            name="description"
            id="description"
            className="bg-transparent border-primary border-2 px-2 py-1 w-full h-[250px]"
          ></textarea>
        </div>

        <Button
          btnClick={() => {}}
          btnText={"Submit"}
          btnStyle={"bg-primary text-white font-bold"}
        />
      </form>
    </div>
  );
};

export default RequestForm;
