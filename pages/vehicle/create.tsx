/* eslint-disable @next/next/no-img-element */

import type { NextPage } from "next";
import React, { ChangeEvent, useEffect, useState } from "react";
import { BaseLayout } from "@ui";
import { InfuraRes } from "@_types/nft";
import axios from "axios";
import { useWeb3 } from "@providers/web3";
import { toast } from "react-toastify";
import { useAccount, useNetwork } from "@hooks/web3";
import { ExclamationIcon } from "@heroicons/react/solid";
import { Select } from "flowbite-react";
import { VehicleMetaClean } from "@_types/nft";
import CreateVehicleForm from "@ui/forms/createVehicle";
import CreateCertificationForm from "@ui/forms/createCertification";
import { AddressToBrand } from "@_types/addresses";

const NftCreate: NextPage = () => {
    const { account } = useAccount();
    const { ethereum, contracts } = useWeb3();
    const { network } = useNetwork();
    const [formType, setFormType] = useState("type-1");
    const [vehicleMeta, setVehicleMeta] = useState<VehicleMetaClean>({
        image: "",
        properties: {
            brand: "",
            model: "",
            seats: "",
            engine_displacement: "",
            engine_power: "",
            engine_fuel: "BENZ",
            frame_number: "",
            color: "",
            emission_class: "EURO1",
        },
    });

    const [certificationMeta, setCertificationMeta] = useState({
        vehicleId: "",
        certificationCode: "1",
        license_plate: "",
        uri: "",
    });

    useEffect(() => {
        if (account.data) {
            setVehicleMeta({
                ...vehicleMeta,
                properties: {
                    ...vehicleMeta.properties,
                    brand: AddressToBrand[account.data!] == undefined ? account.data! : AddressToBrand[account.data!],
                },
            });
        }
    }, [account.data]);

    const getSignedData = async () => {
        const messageToSign = await axios.get("/api/verify");
        const accounts = (await ethereum?.request({ method: "eth_requestAccounts" })) as string[];
        const account = accounts[0];

        const signedData = await ethereum?.request({
            method: "personal_sign",
            params: [JSON.stringify(messageToSign.data), account, messageToSign.data.id],
        });

        return { signedData, account };
    };

    const handlePropertiesChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const vehicleProperties: { [k: string]: string } = vehicleMeta.properties;
        vehicleProperties[name] = value;

        setVehicleMeta({
            ...vehicleMeta,
            properties: vehicleMeta.properties,
        });
    };

    const handleCertificationMetaChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setCertificationMeta({
            ...certificationMeta,
            [name]: value,
        });
    };

    const handleImage = async (e: ChangeEvent<HTMLInputElement>) => {
        const uri = await handleFile(e);
        if (uri != undefined) {
            setVehicleMeta({
                ...vehicleMeta,
                image: uri,
            });
        }
    };

    const handleDocumentation = async (e: ChangeEvent<HTMLInputElement>) => {
        const uri = await handleFile(e);
        if (uri != undefined) {
            setCertificationMeta({
                ...certificationMeta,
                uri: uri,
            });
        }
    };

    const handleFile = async (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) {
            console.error("Select a file");
            return;
        }

        const file = e.target.files[0];
        const buffer = await file.arrayBuffer();
        const bytes = new Uint8Array(buffer);

        try {
            const { signedData, account } = await getSignedData();
            const promise = axios.post("/api/verify-image", {
                address: account,
                signature: signedData,
                bytes,
                contentType: file.type,
                fileName: file.name.replace(/\.[^/.]+$/, ""),
            });

            const res = await toast.promise(promise, {
                pending: "Caricamento del file in corso...",
                success: "Caricamento completato",
                error: "Errore nel caricamento",
            });

            const data = res.data as InfuraRes;
            return `${process.env.NEXT_PUBLIC_IPFS_GATEWAY_URL}/ipfs/${data.Hash}`;
        } catch (e: any) {
            console.error(e.message);
        }
    };

    const createCertification = async () => {
        try {
            const { signedData, account } = await getSignedData();
            console.log(certificationMeta);
            const promise = axios.post("/api/verify-certification", {
                address: account,
                signature: signedData,
                certificationMeta: certificationMeta,
            });

            const res = await toast.promise(promise, {
                pending: "Caricamento dei dati in corso...",
                success: "Dati caricati",
                error: "Errore nel caricamento dei dati",
            });

            const data = res.data as InfuraRes;

            const tx = await contracts?.vehicleRegistrationTokenContract.addCertification(
                certificationMeta.vehicleId,
                certificationMeta.certificationCode,
                `${process.env.NEXT_PUBLIC_IPFS_GATEWAY_URL}/ipfs/${data.Hash}`
            );
            await toast.promise(tx!.wait(), {
                pending: "Creazione della certificazione digitale del veicolo in corso...",
                success: "Certificazione digitale del veicolo creata con successo",
                error: "Errore nel creazione dei dati",
            });
        } catch (e: any) {
            console.error(e.message);
        }
    };

    const createNft = async () => {
        try {
            const { signedData, account } = await getSignedData();

            const promise = axios.post("/api/verify", {
                address: account,
                signature: signedData,
                nft: vehicleMeta,
            });

            const res = await toast.promise(promise, {
                pending: "Caricamento dei dati in corso...",
                success: "Dati caricati",
                error: "Errore nel caricamento dei dati",
            });

            const data = res.data as InfuraRes;

            const tx = await contracts?.vehicleRegistrationTokenContract.mintToken(
                `${process.env.NEXT_PUBLIC_IPFS_GATEWAY_URL}/ipfs/${data.Hash}`
            );
            await toast.promise(tx!.wait(), {
                pending: "Creazione dell'identità digitale del veicolo in corso...",
                success: "Identità digitale del veicolo creata con successo",
                error: "Errore nella creazione dei dati",
            });
        } catch (e: any) {
            console.error(e.message);
        }
    };

    if (!network.isConnectedToNetwork) {
        return (
            <BaseLayout>
                <div className="rounded-md bg-yellow-50 p-4 mb-10">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <ExclamationIcon className="h-8 w-8 text-yellow-400" aria-hidden="true" />
                        </div>
                        <div className="ml-3">
                            <h3 className="text-lg font-medium text-yellow-800">Attenzione</h3>
                            <div className="mt-1 text-normal text-yellow-700">
                                <p>
                                    {network.isLoading
                                        ? "Caricamento..."
                                        : `Sembra che tu sia connesso alla rete sbagliata. Controlla di aver configurato correttamente Metamask e connetti alla rete ${network.targetNetwork}.`}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </BaseLayout>
        );
    }

    return (
        <BaseLayout>
            <div>
                <div className="md:grid md:grid-cols-3 md:gap-6">
                    <div className="md:col-span-1">
                        <div className="px-4 sm:px-0">
                            <h3 className="text-xl font-medium leading-6 text-gray-900">
                                Crea un nuovo veicolo o una nuova certificazione
                            </h3>
                            <p className="mt-1 text-base text-gray-600">
                                Verifica con attenzione i dati prima di approvarli, dopo averli resi pubblici non potrai
                                più modificarli
                            </p>
                        </div>
                    </div>
                    <div className="mt-5 md:mt-0 md:col-span-2">
                        <form className="shadow sm:rounded-md sm:overflow-hidden">
                            <div>
                                <div id="select" className="px-4 sm:px-6 bg-white space-y-2 p-6">
                                    <div className="block">
                                        <label htmlFor="name" className="block text-base font-medium text-gray-700">
                                            Vuoi creare un veicolo o una certificazione?
                                        </label>
                                    </div>
                                    <Select id="countries" required onChange={(e) => setFormType(e.target.value)}>
                                        <option value="type-1">Veicolo</option>
                                        <option value="type-2">Certificazione</option>
                                    </Select>
                                </div>
                                <hr className="block text-sm font-medium text-gray-700" />
                                {formType == "type-1" ? (
                                    <CreateVehicleForm
                                        handleFile={handleImage}
                                        handlePropertiesChange={handlePropertiesChange}
                                        createNft={createNft}
                                        vehicleMeta={vehicleMeta}
                                    />
                                ) : (
                                    <CreateCertificationForm
                                        handleFile={handleDocumentation}
                                        handleCertificationMetaChange={handleCertificationMetaChange}
                                        createCertification={createCertification}
                                        certificationMeta={certificationMeta}
                                    />
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </BaseLayout>
    );
};

export default NftCreate;
