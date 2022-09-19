import { NextPage, GetServerSideProps } from "next";
import Link from "next/link";
import { BaseLayout } from "@ui";
import axios from "axios";
import { cleanVehicleMeta } from "components/utils/utils";
import { Certification, Transfer, VehicleMetaClean } from "@_types/nft";
import { Timeline } from "flowbite-react";
import React from "react";
import { AddressToBrand } from "types/addresses";

type VehicleFullDataWithRawMeta = {
    metadata: string;
} & VehicleFullData;

type VehicleFullDataWithCleanMeta = {
    metadata: VehicleMetaClean;
} & VehicleFullData;

type eventData = {
    timestamp: number;
    type: number;
    data: CertificationData | TransferData;
};

const certificationTypeName: { [k: string]: string } = {
    1: "Immatricolazione",
    2: "Incidente",
    3: "Lavori/Riparazioni",
    4: "Pagamento del bollo",
    5: "Collaudo",
    6: "Revisione",
};

type CertificationData = {
    authority: string;
    code: number;
    metadata: any;
    txHash: string;
};

type TransferData = {
    from: string;
    to: string;
    txHash: string;
};

type PageProps = {
    vehicle: VehicleFullDataWithCleanMeta;
    events: eventData[];
};

const knowAddressName = (address: string) => {
    return AddressToBrand[address] == undefined ? address : `${AddressToBrand[address]} (${address})`;
};

const Home: NextPage<PageProps> = ({ vehicle, events }) => {
    return (
        <BaseLayout>
            <div>
                <h1 className="text-4xl font-bold">{vehicle.metadata.properties.brand}</h1>
                <p className="text-4xl font-bold">{vehicle.metadata.properties.model}</p>
                <div className="flex justify-start mt-2">
                    <p className="text-lg font-bold mr-2">Proprietario:</p>
                    <p className="text-lg">{vehicle.currentOwner}</p>
                </div>
            </div>
            <div className="flex justify-center">
                <img src={vehicle.metadata.image} />
            </div>
            <h2 className="text-3xl">Caratteristiche del veicolo</h2>
            <div className="columns-3">
                <div className="mb-2">
                    <h4 className="font-semibold">Cilindrata(cc)</h4>
                    <p>{vehicle.metadata.properties.engine_displacement}</p>
                </div>
                <div className="mb-2">
                    <h4 className="font-semibold">Potenza (Kw)</h4>
                    <p>{vehicle.metadata.properties.engine_power}</p>
                </div>
                <div className="mb-2">
                    <h4 className="font-semibold">Carburante</h4>
                    <p>{vehicle.metadata.properties.engine_fuel}</p>
                </div>
            </div>
            <div className="columns-3">
                <div className="mb-2">
                    <h4 className="font-semibold">Posti a sedere</h4>
                    <p>{vehicle.metadata.properties.seats}</p>
                </div>
                <div className="mb-2">
                    <h4 className="font-semibold">Colore</h4>
                    <p>{vehicle.metadata.properties.color}</p>
                </div>
            </div>
            <h2 className="text-3xl">Storia del veicolo</h2>
            <Timeline>
                {events.map((item) => {
                    const datetime = new Date(item.timestamp * 1000).toLocaleString("it-IT");
                    return (
                        <Timeline.Item key={item.timestamp}>
                            <Timeline.Point />
                            <Timeline.Content>
                                <Timeline.Time>{datetime}</Timeline.Time>
                                {item.type == 1 ? (
                                    <React.Fragment>
                                        <Timeline.Title className="mb-2">
                                            {certificationTypeName[(item.data as CertificationData).code]}
                                        </Timeline.Title>
                                        <div className="mb-3">
                                            <h4 className="font-semibold text-black">Informazioni:</h4>
                                            <p>{`TxHash: ${(
                                                <Link
                                                    href={`${process.env.NEXT_PUBLIC_TESTNET_EXPLORER_URL}/tx/${
                                                        (item.data as TransferData).txHash
                                                    }`}
                                                >
                                                    {(item.data as TransferData).txHash}
                                                </Link>
                                            )}`}</p>
                                            <p>{`Certificazione emessa da ${knowAddressName(
                                                (item.data as CertificationData).authority
                                            )}`}</p>
                                        </div>
                                        <div className="mb-3">
                                            <h4 className="font-semibold text-black">Contenuto:</h4>
                                            {(item.data as CertificationData).code == 1 ? (
                                                <React.Fragment>
                                                    È stata assegnata al veicolo la targa{" "}
                                                    {(item.data as CertificationData).metadata["license_plate"]}
                                                </React.Fragment>
                                            ) : (
                                                <Link href={(item.data as CertificationData).metadata.uri} passHref>
                                                    <a
                                                        target="_blank"
                                                        className="mt-1 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none disabled:cursor-not-allowed inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                    >
                                                        Visualizza la documentazione
                                                    </a>
                                                </Link>
                                            )}
                                        </div>
                                    </React.Fragment>
                                ) : (item.data as TransferData).from == "0x0000000000000000000000000000000000000000" ? (
                                    <React.Fragment>
                                        <Timeline.Title className="mb-2">
                                            Identità digitale del veicolo creata
                                        </Timeline.Title>
                                        <div className="mb-3">
                                            <h4 className="font-semibold text-black">Informazioni:</h4>
                                            <p>{`TxHash: ${(
                                                <Link
                                                    href={`${process.env.NEXT_PUBLIC_TESTNET_EXPLORER_URL}/tx/${
                                                        (item.data as TransferData).txHash
                                                    }`}
                                                >
                                                    {(item.data as TransferData).txHash}
                                                </Link>
                                            )}`}</p>
                                        </div>
                                        <div className="mb-3">
                                            <h4 className="font-semibold text-black">Contenuto:</h4>
                                            {`Il veicolo è stato prodotto da ${knowAddressName(
                                                (item.data as TransferData).to
                                            )}`}
                                        </div>
                                    </React.Fragment>
                                ) : (
                                    <React.Fragment>
                                        <Timeline.Title className="mb-2">Passaggio di proprietà</Timeline.Title>
                                        <div className="mb-3">
                                            <h4 className="font-semibold text-black">Informazioni:</h4>
                                            <p>{`TxHash: ${(
                                                <Link
                                                    href={`${process.env.NEXT_PUBLIC_TESTNET_EXPLORER_URL}/tx/${
                                                        (item.data as TransferData).txHash
                                                    }`}
                                                >
                                                    {(item.data as TransferData).txHash}
                                                </Link>
                                            )}`}</p>
                                        </div>
                                        <div className="mb-3">
                                            <h4 className="font-semibold text-black">Contenuto:</h4>
                                            <p>{`La proprietà del veicolo è stata trasferita da ${knowAddressName(
                                                (item.data as TransferData).from
                                            )} a ${knowAddressName((item.data as TransferData).to)}`}</p>
                                        </div>
                                    </React.Fragment>
                                )}
                            </Timeline.Content>
                        </Timeline.Item>
                    );
                })}
            </Timeline>
        </BaseLayout>
    );
};

type VehicleFullData = {
    id: string;
    metadata: string;
    transfers: Partial<Transfer>[];
    certifications: Partial<Certification>[];
    mintedBy: string;
    currentOwner: string;
};

const formatEventData = (eventDataRaw: any, isCert: boolean) => {
    return {
        timestamp: eventDataRaw.timestamp,
        type: isCert ? 1 : 2,
        data: isCert
            ? {
                  authority: eventDataRaw.createdBy,
                  code: eventDataRaw.code,
                  txHash: eventDataRaw.txHash,
                  metadata: { ...JSON.parse(eventDataRaw.metadata) },
              }
            : {
                  from: eventDataRaw.from,
                  to: eventDataRaw.to,
                  txHash: eventDataRaw.txHash,
              },
    };
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const vehicleFullDataRaw = (
        await axios({
            url: `${process.env.NEXT_PUBLIC_GRAPH_QUERY_BASE_URL}/subgraphs/name/${process.env.NEXT_PUBLIC_SUBGRAPH_NAME}`,
            method: "post",
            headers: {
                "content-type": "application/json",
            },
            data: {
                query: `{
                    token(id: ${context.query.id}) {
                      id
                      metadata
                      transfers(orderBy: timestamp, orderDirection: desc) {
                        id
                        timestamp
                        from
                        to
                        txHash
                      }
                      certifications(orderBy: timestamp, orderDirection: desc) {
                        id
                        timestamp
                        metadata
                        code
                        createdBy
                        txHash
                      }
                      mintedBy
                      currentOwner
                    }
                  }`,
            },
        })
    ).data.data.token as VehicleFullDataWithRawMeta;

    const eventsDataArray = vehicleFullDataRaw.transfers
        .map((item) => formatEventData(item, false))
        .concat(vehicleFullDataRaw.certifications.map((item) => formatEventData(item, true)))
        .sort((a, b) => b.timestamp - a.timestamp);

    return {
        props: {
            vehicle: {
                id: vehicleFullDataRaw.id,
                currentOwner: vehicleFullDataRaw.currentOwner,
                mintedBy: vehicleFullDataRaw.mintedBy,
                metadata: cleanVehicleMeta(vehicleFullDataRaw.metadata),
            },
            events: eventsDataArray,
        },
    };
};

export default Home;
