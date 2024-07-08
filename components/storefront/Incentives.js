import {
  HiGift,
  HiOutlineCubeTransparent,
  HiOutlineLockClosed,
  HiOutlineTruck,
} from "react-icons/hi2";

const incentives = [
  {
    name: "Secured Payments",
    icon: <HiOutlineLockClosed className="w-12 h-12 " />,
    desc: "Shop with confidence knowing your transactions are safe and secure.",
  },
  {
    name: "Fast Delivery",
    icon: <HiOutlineTruck className="w-12 h-12" />,
    desc: "Swift and reliable shipping to ensure your gifts arrive right on time.",
  },
  {
    name: "Send Gifts Easily",
    icon: <HiGift className="w-12 h-12" />,
    desc: "Effortless sending with our user-friendly platform and hassle-free process.",
  },
  {
    name: "High Quality Products",
    icon: <HiOutlineCubeTransparent className="w-12 h-12" />,
    desc: "Immerse in premium craftsmanship and excellence in every product.",
  },
];

export default function Incentives() {
  return (
    <section className="pb-12 pt-20 ">
      <div className="flex flex-col container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto mb-12 max-w-[510px] text-center lg:mb-20">
              <h2 className="mb-3 text-3xl font-bold leading-[1.2] text-dark dark:text-white sm:text-4xl md:text-[40px]">
                Why Choose us?
              </h2>
            </div>
          </div>
        </div>

        <div className="mx-auto grid grid-cols-1 sm:grid-cols-2  gap-x-4 gap-y-8">
          {incentives.map((incentive, index) => (
            <div key={index} className="flex flex-grow w-full max-w-sm px-4 ">
              <div className="flex flex-col gap-y-6 rounded-md shadow-md bg-white p-6   md:px-7 ">
                <span className="mx-auto text-primary">{incentive.icon}</span>
                <div className="flex flex-col gap-y-2">
                  <h4 className="text-lg font-semibold">{incentive.name}</h4>
                  <p className="text-sm text-slate-500">{incentive.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
