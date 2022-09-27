import { NextApiRequest, NextApiResponse } from "next";
import { withIronSession, Session } from "next-iron-session";
import * as util from "ethereumjs-util";
import VehicleRegistrationTokenContract from "vrt-core/artifacts/VehicleRegistrationToken.json";

const SUPPORTED_NETWORKS = {
    "5777": "Ganache",
    "3": "Ropsten",
};
interface NETWORKS {
    [key: string]: any;
}

type NETWORK = typeof SUPPORTED_NETWORKS;

const targetNetwork = process.env.NEXT_PUBLIC_NETWORK_ID as keyof NETWORK;

const contractNetworks = VehicleRegistrationTokenContract["networks"] as NETWORKS;
export const contractAddress = contractNetworks[targetNetwork]["address"];

export function withSession(handler: any) {
    return withIronSession(handler, {
        password: "z5c4kUE635h1Sgczml6aG7IdZisBf821",
        cookieName: "nft-auth-session",
    });
}

export const addressCheckMiddleware = async (req: NextApiRequest & { session: Session }, res: NextApiResponse) => {
    return new Promise(async (resolve, reject) => {
        const message = req.session.get("message-session");

        let nonce: string | Buffer =
            "\x19Ethereum Signed Message:\n" + JSON.stringify(message).length + JSON.stringify(message);

        nonce = util.keccak(Buffer.from(nonce, "utf-8"));
        const { v, r, s } = util.fromRpcSig(req.body.signature);
        const pubKey = util.ecrecover(util.toBuffer(nonce), v, r, s);
        const addrBuffer = util.pubToAddress(pubKey);
        const address = util.bufferToHex(addrBuffer);

        if (address === req.body.address) {
            resolve("Correct Address");
        } else {
            reject("Wrong Address");
        }
    });
};
