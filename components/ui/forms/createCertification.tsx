import type { NextPage } from "next";
import React, { ChangeEvent } from "react";
import { Label, Select, FileInput } from "flowbite-react";

type PageProps = {
    handleCertificationMetaChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleFile: (e: ChangeEvent<HTMLInputElement>) => Promise<void>;
    createCertification: () => Promise<void>;
    certificationMeta: { vehicleId: string; certificationCode: string; license_plate: string; uri: string };
};

const CreateCertificationForm: NextPage<PageProps> = ({
    handleCertificationMetaChange,
    handleFile,
    createCertification,
    certificationMeta,
}) => {
    console.log(certificationMeta);
    return (
        <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    ID Veicolo
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                    <input
                        value={certificationMeta.vehicleId}
                        onChange={handleCertificationMetaChange}
                        type="text"
                        name="vehicleId"
                        className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                    />
                </div>
            </div>
            <div id="select">
                <div className="block">
                    <Label htmlFor="countries" value="Tipologia della certificazione" />
                </div>
                <Select required name="certificationCode" onChange={handleCertificationMetaChange}>
                    <option value="1">Immatricolazione</option>
                    <option value="2">Incidente</option>
                    <option value="3">Lavori/Riparazioni</option>
                    <option value="4">Pagamento del bollo</option>
                    <option value="5">Collaudo</option>
                    <option value="6">Revisione</option>
                </Select>
            </div>
            {certificationMeta.certificationCode == "1" ? (
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Numero di Immatricolazione
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                        <input
                            value={certificationMeta.license_plate}
                            onChange={handleCertificationMetaChange}
                            type="text"
                            name="license_plate"
                            className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                        />
                    </div>
                </div>
            ) : (
                <div id="fileUpload">
                    <div className="mb-2 block">
                        <Label htmlFor="file" value="Allega file" />
                    </div>
                    <FileInput onChange={handleFile} id="file" helperText="Allega la documentazione che descriva" />
                </div>
            )}

            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button
                    onClick={createCertification}
                    type="button"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Crea certificazione
                </button>
            </div>
        </div>
    );
};

export default CreateCertificationForm;
