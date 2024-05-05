"use client";

import Link from "next/link";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { FaRegUserCircle } from "react-icons/fa";

const ProfileMenu = () => {
  const [openModal, setOpenModal] = useState(false);
  const { data: session } = useSession();
  return (
    <div className="flexCenter z-10 flex-col relative group">
      <Menu as="div">
        <Menu.Button
          className="flexCenter gap-3 px-4 py-3 rounded-xl text-black font-semibold"
          onMouseEnter={() => setOpenModal(true)}
        >
          {session?.user?.image && (
            <Image
              src={session.user.image}
              width={40}
              height={40}
              className="rounded-xl"
              alt="user profile image"
            />
          )}
          <FaRegUserCircle
            className="group-hover:text-orange-600 "
            size="2rem"
          />
        </Menu.Button>

        <Transition
          show={openModal}
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
            static
            className="flexStart flex-col absolute mt-3 right-0 p-7 sm:min-w-[300px] min-w-max rounded-xl bg-white border border-nav-border shadow-menu"
            onMouseLeave={() => setOpenModal(false)}
          >
            <div className="flex flex-col items-center gap-y-4">
              {session?.user?.image && (
                <Image
                  src={session?.user?.image}
                  className="rounded-full"
                  width={80}
                  height={80}
                  alt="profile Image"
                />
              )}
              <p className="font-semibold">
                Welcome, {session?.user?.name} {session?.user?.surname}
              </p>
            </div>

            <div className="flex flex-col gap-3 pt-10 items-start w-full">
              <Menu.Item>
                <Link
                  href="/add-product"
                  className="text-sm font-semibold text-green-800"
                >
                  Start Selling
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link href={`/seller/${session?.user?.id}`} className="text-sm">
                  My Products
                </Link>
              </Menu.Item>
            </div>
            <div className="w-full flexStart border-t border-nav-border mt-5 pt-5">
              <Menu.Item>
                <button
                  type="button"
                  className="text-sm text-red-800"
                  onClick={() => signOut()}
                >
                  Sign out
                </button>
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default ProfileMenu;
