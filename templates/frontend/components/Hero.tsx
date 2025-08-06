"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { checkHealth } from "../app/health";
import Terminal from "./Terminal";
import Cards from "./Card";

/**
 * Hero component for the Nextjango landing page.
 * Displays the main call to action and branding.
 */

export default function Hero(): React.ReactElement {
  const [message, setMessage] = useState("Checking backend...");
  const [serverStatus, setServerStatus] = useState<string>("");

  useEffect(() => {
    checkHealth()
      .then((data) => {
        setMessage(`Backend status: ${data.status}`);
        setServerStatus(data.status);
      })
      .catch(() => {
        setMessage("Backend unreachable");
        setServerStatus("error");
      });
  }, []);
  return (
    <div className="container mx-auto sm:px-6 lg:px-8 relative z-10">
      <div
        className="grid grid-rows-5 items-center justify-center max-h-screen"
        style={{ gridTemplate: "1fr 1fr 2fr 1fr 1fr / auto" }}
      >
        <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[100%] flex justify-center items-center">
          <div className="w-80 h-80 rounded-full blur-3xl bg-[#5BFF8D] opacity-10" />
        </div>
        <Image
          src="/nextjango.svg"
          alt="Nextjango Logo"
          width={504}
          height={103}
          priority
          className="sm:w-[320px] md:w-[400px] hidden sm:block mt-20 mx-auto"
        />

        {/* Main Content */}

        <h1 className="p-[12px] text-[52px] text-gray-200 font-extrabold leading-tight flex items-center justify-center text-center flex-wrap mt-12 mb-10">
          <span>Full-Stack</span>
          <span className="text-[#7836C2]">Next.js</span> +{" "}
          <span className="text-[#5BFF8D]">Django</span>
          <span>With One Command</span>
        </h1>
        <div>
          <div className="grid grid-cols-1 gap-14 w-full px-4 md:px-0 mb-6">
            {/* Server Message */}
            <div className="grid grid-cols-1 gap-14 w-full px-4 md:px-0 max-w-[392px] place-self-center">
              <Terminal
                status={`(SERVER): ${message}`}
                serverStatus={serverStatus}
                colors={{ ok: "#5BFF8D", error: "#FF5B5B" }}
              />
            </div>
            <Cards />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-14 w-full  px-4 md:px-0">
          <div className="w-full flex flex-row gap-4 max-w-[392px] place-self-center">
            <a
              href="https://nextjango.com/docs"
              className="bg-[#5BFF8D]/95 text-black hover:bg-[#5BFF8D]/80 rounded-lg grow landing-link border border-[#5BFF8D] flex items-center justify-center gap-2"
            >
              <svg
                width="22"
                height="26"
                viewBox="0 0 22 26"
                fill="none"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="2"
                  y="2"
                  width="18"
                  height="22"
                  rx="3.5"
                  fill="black"
                  stroke="#5BFF8D"
                  strokeWidth="1.5"
                />
                <line
                  x1="6"
                  y1="8"
                  x2="16"
                  y2="8"
                  stroke="#5BFF8D"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <line
                  x1="6"
                  y1="12"
                  x2="16"
                  y2="12"
                  stroke="#5BFF8D"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <line
                  x1="6"
                  y1="16"
                  x2="14"
                  y2="16"
                  stroke="#5BFF8D"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              Read the Docs
            </a>
            <a
              href="https://github.com/sylkenio/nextjango"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-zinc-900 hover:bg-zinc-800 rounded-lg grow landing-link border border-[#5BFF8D] flex items-center justify-center gap-2"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2C6.477 2 2 6.484 2 12.012c0 4.425 2.865 8.178 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.605-3.37-1.342-3.37-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.833.091-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.254-.446-1.274.098-2.656 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 7.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.382.202 2.402.1 2.656.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .268.18.579.688.481C19.138 20.186 22 16.436 22 12.012 22 6.484 17.523 2 12 2Z"
                  fill="currentColor"
                />
              </svg>
              GitHub Repo
            </a>
          </div>
        </div>
        <p className="text-sm text-gray-500 text-center">
          Built by{" "}
          <a href="https://sylken.io" className="underline hover:text-white">
            Sylken
          </a>
        </p>
      </div>
    </div>
  );
}
