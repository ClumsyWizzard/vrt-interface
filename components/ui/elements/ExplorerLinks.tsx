import { FunctionComponent } from "react";
import Link from "next/link";
import { AddressToBrand } from "types/addresses";

type TxHashLinkProps = {
    txHash: string;
};

type AddressHashLinkProps = {
    address: string;
};

export const TxHashLink: FunctionComponent<TxHashLinkProps> = ({ txHash }) => {
    return (
        <div>
            {"TxHash: "}
            <Link href={`${process.env.NEXT_PUBLIC_TESTNET_EXPLORER_URL}/tx/${txHash}`}>
                <a target="_blank" className="underline overflow-ellipsis block overflow-hidden whitespace-nowrap">
                    {txHash}
                </a>
            </Link>
        </div>
    );
};
export const AddressHashLink: FunctionComponent<AddressHashLinkProps> = ({ address }) => {
    return (
        <Link href={`${process.env.NEXT_PUBLIC_TESTNET_EXPLORER_URL}/address/${address}`}>
            <a target="_blank" className="underline overflow-ellipsis block overflow-hidden whitespace-nowrap">
                {AddressToBrand[address] == undefined ? address : `${AddressToBrand[address]} (${address})`}
            </a>
        </Link>
    );
};
