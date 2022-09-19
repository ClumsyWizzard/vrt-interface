import { v4 as uuidv4 } from "uuid";
import { Session } from "next-iron-session";
import { NextApiRequest, NextApiResponse } from "next";
import { withSession, contractAddress, addressCheckMiddleware } from "./utils";
import { VehicleMetaClean, VehicleMetadataRaw } from "@_types/nft";
import axios from "axios";
import FormData from "form-data";

export default withSession(async (req: NextApiRequest & { session: Session }, res: NextApiResponse) => {
    const vehicleMetadataRaw = {
        image: "",
        properties: {
            "D.1": "",
            "D.3": "",
            E: "",
            "F.2": "1300",
            "F.3": "2225",
            J: "M2",
            "J.1": "1",
            "J.2": "2",
            K: "8EQWER14124R84E3*2000/112*0618*15",
            L: "2",
            "0.1": "800",
            "P.1": "",
            "P.2": "",
            "P.3": "",
            "P.5": "3RE223RD0",
            R: "",
            "S.1": "",
            "V.3": "0.03",
            "V.7": "155.0",
            "V.9": "",
        },
    } as VehicleMetadataRaw;

    if (req.method === "POST") {
        try {
            const { body } = req;
            const nft = body.nft as VehicleMetaClean;

            if (!nft.image || !nft.properties) {
                return res.status(422).send({ message: "Some of the form data are missing!" });
            }
            await addressCheckMiddleware(req, res);

            const formData = new FormData();
            formData.append(
                "data",
                JSON.stringify({
                    image: nft.image,
                    properties: {
                        ...vehicleMetadataRaw.properties,
                        "D.1": nft.properties.brand,
                        "D.3": nft.properties.model,
                        E: nft.properties.frame_number,
                        "P.1": nft.properties.engine_displacement,
                        "P.2": nft.properties.engine_power,
                        "P.3": nft.properties.engine_fuel,
                        R: nft.properties.color,
                        "S.1": nft.properties.seats,
                        "V.9": nft.properties.emission_class,
                    },
                }),
                {
                    contentType: "application/json",
                    filename: "metadata-" + uuidv4(),
                }
            );
            const jsonRes = await axios.post(`${process.env.NEXT_PUBLIC_IPFS_API_URL}/api/v0/add`, formData, {
                headers: {
                    "Content-type": `multipart/form-data; boundary=${formData.getBoundary()}`,
                },
            });
            return res.status(200).send(jsonRes.data);
        } catch {
            return res.status(422).send({ message: "Cannot create JSON" });
        }
    } else if (req.method === "GET") {
        try {
            const message = { contractAddress, id: uuidv4() };
            req.session.set("message-session", message);
            await req.session.save();

            return res.json(message);
        } catch {
            return res.status(422).send({ message: "Cannot generate a message!" });
        }
    } else {
        return res.status(200).json({ message: "Invalid api route" });
    }
});
