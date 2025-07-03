import React from "react";
import Navbar from "./shared/Navbar";
import Footer from "./Footer";
import githublogo from "./../assets/github.png";

const Aboutus = () => {
  return (
    <div className="bg-gradient-to-r from-[#f7efd2] to-[#b9e2f5] text-gray-800">
      <Navbar />
      <div class="p-4">
        <div class="mb-15 grid lg:grid-cols-2 items-start gap-12 p-8 mx-auto max-w-4xl max-lg:max-w-2xl bg-white [box-shadow:0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-lg">
          <div>
            <h2 class="text-slate-900 text-3xl font-bold">Let's Connect</h2>
            <p class="text-[15px] text-slate-600 mt-4 leading-relaxed">
              
            </p>
            <div class="mt-12">
              <h2 class="text-slate-900 text-base font-semibold">Email</h2>
              <ul class="mt-4">
                <li class="flex items-center">
                  <div class="bg-gray-200 h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20px"
                      height="20px"
                      fill="#000"
                      viewBox="0 0 479.058 479.058"
                    >
                      <path
                        d="M434.146 59.882H44.912C20.146 59.882 0 80.028 0 104.794v269.47c0 24.766 20.146 44.912 44.912 44.912h389.234c24.766 0 44.912-20.146 44.912-44.912v-269.47c0-24.766-20.146-44.912-44.912-44.912zm0 29.941c2.034 0 3.969.422 5.738 1.159L239.529 264.631 39.173 90.982a14.902 14.902 0 0 1 5.738-1.159zm0 299.411H44.912c-8.26 0-14.971-6.71-14.971-14.971V122.615l199.778 173.141c2.822 2.441 6.316 3.655 9.81 3.655s6.988-1.213 9.81-3.655l199.778-173.141v251.649c-.001 8.26-6.711 14.97-14.971 14.97z"
                        data-original="#000000"
                      />
                    </svg>
                  </div>
                  <a href="https://mail.google.com/mail/?view=cm&to=s.prithvichauhan.work@gmail.com" target="_blank" class="text-sm ml-4">
                    <small class="block text-slate-900">Mail</small>
                    <span class="text-blue-600 font-medium">
                       s.prithvichauhan.work@gmail.com
                    </span>
                  </a>
                </li>
              </ul>
            </div>

            <div class="mt-12">
              <h2 class="text-slate-900 text-base font-semibold">Socials</h2>
              <ul class="flex mt-4 space-x-4">
                <li class="bg-gray-200 h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                  <a href="https://github.com/PrithviSChauhan" alt="github" target="_blank">
                    <img src={githublogo} alt="githublogo" />
                  </a>
                </li>
                <li class="bg-gray-200 h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                  <a href="https://www.linkedin.com/in/prithvi-singh-chauhan-b67b67228/" alt="linkedin" target="_blank">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20px"
                      height="20px"
                      fill="#000"
                      viewBox="0 0 511 512"
                    >
                      <path
                        d="M111.898 160.664H15.5c-8.285 0-15 6.719-15 15V497c0 8.285 6.715 15 15 15h96.398c8.286 0 15-6.715 15-15V175.664c0-8.281-6.714-15-15-15zM96.898 482H30.5V190.664h66.398zM63.703 0C28.852 0 .5 28.352.5 63.195c0 34.852 28.352 63.2 63.203 63.2 34.848 0 63.195-28.352 63.195-63.2C126.898 28.352 98.551 0 63.703 0zm0 96.395c-18.308 0-33.203-14.891-33.203-33.2C30.5 44.891 45.395 30 63.703 30c18.305 0 33.195 14.89 33.195 33.195 0 18.309-14.89 33.2-33.195 33.2zm289.207 62.148c-22.8 0-45.273 5.496-65.398 15.777-.684-7.652-7.11-13.656-14.942-13.656h-96.406c-8.281 0-15 6.719-15 15V497c0 8.285 6.719 15 15 15h96.406c8.285 0 15-6.715 15-15V320.266c0-22.735 18.5-41.23 41.235-41.23 22.734 0 41.226 18.495 41.226 41.23V497c0 8.285 6.719 15 15 15h96.403c8.285 0 15-6.715 15-15V302.066c0-79.14-64.383-143.523-143.524-143.523zM466.434 482h-66.399V320.266c0-39.278-31.953-71.23-71.226-71.23-39.282 0-71.239 31.952-71.239 71.23V482h-66.402V190.664h66.402v11.082c0 5.77 3.309 11.027 8.512 13.524a15.01 15.01 0 0 0 15.875-1.82c20.313-16.294 44.852-24.907 70.953-24.907 62.598 0 113.524 50.926 113.524 113.523zm0 0"
                        data-original="#000000"
                      />
                    </svg>
                  </a>
                </li>
                
              </ul>
            </div>
          </div>

          <form class="space-y-4">
            <input
              type="text"
              placeholder="Name"
              class="w-full text-slate-900 rounded-md py-2.5 px-4 border border-gray-300 text-sm outline-0 focus:border-blue-500"
            />
            <input
              type="email"
              placeholder="Email"
              class="w-full text-slate-900 rounded-md py-2.5 px-4 border border-gray-300 text-sm outline-0 focus:border-blue-500"
            />
            <input
              type="text"
              placeholder="Subject"
              class="w-full text-slate-900 rounded-md py-2.5 px-4 border border-gray-300 text-sm outline-0 focus:border-blue-500"
            />
            <textarea
              placeholder="Message"
              rows="6"
              class="w-full text-slate-900 rounded-md px-4 border border-gray-300 text-sm pt-2.5 outline-0 focus:border-blue-500"
            ></textarea>
            <button
              type="button"
              class="text-white bg-blue-600 hover:bg-blue-700 rounded-md text-sm font-medium px-4 py-2.5 w-full cursor-pointer border-0 mt-2"
            >
              Send message
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Aboutus;
