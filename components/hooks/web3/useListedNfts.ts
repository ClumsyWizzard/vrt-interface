import { CryptoHookFactory } from "@_types/hooks";
import { SaleTicket, Vehicle } from "@_types/nft";
import { useCallback } from "react";
import { toast } from "react-toastify";
import useSWR from "swr";
import axios from "axios";
import { cleanVehicleMeta } from "components/utils/utils";

type UseListedNftsResponse = {
    buyVehicle: (token: number, value: number) => Promise<void>;
};
type ListedNftsHookFactory = CryptoHookFactory<SaleTicket[], UseListedNftsResponse>;

export type UseListedNftsHook = ReturnType<ListedNftsHookFactory>;

export type saleTicketsResponse = {
    id: number;
    token: {
        id: number;
        mintedBy: string;
        metadata: string;
    };
    price: number;
    seller: string;
    timestamp: number;
};

export const hookFactory: ListedNftsHookFactory =
    ({ contracts }) =>
    () => {
        const { data, ...swr } = useSWR(contracts ? "web3/useListedNfts" : null, async () => {
            const saleTickets = [] as SaleTicket[];
            const saleTicketsRawData = (
                await axios({
                    url: `${process.env.NEXT_PUBLIC_GRAPH_QUERY_BASE_URL}/subgraphs/name/${process.env.NEXT_PUBLIC_SUBGRAPH_NAME}`,
                    method: "post",
                    headers: {
                        "content-type": "application/json",
                    },
                    data: {
                        query: `{
                          saleTickets(where: {status: PENDING}, orderBy: timestamp, orderDirection: desc) {
                            id
                            token {
                              id
                              mintedBy
                              metadata
                            }
                            price
                            seller
                            timestamp
                          }
                        }`,
                    },
                })
            ).data.data.saleTickets as saleTicketsResponse[];
            for (let i = 0; i < saleTicketsRawData.length; i++) {
                const ticketData = saleTicketsRawData[i];
                const tokenDataFormatted = {
                    ...ticketData.token,
                    metadata: cleanVehicleMeta(ticketData.token.metadata),
                } as Vehicle;
                const date = new Date(ticketData.timestamp * 1000).toLocaleString("it-IT", { timeZone: "Europe/Rome" });
                saleTickets.push({
                    id: ticketData.id,
                    price: ticketData.price,
                    seller: ticketData.seller,
                    token: tokenDataFormatted,
                    date: date,
                    metadata: {
                        description: "Bella",
                    },
                });
            }

            return saleTickets;
        });

        const _contract = contracts?.vehicleMarketplaceContract;
        const buyVehicle = useCallback(
            async (tokenId: number, value: number) => {
                try {
                    const result = await _contract!.buyVehicle(tokenId, {
                        value: value.toString(),
                    });

                    await toast.promise(result!.wait(), {
                        pending: "Validazione della transazione in corso...",
                        success: "Il veicolo è stato acquistato con successo",
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
            buyVehicle,
            data: data || [],
        };
    };
