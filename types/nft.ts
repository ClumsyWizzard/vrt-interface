export type CertificationCore = {
    id: number;
    createdBy: string;
    timestamp: number;
};

export type CertificationMeta = {
    code: number;
    data: string;
};

export type Certification = {
    metadata: CertificationMeta;
} & CertificationCore;

export type Transfer = {
    id: number;
    from: string;
    to: string;
    tokenId: number;
    timestamp: number;
};

export type VehicleCore = {
    id: number;
    uri: string;
    mintedBy: string;
    currentOwner: string;
    certifications: Certification[];
    transfers: Transfer[];
    isOnSale: boolean;
};

export type VehiclePropertiesClean = {
    brand: string;
    model: string;
    seats: string;
    engine_displacement: string;
    engine_power: string;
    engine_fuel: string;
    color: string;
    frame_number: string;
    emission_class: string;
};

export type VehicleMetaClean = {
    image: string;
    properties: VehiclePropertiesClean;
};

export type Vehicle = {
    metadata: VehicleMetaClean;
} & VehicleCore;

export type VehicleWithStringMetadata = {
    metadata: string;
} & VehicleCore;

export type SaleTicketMeta = {
    description: string;
};

export type SaleTicket = {
    id: number;
    token: Partial<Vehicle>;
    price: number;
    seller: string;
    metadata: SaleTicketMeta;
    date: string;
};

export type FileReq = {
    bytes: Uint8Array;
    contentType: string;
    fileName: string;
};

export type InfuraRes = {
    Hash: string;
    Name: string;
    Size: string;
};

export type VehicleMetadataRaw = {
    properties: {
        "D.1": string;
        "D.3": string;
        E: string;
        "F.2": string;
        "F.3": string;
        J: string;
        "J.1": string;
        "J.2": string;
        K: string;
        L: string;
        "0.1": string;
        "P.1": string;
        "P.2": string;
        "P.3": string;
        "P.5": string;
        R: string;
        "S.1": string;
        "V.3": string;
        "V.7": string;
        "V.9": string;
    };
    image: string;
};

export type VehicleCertificationDataClean = {
    vehicleId: string;
    certificationCode: string;
    license_plate: string;
    uri: string;
};
