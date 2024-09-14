import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, User2 } from "lucide-react";

const Navbar = () => {
  const user = false;

  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div>
          <h1 className="text-3xl font-bold">
            Career
            <span className="text-[#f83002]">
              Deepot<span className="text-[#50C878]">t</span>
            </span>
          </h1>
        </div>
        <div className="flex items-center gap-12">
          <ul className="flex text-xl items-center gap-7">
            <li>Home</li>
            <li>Jobs</li>
            <li>Browse</li>
          </ul>

          {!user ? (
            <div className="flex flex-row gap-3">
              <div>
                <Link to="/Login">
                  <Button
                    variant="outLine"
                    className="text-gray-600 hover:text-gray-800 bg-white border-0 hover:outline"
                  >
                    Login
                  </Button>
                </Link>
              </div>
              <div>
                <Link to="signup">
                  {" "}
                  <Button className="text-white  hover:bg-[#5b30a6] bg-[#6A38C2] border-black-2">
                    Signup
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-4">
                <div className="flex items-center gap-4 mb-4">
                  <Avatar>
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                  </Avatar>
                  <div>
                    <h4 className="font-medium">Prithvi</h4>
                    <p className="text-sm text-muted-foreground">
                      Lorem ipsum dolor sit amet
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <User2 className="text-gray-600" />{" "}
                    <Button
                      variant="link"
                      className="text-gray-600 hover:text-gray-800 bg-white border-0"
                    >
                      View Profile
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <LogOut className="text-gray-600" />{" "}
                    <Button
                      variant="link"
                      className="text-gray-600 hover:text-gray-800 bg-white border-0"
                    >
                      Log Out
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
