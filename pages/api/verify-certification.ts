import { v4 as uuidv4 } from "uuid";
import { Session } from "next-iron-session";
import { NextApiRequest, NextApiResponse } from "next";
import { withSession, contractAddress, addressCheckMiddleware } from "./utils";
import { VehicleCertificationDataClean } from "@_types/nft";
import axios from "axios";
import FormData from "form-data";

export default withSession(async (req: NextApiRequest & { session: Session }, res: NextApiResponse) => {
    if (req.method === "POST") {
        try {
            const { body } = req;
            const certification = body.certificationMeta as VehicleCertificationDataClean;
            if (!certification.certificationCode || !certification.vehicleId) {
                return res.status(422).send({ message: "Some of the form data are missing!" });
            }

            //Check valid vehicle id

            await addressCheckMiddleware(req, res);

            const formData = new FormData();
            if (certification.certificationCode == "1") {
                formData.append(
                    "data",
                    JSON.stringify({
                        license_plate: certification.license_plate,
                    }),
                    {
                        contentType: "application/json",
                        filename: "metadata-" + uuidv4(),
                    }
                );
            } else {
                formData.append(
                    "data",
                    JSON.stringify({
                        uri: certification.uri,
                    }),
                    {
                        contentType: "application/json",
                        filename: "metadata-" + uuidv4(),
                    }
                );
            }

            const jsonRes = await axios.post(`${process.env.NEXT_PUBLIC_IPFS_API_URL}/api/v0/add`, formData, {
                headers: {
                    "Content-type": `multipart/form-data; boundary=${formData.getBoundary()}`,
                },
            });
            return res.status(200).send(jsonRes.data);
        } catch (e: any) {
            console.log(e.message);
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
