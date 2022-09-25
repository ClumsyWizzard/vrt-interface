/* eslint-disable @next/next/no-img-element */

import { Menu } from "@headlessui/react";
import Link from "next/link";
import { FunctionComponent } from "react";

type WalletbarProps = {
    isLoading: boolean;
    isInstalled: boolean;
    account: string | undefined;
    connect: () => void;
};

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

const Walletbar: FunctionComponent<WalletbarProps> = ({ isInstalled, isLoading, connect, account }) => {
    if (isLoading) {
        return (
            <div>
                <button
                    onClick={() => {}}
                    type="button"
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-sunray hover:bg-sunray focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sunray"
                >
                    Loading ...
                </button>
            </div>
        );
    }

    if (account) {
        return (
            <Menu as="div" className="ml-3 relative">
                <div>
                    <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                        <span className="sr-only">Open user menu</span>
                        <img className="h-8 w-8 rounded-full" src="/images/default_avatar.png" alt="" />
                    </Menu.Button>
                </div>

                <Menu.Items className="z-10 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                        {() => (
                            <button
                                disabled={true}
                                className="disabled:text-gray-500 text-sm block px-4 pt-2 text-gray-800"
                            >
                                Indirizzo wallet{" "}
                                {`0x${account[2]}${account[3]}${account[4]}${account[5]}${account[6]}${
                                    account[7]
                                }....${account.slice(-6)}`}
                            </button>
                        )}
                    </Menu.Item>
                    <Menu.Item>{() => <hr className="mt-3" />}</Menu.Item>
                    <Menu.Item>
                        {({ active }) => (
                            <Link href="/profile">
                                <a
                                    className={classNames(
                                        active ? "bg-gray-100" : "",
                                        "block px-4 py-2 text-normal text-gray-700 font-normal"
                                    )}
                                >
                                    Profilo personale
                                </a>
                            </Link>
                        )}
                    </Menu.Item>
                </Menu.Items>
            </Menu>
        );
    }

    if (isInstalled) {
        return (
            <div>
                <button
                    onClick={() => {
                        connect();
                    }}
                    type="button"
                    className="ml-2 inline-flex items-center px-4 py-1.5 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-sunray hover:bg-sunray focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sunray"
                >
                    Connettiti
                </button>
            </div>
        );
    } else {
        return (
            <div>
                <button
                    onClick={() => {
                        window.open("https://metamask.io", "_ blank");
                    }}
                    type="button"
                    className="ml-2 inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-sunray hover:bg-sunray focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sunray"
                >
                    Installa Metamask
                </button>
            </div>
        );
    }
};

export default Walletbar;
