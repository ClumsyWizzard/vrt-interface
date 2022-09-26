import { useListedNfts } from "@hooks/web3";
import { FunctionComponent } from "react";
import NftItem from "../item";
import { ExclamationCircleIcon } from "@heroicons/react/solid";

const NftList: FunctionComponent = () => {
    const { saletTickets } = useListedNfts();
    return saletTickets.data?.length == 0 ? (
        <div className="mt-12 rounded-md bg-gray-100 p-4 mb-10 border-2 border-gray-3s00">
            <div className="flex">
                <div className="flex-shrink-0">
                    <ExclamationCircleIcon className="h-8 w-8 text-yellow-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                    <h3 className="text-lg font-medium text-gray-800">Attenzione</h3>
                    <div className="mt-1 text-normal text-gray-700">
                        <p>Non ci sono veicoli in vendita al momento. Riprova più tardi.</p>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
            {saletTickets.data?.map((saletTicket) => (
                <div key={saletTicket.id} className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                    <NftItem item={saletTicket} buyNft={saletTickets.buyVehicle} />
                </div>
            ))}
        </div>
    );
};

export default NftList;
