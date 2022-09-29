/* eslint-disable @next/next/no-img-element */

import { FunctionComponent } from "react";
import { useAccount, useNetwork } from "@hooks/web3";
import { SaleTicket } from "../../../../types/nft";
import { useRouter } from "next/router";
import { AddressToBrand } from "@_types/addresses";

type NftItemProps = {
    item: SaleTicket;
    buyNft: (token: number, value: number) => Promise<void>;
};

function shortifyAddress(address: string) {
    return "0x" + `${address[2]}${address[3]}${address[4]}${address[5]}****${address.slice(-4)}`.toUpperCase();
}

const NftItem: FunctionComponent<NftItemProps> = ({ item, buyNft }) => {
    const { account } = useAccount();
    const { network } = useNetwork();
    const router = useRouter();
    return (
        <>
            <div className="flex-shrink-0">
                <img className={`object-cover h-56 w-96`} src={item.token.metadata!.image} alt="New NFT" />
            </div>
            <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                <div className="flex-1">
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center">
                            <div>
                                <img
                                    className="inline-block h-9 w-9 rounded-full"
                                    src="/images/default_avatar.png"
                                    alt=""
                                />
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Venditore</p>
                                <p className="text-sm font-base text-gray-500 group-hover:text-gray-700">
                                    {item.seller === account.data
                                        ? "Tu"
                                        : AddressToBrand[item.seller!] == undefined
                                        ? shortifyAddress(item.seller)
                                        : AddressToBrand[item.seller!]}
                                </p>
                            </div>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Pubblicato il</p>
                            <p className="text-sm font-base text-gray-500 group-hover:text-gray-700">{item.date}</p>
                        </div>
                    </div>
                    <div className="block mt-2">
                        <p className="text-xl font-semibold text-gray-900">{item.token.metadata!.properties.brand}</p>
                        <p className="text-xl font-semibold text-gray-900">{item.token.metadata!.properties.model}</p>
                        <div className="mt-6 mb-6">
                            <div className="text-base text-gray-500">
                                <p className="inline-block font-medium text-gray-700">Colore:</p>{" "}
                                <p className="inline-block">{item.token.metadata!.properties.color}</p>
                            </div>
                            <div className="mt-3 mb-3 text-base text-gray-500">
                                <p className="inline-block font-medium text-gray-700">Posti a sedere:</p>{" "}
                                <p className="inline-block">{item.token.metadata!.properties.seats}</p>
                            </div>
                            <div className="mt-3 mb-3 text-base text-gray-500">
                                <p className="inline-block font-medium text-gray-700">Motore:</p>{" "}
                                <p className="inline-block">
                                    {`${item.token.metadata!.properties.engine_displacement}cc da ${
                                        item.token.metadata!.properties.engine_power
                                    } KW`}
                                </p>
                            </div>
                            <div className="mt-3 mb-3 text-base text-gray-500">
                                <p className="inline-block font-medium text-gray-700">Carburante:</p>{" "}
                                <p className="inline-block">{item.token.metadata!.properties.engine_fuel}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="overflow-hidden mb-4">
                    <dl className="-mx-4 -mt-4 flex flex-wrap">
                        <div className="flex flex-col px-4 pt-4">
                            <dt className="order-2 text-sm font-medium text-gray-500">Prezzo</dt>
                            <dd className="order-1 text-2xl font-extrabold text-gray-700">
                                <div className="flex justify-center items-center">
                                    € {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                </div>
                            </dd>
                        </div>
                    </dl>
                </div>
                <div>
                    {item.seller === account.data || network.data != "Ganache" ? null : (
                        <button
                            onClick={() => {
                                buyNft(item.token.id!, item.price);
                            }}
                            type="button"
                            disabled={item.seller === account.data}
                            className="disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none disabled:cursor-not-allowed mr-2 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-sunray hover:bg-sunray focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sunray"
                        >
                            Acquista
                        </button>
                    )}

                    <button
                        type="button"
                        onClick={() => {
                            router.push(`/vehicle/${item.token.id}`);
                        }}
                        className="disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none disabled:cursor-not-allowed inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
                    >
                        Dettagli
                    </button>
                </div>
            </div>
        </>
    );
};

export default NftItem;
