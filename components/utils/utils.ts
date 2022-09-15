import { VehicleCertificationDataClean, VehicleMetaClean, VehicleMetadataRaw } from "@_types/nft";

const fuelMapping: { [k: string]: string } = {
    BENZ: "Benzina",
    GASOL: "Diesel",
    EL: "Elettrico",
    GPL: "GPL",
    H2: "Idrogeno",
};

export const cleanVehicleMeta = (rawVehicleMeta: string): VehicleMetaClean => {
    const jsonMeta = JSON.parse(rawVehicleMeta) as VehicleMetadataRaw;
    return {
        properties: {
            brand: jsonMeta.properties["D.1"],
            model: jsonMeta.properties["D.3"],
            seats: jsonMeta.properties["S.1"],
            engine_displacement: jsonMeta.properties["P.1"],
            engine_power: jsonMeta.properties["P.2"],
            engine_fuel: fuelMapping[jsonMeta.properties["P.3"]],
            color: jsonMeta.properties["R"],
            emission_class: jsonMeta.properties["V.9"],
            frame_number: jsonMeta.properties["E"],
        },
        image: jsonMeta.image,
    };
};

export const cleanVehicleCertificationData = (rawCertificationMeta: string): VehicleCertificationDataClean => {
    return JSON.parse(rawCertificationMeta);
};
