import FileUpload from "@/components/FileUpload";
import { Button } from "@/components/ui/button";
import { UserButton, auth } from "@clerk/nextjs";
import { LogIn } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const { userId } = await auth();
  const isAuth = !!userId;
  return (
    <div className=" h-screen w-screen flex items-center bg-gradient-to-r from-yellow-200 via-gray-50 to-teal-300">
      <div className="flex flex-col justify-center items-center w-full h-full">
        <div className="flex flex-col">
          <div className="flex items-center">
            <h1 className="font-bold text-6xl">Ask Your PDF</h1>

            <div className="ml-2">
              <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox: {
                      width: "3rem",
                      height: "3rem",
                    },
                    userButtonPopoverCard: {
                      marginTop: "3rem",
                      padding: "2rem",
                    },
                  },
                }}
                afterSignOutUrl="/"
              />
            </div>
          </div>
          <div className="flex justify-center">
            {isAuth && <Button className="m-2">Go to Chats</Button>}
          </div>
        </div>
        <div className="w-1/3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem
          recusandae alias nulla dolore fugit perferendis necessitatibus
        </div>
        <div className="m-5 w-full flex flex-col items-center">
          {isAuth ? (
            <div className="w-1/3">
              <FileUpload />
            </div>
          ) : (
            <Link href="/sign-in">
              <Button>
                Login to get Started
                <LogIn className="ml-2" size={24} />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
