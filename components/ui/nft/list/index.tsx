import { useListedNfts } from "@hooks/web3";
import { FunctionComponent } from "react";
import NftItem from "../item";

const NftList: FunctionComponent = () => {
    const { saletTickets } = useListedNfts();
    return (
        <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
            {saletTickets.data?.map((saletTicket) => (
                <div key={saletTicket.id} className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                    <NftItem item={saletTicket} buyNft={saletTickets.buyNft} />
                </div>
            ))}
        </div>
    );
};

export default NftList;
