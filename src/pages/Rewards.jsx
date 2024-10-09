import { useEffect } from "react";
import Accordion from "../components/Accorion";
import { useGetReferralQuery, useGetVoucherQuery } from "../services/profile";
import { PiCopySimple } from "react-icons/pi";
import { handleCopy } from "../utilities/otherFunction";
import { useSelector } from "react-redux";
const Rewards = () => {
  const accordionItems = [
    {
      title: "Referral",
      content:
        "For each friend you invite, You will earn percentage on every order made by your friend",
    },
    {
      title: "Discount codd",
      content:
        "Get upto 90% discount off your order when you use our random discount code",
    },
  ];

  const { data } = useGetReferralQuery();
  const { data: voucher, isLoading } = useGetVoucherQuery();
  const referralCode = useSelector((state) => state?.auth?.user?.referralCode);

  return (
    <div className="lg:w-[70%] lg:px-0 px-5 mx-auto py-10">
      <div className="flex flex-col gap-5">
        <h1 className=" text-primary text-xl font-bold">Foodsbymomi Rewards</h1>

        <Accordion items={accordionItems} />

        <p className="font-light text-xl text-[#000] leading-10">
          Get rewarded when you refer your frined to Foodsbymomi, copy your
          referal code bellow
        </p>
        <div className="border-[1px] border-secondary  rounded-lg flex items-center justify-between py-1 px-2">
          <p className=" text-theGray2 account_id">{referralCode}</p>
          <button
            onClick={() => handleCopy("account_id")}
            className="px-2 font-bold py-1 rounded-md text-white bg-primary flex items-center gap-3"
          >
            <PiCopySimple /> Copy
          </button>
        </div>
        <p>Total friends reffered: {data?.data?.referrals?.length ?? 0}</p>
      </div>
    </div>
  );
};

export default Rewards;
