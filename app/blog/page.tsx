import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog Page",
};

export default function Blog() {
  return (
    <>
      <Link href="/main">
        <div className="mt-12 flex cursor-pointer">
          <svg
            className="mr-3 h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
            />
          </svg>
          <span>Back to main page</span>
        </div>
      </Link>
    </>
  );
}
