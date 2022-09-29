/* eslint-disable @next/next/no-img-element */

import type { NextPage } from "next";
import { BaseLayout } from "@ui";

import { Vehicle } from "@_types/nft";
import { useOwnedNfts } from "@hooks/web3";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ExclamationCircleIcon } from "@heroicons/react/solid";

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
                    <div className="flex-1 flex items-stretch lg:flex-row flex-col">
                        <main className="flex-1 overflow-y-auto">
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                <div>
                                    <h1 className="text-4xl font-bold text-gray-900">I tuoi veicoli</h1>
                                    <p className="pt-3 text-xl font-light">
                                        In questa pagina puoi visionare tutti i veicoli in tuo possesso.
                                    </p>
                                </div>
                                <div className="mt-12 pb-16">
                                    {nfts.data!.length > 0 ? (
                                        <ul
                                            role="list"
                                            className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8"
                                        >
                                            {(nfts.data as Vehicle[]).map((nft) => (
                                                <li key={nft.id} onClick={() => setActiveNft(nft)} className="relative">
                                                    <div
                                                        className={classNames(
                                                            nft.id === activeNft?.id
                                                                ? "ring-2 ring-offset-2 ring-gray-700"
                                                                : "focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-gray-700",
                                                            "group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 overflow-hidden"
                                                        )}
                                                    >
                                                        <img
                                                            src={nft.metadata.image}
                                                            alt=""
                                                            className={classNames(
                                                                nft.id === activeNft?.id
                                                                    ? ""
                                                                    : "group-hover:opacity-75",
                                                                "object-cover h-36 w-96"
                                                            )}
                                                        />
                                                        <button
                                                            type="button"
                                                            className="absolute inset-0 focus:outline-none"
                                                        ></button>
                                                    </div>
                                                    <p className="mt-4 block text-sm font-medium text-gray-900 truncate pointer-events-none">
                                                        {nft.metadata.properties.brand}
                                                    </p>
                                                    <p className="block text-sm font-medium text-gray-900 truncate pointer-events-none">
                                                        {nft.metadata.properties.model}
                                                    </p>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <div className="mt-12 rounded-md bg-gray-100 p-4 mb-10 border-2 border-gray-3s00">
                                            <div className="flex">
                                                <div className="flex-shrink-0">
                                                    <ExclamationCircleIcon
                                                        className="h-8 w-8 text-yellow-400"
                                                        aria-hidden="true"
                                                    />
                                                </div>
                                                <div className="ml-3">
                                                    <h3 className="text-lg font-medium text-gray-800">Attenzione</h3>
                                                    <div className="mt-1 text-normal text-gray-700">
                                                        <p>
                                                            Non possiedi nessun veicolo al momento. Acquistane uno nel
                                                            marketplace.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </main>
                        <aside className="lg:w-96 bg-white p-6 lg:p-8 border-t lg:border-t-0 lg:border-l lg:border-gray-200 overflow-y-auto">
                            {activeNft && (
                                <div className="pb-16 space-y-6">
                                    <div>
                                        <div className="mt-4 mb-4 flex items-start justify-between">
                                            <div>
                                                <h2 className="text-4xl font-medium text-gray-800">
                                                    {activeNft.metadata.properties.brand}
                                                </h2>
                                                <h3 className="text-4xl font-medium text-gray-500">
                                                    {activeNft.metadata.properties.model}
                                                </h3>
                                                <div className="mt-6">
                                                    <div className="text-lg text-gray-500">
                                                        <p className="inline-block font-medium text-gray-700">
                                                            Colore:
                                                        </p>{" "}
                                                        <p className="inline-block">
                                                            {activeNft.metadata.properties.color}
                                                        </p>
                                                    </div>
                                                    <div className="mt-3 mb-3 text-lg text-gray-500">
                                                        <p className="inline-block font-medium text-gray-700">
                                                            Posti a sedere:
                                                        </p>{" "}
                                                        <p className="inline-block">
                                                            {activeNft.metadata.properties.seats}
                                                        </p>
                                                    </div>
                                                    <div className="mt-3 mb-3 text-lg text-gray-500">
                                                        <p className="inline-block font-medium text-gray-700">
                                                            Motore:
                                                        </p>{" "}
                                                        <p className="inline-block">
                                                            {`${activeNft.metadata.properties.engine_displacement}cc da ${activeNft.metadata.properties.engine_power} KW`}
                                                        </p>
                                                    </div>
                                                    <div className="mt-3 mb-3 text-lg text-gray-500">
                                                        <p className="inline-block font-medium text-gray-700">
                                                            Carburante:
                                                        </p>{" "}
                                                        <p className="inline-block">
                                                            {activeNft.metadata.properties.engine_fuel}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                router.push(`/vehicle/${activeNft.id}`);
                                            }}
                                            className="disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none disabled:cursor-not-allowed inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700"
                                        >
                                            Visualizza i dati completi
                                        </button>
                                    </div>
                                    <hr />
                                    <div className="flex">
                                        {activeNft.isOnSale ? (
                                            <div>
                                                <div className="mb-6">
                                                    <legend className="contents text-lg font-medium text-gray-900">
                                                        Il veicolo è in vendita
                                                    </legend>
                                                    <p className="text-base text-gray-500">
                                                        Se vuoi ritirarlo dal marketplace premi il pulsante qui in
                                                        basso.
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={() => {
                                                        nfts.delistNft(activeNft.id);
                                                    }}
                                                    type="button"
                                                    className="disabled:text-gray-400 disabled:cursor-not-allowed flex-1 bg-fire-100 py-2 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white hover:bg-fire-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fire-100"
                                                >
                                                    Rimuovi dalla vendita
                                                </button>
                                            </div>
                                        ) : (
                                            <form>
                                                <div className="mb-5 bg-white">
                                                    <div className="mb-6">
                                                        <legend className="contents text-lg font-medium text-gray-900">
                                                            Metti in vendita il tuo veicolo
                                                        </legend>
                                                        <p className="text-base text-gray-500">
                                                            Il tuo veicolo verrà aggiunto al marketplace per poter
                                                            essere acquistato.
                                                        </p>
                                                    </div>
                                                    <div className="mb-6 grid grid-cols-6 gap-6">
                                                        <div className="col-span-6">
                                                            <label className="block text-base font-medium text-gray-700">
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
                                                    className="disabled:text-gray-400 disabled:cursor-not-allowed flex-1 bg-sunray py-2 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white hover:bg-sunray focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sunray"
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
