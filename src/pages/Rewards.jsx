import Accordion from "../components/Accorion";
const Rewards = () => {
  const accordionItems = [
    {
      title: "Loyalty Points",
      to: "#",
      linkText: "YOUR POINTS",
      content:
        "Loyalty points are redeemable points earned on each product purchased. Click to view or redeem",
    },
    {
      title: "Store Credit",
      to: "#",
      linkText: "STORE CREDIT",
      content:
        "Store credits are given to individual as a reward for missing  or spoiled items instead of refund. Click to view your  ",
    },
    {
      title: "Referral",
      to: "#",
      linkText: "REFERRAL CODE",
      content:
        "For each friend you invite, we will send you a 5% off coupon code you can use to purchase or get a discount on any product on our site. Click to view and share your",
    },
    {
      title: "Gift Card",
      to: "#",
      linkText: "BALANCE",
      content:
        "Gift card contains coupon code(s) can be used to order an item on our store.  Click to view your Gift Card",
    },
  ];

  return (
    <div className="lg:w-[70%] lg:px-0 px-5 mx-auto py-10">
      <div>
        <h1 className=" text-primary text-xl font-bold">
          Food By Momi Rewards
        </h1>
        <p className="my-5 font-light text-xl text-[#000] leading-10">
          Get rewarded for shoping on Food By Momi, below are various categories
          of rewards available for new and existing customers.
        </p>
      </div>
      <Accordion items={accordionItems} />
    </div>
  );
};

export default Rewards;
