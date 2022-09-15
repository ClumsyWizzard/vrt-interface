/* eslint-disable @next/next/no-img-element */

import type { NextPage } from "next";
import { BaseLayout } from "@ui";

import { Vehicle } from "@_types/nft";
import { useOwnedNfts } from "@hooks/web3";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const tabs = [{ name: "In tuo possesso", href: "#", current: true }];

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

const Profile: NextPage = () => {
    const router = useRouter();
    const { nfts } = useOwnedNfts();
    const [activeNft, setActiveNft] = useState<Vehicle>();
    const [sellingPrice, setSellingPrice] = useState<string>("0");

    useEffect(() => {
        if (nfts.data && nfts.data.length > 0) {
            setActiveNft(nfts.data[0]);
        }

        return () => setActiveNft(undefined);
    }, [nfts.data]);

    return (
        <BaseLayout>
            <div className="h-full flex">
                <div className="flex-1 flex flex-col overflow-hidden">
                    <div className="flex-1 flex items-stretch overflow-hidden">
                        <main className="flex-1 overflow-y-auto">
                            <div className="pt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                <div className="flex">
                                    <h1 className="flex-1 text-2xl font-bold text-gray-900">I tuoi veicoli</h1>
                                </div>
                                <div className="mt-3 sm:mt-2">
                                    <div className="hidden sm:block">
                                        <div className="flex items-center border-b border-gray-200">
                                            <nav
                                                className="flex-1 -mb-px flex space-x-6 xl:space-x-8"
                                                aria-label="Tabs"
                                            >
                                                {tabs.map((tab) => (
                                                    <a
                                                        key={tab.name}
                                                        href={tab.href}
                                                        aria-current={tab.current ? "page" : undefined}
                                                        className={classNames(
                                                            tab.current
                                                                ? "border-indigo-500 text-indigo-600"
                                                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                                                            "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                                                        )}
                                                    >
                                                        {tab.name}
                                                    </a>
                                                ))}
                                            </nav>
                                        </div>
                                    </div>
                                </div>

                                <section className="mt-8 pb-16" aria-labelledby="gallery-heading">
                                    <ul
                                        role="list"
                                        className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
                                    >
                                        {(nfts.data as Vehicle[]).map((nft) => (
                                            <li key={nft.id} onClick={() => setActiveNft(nft)} className="relative">
                                                <div
                                                    className={classNames(
                                                        nft.id === activeNft?.id
                                                            ? "ring-2 ring-offset-2 ring-indigo-500"
                                                            : "focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500",
                                                        "group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 overflow-hidden"
                                                    )}
                                                >
                                                    <img
                                                        src={nft.metadata.image}
                                                        alt=""
                                                        className={classNames(
                                                            nft.id === activeNft?.id ? "" : "group-hover:opacity-75",
                                                            "object-cover pointer-events-none"
                                                        )}
                                                    />
                                                    <button
                                                        type="button"
                                                        className="absolute inset-0 focus:outline-none"
                                                    ></button>
                                                </div>
                                                <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">
                                                    {nft.metadata.properties.brand}
                                                </p>
                                                <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">
                                                    {nft.metadata.properties.model}
                                                </p>
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                            </div>
                        </main>

                        {/* Details sidebar */}
                        <aside className="hidden w-96 bg-white p-8 border-l border-gray-200 overflow-y-auto lg:block">
                            {activeNft && (
                                <div className="pb-16 space-y-6">
                                    <div>
                                        <div className="block w-full aspect-w-10 aspect-h-7 rounded-lg overflow-hidden">
                                            <img src={activeNft.metadata.image} alt="" className="object-cover" />
                                        </div>
                                        <div className="mt-4 flex items-start justify-between">
                                            <div>
                                                <h2 className="text-lg font-medium text-gray-900">
                                                    <span className="sr-only">Details for </span>
                                                    {activeNft.metadata.properties.brand +
                                                        " " +
                                                        activeNft.metadata.properties.model}
                                                </h2>
                                                <p className="mt-3 mb-3 text-base text-gray-500">{`Colore: ${activeNft.metadata.properties.color}`}</p>
                                                <p className="mt-3 mb-3 text-base text-gray-500">{`Porte: ${activeNft.metadata.properties.seats}`}</p>
                                                <p className="mt-3 mb-3 text-base text-gray-500">{` Motore: ${activeNft.metadata.properties.engine_displacement}cc da ${activeNft.metadata.properties.engine_power} KW`}</p>
                                                <p className="mt-3 mb-3 text-base text-gray-500">{`Carburante: ${activeNft.metadata.properties.engine_fuel}`}</p>
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                router.push(`/vehicle/${activeNft.id}`);
                                            }}
                                            className="disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none disabled:cursor-not-allowed inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            Visualizza i dati completi
                                        </button>
                                    </div>
                                    <hr />
                                    <div className="flex">
                                        {activeNft.isOnSale ? (
                                            <button
                                                onClick={() => {
                                                    nfts.delistNft(activeNft.id);
                                                }}
                                                type="button"
                                                className="disabled:text-gray-400 disabled:cursor-not-allowed flex-1 bg-indigo-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            >
                                                Rimuovi dalla vendita
                                            </button>
                                        ) : (
                                            <form>
                                                <div className="py-5 bg-white">
                                                    <div className="mb-4">
                                                        <legend className="contents text-base font-medium text-gray-900">
                                                            Metti in vendita il tuo veicolo
                                                        </legend>
                                                        <p className="text-sm text-gray-500">
                                                            Il tuo veicolo verrà aggiunto al marketplace per poter
                                                            essere acquistato.
                                                        </p>
                                                    </div>
                                                    <div className="grid grid-cols-6 gap-6">
                                                        <div className="col-span-6">
                                                            <label className="block text-sm font-medium text-gray-700">
                                                                Prezzo di vendita
                                                            </label>
                                                            <div className="mt-1 flex rounded-md shadow-sm">
                                                                <input
                                                                    onChange={(
                                                                        event: React.ChangeEvent<HTMLInputElement>
                                                                    ) => setSellingPrice(event.target.value)}
                                                                    value={sellingPrice}
                                                                    type="text"
                                                                    name="selling-price"
                                                                    className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300"
                                                                />
                                                                <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                                                    Euro (€)
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => {
                                                        nfts.listNft(activeNft.id, sellingPrice as unknown as number);
                                                    }}
                                                    type="button"
                                                    className="disabled:text-gray-400 disabled:cursor-not-allowed flex-1 bg-indigo-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                >
                                                    Metti in vendita
                                                </button>
                                            </form>
                                        )}
                                    </div>
                                </div>
                            )}
                        </aside>
                    </div>
                </div>
            </div>
        </BaseLayout>
    );
};

export default Profile;
