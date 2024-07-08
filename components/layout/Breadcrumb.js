"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { transformSlug } from "@/lib/transformSlug";

const Breadcrumb = () => {
  const pathname = usePathname();

  const segments = pathname?.split("/").filter((segment) => segment);

  if (!(segments?.length > 0)) {
    return;
  }

  return (
    <nav className="flex mt-6 py-3">
      <ol className="inline-flex items-center space-x-1 md:space-x-3 text-sm">
        <li className="inline-flex items-center">
          <Link
            href="/"
            className="inline-flex items-center  font-medium text-primary hover:underline"
          >
            <svg
              className="w-4 h-4 mr-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
            </svg>
            Home
          </Link>
        </li>
        {segments.map((segment, index) => (
          <li key={index}>
            <div className="flex items-center">
              <svg
                className="w-3 h-3 mx-1 text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
              {index === segments.length - 1 ? (
                <span className="ml-1 font-medium text-gray-700 md:ml-2">
                  {transformSlug(segment)}
                </span>
              ) : (
                <Link
                  href={`/${segments.slice(0, index + 1).join("/")}`}
                  className="ml-1  font-medium text-primary hover:underline md:ml-2"
                >
                  {transformSlug(segment)}
                </Link>
              )}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
