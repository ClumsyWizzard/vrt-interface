import { FunctionComponent } from "react";
import Link from "next/link";

type NftItemProps = {
    txHash: string;
};

const TxHashLink: FunctionComponent<NftItemProps> = ({ txHash }) => {
    return (
        <div>
            {"TxHash: "}
            <Link href={`${process.env.NEXT_PUBLIC_TESTNET_EXPLORER_URL}/tx/${txHash}`}>
                <a target="_blank">{txHash}</a>
            </Link>
        </div>
    );
};

export default TxHashLink;
