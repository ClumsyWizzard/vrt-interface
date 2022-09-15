import { AddressToBrand } from "types/addresses";
import type { NextPage } from "next";
import React, { ChangeEvent } from "react";
import { useAccount } from "@hooks/web3";
import { Label, Select } from "flowbite-react";
import { VehicleMetaClean } from "@_types/nft";

type PageProps = {
    handlePropertiesChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleFile: (e: ChangeEvent<HTMLInputElement>) => Promise<void>;
    createNft: () => Promise<void>;
    vehicleMeta: VehicleMetaClean;
};

const CreateVehicleForm: NextPage<PageProps> = ({ handlePropertiesChange, handleFile, createNft, vehicleMeta }) => {
    const { account } = useAccount();

    return (
        <div>
            <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Casa automobilistica
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                        <input
                            value={vehicleMeta.properties.brand}
                            type="text"
                            disabled={true}
                            name="name"
                            className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Nome modello
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                        <input
                            value={vehicleMeta.properties.model}
                            onChange={handlePropertiesChange}
                            type="text"
                            name="model"
                            className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                            placeholder="Nome del modello del veicolo..."
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Numero di telaio
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                        <input
                            value={vehicleMeta.properties.frame_number}
                            onChange={handlePropertiesChange}
                            type="text"
                            name="frame_number"
                            className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                            placeholder="Numero di telaio"
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Colore carrozzeria
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                        <input
                            value={vehicleMeta.properties.color}
                            onChange={handlePropertiesChange}
                            type="text"
                            name="color"
                            className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                            placeholder="Colore della carrozzeria..."
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Cilindarata (cc)
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                        <input
                            value={vehicleMeta.properties.engine_displacement}
                            onChange={handlePropertiesChange}
                            type="text"
                            name="engine_displacement"
                            className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                            placeholder="Cilindrata del veicolo..."
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Potenza (KW)
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                        <input
                            value={vehicleMeta.properties.engine_power}
                            onChange={handlePropertiesChange}
                            type="text"
                            name="engine_power"
                            className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                            placeholder="Potenza dichiarata del veicolo..."
                        />
                    </div>
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="countries" value="Tipo di Carburante" />
                    </div>
                    <Select
                        value={vehicleMeta.properties.engine_fuel}
                        required
                        onChange={handlePropertiesChange}
                        name="engine_fuel"
                    >
                        <option value="BENZ">Benzina</option>
                        <option value="GASOL">Gasolio</option>
                        <option value="EL">Elettrico</option>
                        <option value="GPL">Gpl</option>
                        <option value="H2">Idrogeno</option>
                    </Select>
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="countries" value="Classe di emissioni" />
                    </div>
                    <Select
                        value={vehicleMeta.properties.emission_class}
                        required
                        onChange={handlePropertiesChange}
                        name="emission_class"
                    >
                        <option value="EURO1">EURO 1</option>
                        <option value="EURO2">EURO 2</option>
                        <option value="EURO3">EURO 3</option>
                        <option value="EURO4">EURO 4</option>
                        <option value="EURO5">EURO 5</option>
                        <option value="EURO6">EURO 6</option>
                    </Select>
                </div>
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Numero di posti
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                        <input
                            value={vehicleMeta.properties.seats}
                            onChange={handlePropertiesChange}
                            type="text"
                            name="seats"
                            className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                            placeholder="Numero di posti a sedere del veicolo..."
                        />
                    </div>
                </div>
                {/* Has Image? */}
                {vehicleMeta.image ? (
                    <img src={vehicleMeta.image} alt="" className="h-40" />
                ) : (
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Image</label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                            <div className="space-y-1 text-center">
                                <svg
                                    className="mx-auto h-12 w-12 text-gray-400"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 48 48"
                                    aria-hidden="true"
                                >
                                    <path
                                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                <div className="flex text-sm text-gray-600">
                                    <label
                                        htmlFor="file-upload"
                                        className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                    >
                                        <span>Upload a file</span>
                                        <input
                                            onChange={handleFile}
                                            id="file-upload"
                                            name="file-upload"
                                            type="file"
                                            className="sr-only"
                                        />
                                    </label>
                                    <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button
                    onClick={createNft}
                    type="button"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Crea
                </button>
            </div>
        </div>
    );
};

export default CreateVehicleForm;
