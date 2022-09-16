/* eslint-disable @next/next/no-img-element */

import { FunctionComponent } from "react";
import { useAccount } from "@hooks/web3";
import { SaleTicket } from "../../../../types/nft";
import { useRouter } from "next/router";

type NftItemProps = {
    item: SaleTicket;
    buyNft: (token: number, value: number) => Promise<void>;
};

function shortifyAddress(address: string) {
    return `0x****${address.slice(-4)}`;
}

const NftItem: FunctionComponent<NftItemProps> = ({ item, buyNft }) => {
    const { account } = useAccount();
    const router = useRouter();
    return (
        <>
            <div className="flex-shrink-0">
                <img className={`h-full w-full object-cover`} src={item.token.metadata!.image} alt="New NFT" />
            </div>
            <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                <div className="flex-1">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center mt-2">
                            <div>
                                <img
                                    className="inline-block h-9 w-9 rounded-full"
                                    src="/images/default_avatar.png"
                                    alt=""
                                />
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Venditore</p>
                                <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
                                    {item.seller === account.data ? "Tu" : shortifyAddress(item.seller)}
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
                        <p className="mt-3 mb-3 text-base text-gray-500">{`Colore: ${
                            item.token.metadata!.properties.color
                        }`}</p>
                        <p className="mt-3 mb-3 text-base text-gray-500">{`Porte: ${
                            item.token.metadata!.properties.seats
                        }`}</p>
                        <p className="mt-3 mb-3 text-base text-gray-500">{` Motore: ${item.token.metadata?.properties.engine_displacement}cc da ${item.token.metadata?.properties.engine_power} KW`}</p>
                        <p className="mt-3 mb-3 text-base text-gray-500">{`Carburante: ${
                            item.token.metadata!.properties.engine_fuel
                        }`}</p>
                    </div>
                </div>
                <div className="overflow-hidden mb-4">
                    <dl className="-mx-4 -mt-4 flex flex-wrap">
                        <div className="flex flex-col px-4 pt-4">
                            <dt className="order-2 text-sm font-medium text-gray-500">Price</dt>
                            <dd className="order-1 text-xl font-extrabold text-indigo-600">
                                <div className="flex justify-center items-center">
                                    € {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                </div>
                            </dd>
                        </div>
                    </dl>
                </div>
                <div>
                    {item.seller === account.data ? null : (
                        <button
                            onClick={() => {
                                buyNft(item.token.id!, item.price);
                            }}
                            type="button"
                            disabled={item.seller === account.data}
                            className="disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none disabled:cursor-not-allowed mr-2 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Acquista
                        </button>
                    )}

                    <button
                        type="button"
                        onClick={() => {
                            router.push(`/vehicle/${item.token.id}`);
                        }}
                        className="disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none disabled:cursor-not-allowed inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Dettagli
                    </button>
                </div>
            </div>
        </>
    );
};

export default NftItem;