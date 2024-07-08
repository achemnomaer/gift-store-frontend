import Logo from "@/components/common/Logo";
import Link from "next/link";
import { FaFacebookSquare, FaGithubSquare, FaLinkedin } from "react-icons/fa";
import FooterColumns from "./FooterColumns";

export default function Footer() {
  return (
    <footer className="flex bg-gray-900 mt-10">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8 ">
        <div className="flex flex-col gap-y-8 md:flex-row md:justify-between md:gap-x-8">
          {/* Brand logo */}
          <div className="mb-6 md:mb-0 md:w-1/4 ">
            <Link href="/" className="flex items-center">
              <Logo />
            </Link>
            <p className="text-slate-300">
              Unleash the Stem of Surprise - Where Gifting Embodies Infinite
              Possibilities!
            </p>
          </div>
          {/* Footer Column */}
          <div className="md:w-3/4 ">
            <FooterColumns />
          </div>
        </div>
        <hr className="my-6  sm:mx-auto  border-gray-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm  sm:text-center  text-gray-400">
            © 2024 Achem Habib Nomaer. All Rights Reserved.
          </span>
          <div className="flex mt-4 sm:justify-center sm:mt-0">
            <Link
              href="https://www.facebook.com/achem.habibnomaer?mibextid=ZbWKwL"
              className="text-gray-400  hover:text-white"
            >
              <FaFacebookSquare />
            </Link>
            <Link
              href="https://www.linkedin.com/in/achem-habib-62865b17a"
              className=" text-gray-400  hover:text-white ms-5"
            >
              <FaLinkedin />
            </Link>
            <Link
              href="https://github.com/achemnomaer"
              className="text-gray-400  hover:text-white ms-5"
            >
              <FaGithubSquare />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
