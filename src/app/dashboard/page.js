"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
    IconArrowLeft,
    IconBrandTabler,
    IconSettings,
    IconUserBolt,
} from "@tabler/icons-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Profile from "@/components/Dashboard/Profile";
import { useSession, signOut } from "next-auth/react";

export default function DemoSidebar() {
    const [selectedPage, setSelectedPage] = useState("dashboard");

    const links = [
        { label: "Dashboard", key: "dashboard", icon: <IconBrandTabler className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" /> },
        { label: "Profile", key: "profile", icon: <IconUserBolt className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" /> },
        { label: "Settings", key: "settings", icon: <IconSettings className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" /> },
        { label: "Logout", key: "logout", icon: <IconArrowLeft className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" /> },
    ];

    return (
        <div className="mx-auto flex w-full flex-1 flex-col overflow-hidden rounded-md border border-neutral-200 bg-gray-100 md:flex-row dark:border-neutral-700 dark:bg-neutral-800 h-screen">
            {/* Sidebar Section */}
            <Sidebar>
                <SidebarBody className="justify-between gap-10">
                    <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
                        <Logo />
                        <div className="mt-8 flex flex-col gap-2">
                            {links.map((link, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedPage(link.key)}
                                    className={cn(
                                        "flex items-center gap-3 w-full p-2 rounded-md text-neutral-700 dark:text-neutral-200 hover:bg-gray-200 dark:hover:bg-neutral-700",
                                        selectedPage === link.key ? "bg-gray-300  dark:bg-neutral-600" : ""
                                    )}
                                >
                                    {link.icon}
                                    <span>{link.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                    <SidebarLink
                        link={{
                            label: "Manu Arora",
                            href: "#",
                            icon: (
                                <Image
                                    src="https://assets.aceternity.com/manu.png"
                                    className="h-7 w-7 shrink-0 rounded-full"
                                    width={50}
                                    height={50}
                                    alt="Avatar"
                                />
                            ),
                        }}
                    />
                </SidebarBody>
            </Sidebar>

            {/* Right Side Content - Dynamically changing */}
            <div className="flex flex-1">
                {selectedPage === "dashboard" && <Dashboard />}
                {selectedPage === "profile" && <Profile />}
                {/* {selectedPage === "settings" && <Settings />} */}
                {selectedPage === "logout" && <Logout />}
            </div>
        </div>
    );
}

export const Logo = () => (
    <Link href="/" className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black">
        <div className="h-5 w-7 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
        <span className="font-medium whitespace-pre text-black dark:text-white">Solantix</span>
    </Link>
);

// Keep your existing Dashboard UI
const Dashboard = () => (
    <div className="flex flex-1">
        <div className="flex h-full w-full flex-1 flex-col gap-2 rounded-tl-2xl border border-neutral-200 bg-white p-2 md:p-10 dark:border-neutral-700 dark:bg-neutral-900">
            <div className="flex gap-2">
                {[...new Array(4)].map((_, idx) => (
                    <div key={idx} className="h-20 w-full animate-pulse rounded-lg bg-gray-100 dark:bg-neutral-800"></div>
                ))}
            </div>
            <div className="flex flex-1 gap-2">
                {[...new Array(2)].map((_, idx) => (
                    <div key={idx} className="h-full w-full animate-pulse rounded-lg bg-gray-100 dark:bg-neutral-800"></div>
                ))}
            </div>
        </div>
    </div>
);

const Logout = () => (
    <div className="flex flex-1 flex-col items-center justify-center">
        <h1 className="text-xl font-semibold text-gray-900">Logout</h1>
        <p className="text-gray-700">Are you sure you want to logout?</p>
        <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md" onClick={async () => {
            await signOut({ redirect: false });
            window.location.href = "/"; 
        }}>Logout</button>
    </div>
);


