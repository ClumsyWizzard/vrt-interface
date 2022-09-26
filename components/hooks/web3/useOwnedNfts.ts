import { CryptoHookFactory } from "@_types/hooks";
import { Vehicle, VehicleWithStringMetadata } from "@_types/nft";
import { useCallback } from "react";
import { toast } from "react-toastify";
import useSWR from "swr";
import axios from "axios";
import { cleanVehicleMeta } from "components/utils/utils";
import { useAccount } from ".";

type UseOwnedNftsResponse = {
    listNft: (tokenId: number, price: number) => Promise<void>;
    delistNft: (tokenId: number) => Promise<void>;
};
type OwnedNftsHookFactory = CryptoHookFactory<Vehicle[], UseOwnedNftsResponse>;

export type UseOwnedNftsHook = ReturnType<OwnedNftsHookFactory>;

export const hookFactory: OwnedNftsHookFactory =
    ({ contracts }) =>
    () => {
        const { account } = useAccount();
        const { data, ...swr } = useSWR(contracts ? "web3/useOwnedNfts" : null, async () => {
            const ownedNfts = [] as Vehicle[];
            const ownedNftsRawData = (
                await axios({
                    url: `${process.env.NEXT_PUBLIC_GRAPH_QUERY_BASE_URL}/subgraphs/name/${process.env.NEXT_PUBLIC_SUBGRAPH_NAME}`,
                    method: "post",
                    headers: {
                        "content-type": "application/json",
                    },
                    data: {
                        query: `{
                    tokens(where: {currentOwner: "${account.data}"}) {
                          id
                          metadata
                          isOnSale
                          mintedBy
                          uri
                          metadata
                        }
                      }`,
                    },
                })
            ).data.data.tokens as VehicleWithStringMetadata[];

            for (let i = 0; i < ownedNftsRawData.length; i++) {
                const vehicleData = ownedNftsRawData[i];
                ownedNfts.push({
                    ...vehicleData,
                    metadata: cleanVehicleMeta(vehicleData.metadata),
                });
            }

            return ownedNfts;
        });

        const _contract = contracts?.vehicleMarketplaceContract;
        const listNft = useCallback(
            async (tokenId: number, price: number) => {
                try {
                    const result = await _contract!.putVehicleOnSale(tokenId, price.toString());

                    await toast.promise(result!.wait(), {
                        pending: "Validazione della transazione in corso...",
                        success: "Il tuo veicolo è stato messo in vendita",
                        error: "Validazione della transazione fallita",
                    });
                } catch (e: any) {
                    console.error(e.message);
                }
            },
            [_contract]
        );

        const delistNft = useCallback(
            async (tokenId: number) => {
                try {
                    const result = await _contract!.cancelSale(tokenId);

                    await toast.promise(result!.wait(), {
                        pending: "Validazione della transazione in corso...",
                        success: "Il tuo veicolo è stata rimosso dalla vendita",
                        error: "Validazione della transazione fallita",
                    });
                } catch (e: any) {
                    console.error(e.message);
                }
            },
            [_contract]
        );

        return {
            ...swr,
            listNft,
            delistNft,
            data: data || [],
        };
    };
