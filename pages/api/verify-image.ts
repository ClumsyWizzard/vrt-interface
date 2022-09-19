import { v4 as uuidv4 } from "uuid";
import { FileReq } from "@_types/nft";
import { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-iron-session";
import { addressCheckMiddleware, withSession } from "./utils";
import FormData from "form-data";
import axios from "axios";

export default withSession(async (req: NextApiRequest & { session: Session }, res: NextApiResponse) => {
    if (req.method === "POST") {
        const { bytes, fileName, contentType } = req.body as FileReq;

        if (!bytes || !fileName || !contentType) {
            return res.status(422).send({ message: "Image data are missing" });
        }

        await addressCheckMiddleware(req, res);

        const buffer = Buffer.from(Object.values(bytes));
        const formData = new FormData();

        formData.append("file", buffer, {
            contentType,
            filename: fileName + "-" + uuidv4(),
        });
        try {
            const fileRes = await axios.post(`${process.env.NEXT_PUBLIC_IPFS_API_URL}/api/v0/add`, formData, {
                maxBodyLength: Infinity,
                headers: {
                    "Content-type": `multipart/form-data; boundary=${formData.getBoundary()}`,
                },
            });

            return res.status(200).send(fileRes.data);
        } catch (e: any) {
            console.log(e.message);
        }
    } else {
        return res.status(422).send({ message: "Invalid endpoint" });
    }
});

export const config = {
    api: {
        bodyParser: {
            sizeLimit: "10mb", // Set desired value here
        },
    },
};
