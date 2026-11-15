import pkg from "@aws-sdk/s3-request-presigner"
import {GetObjectCommand} from "@aws-sdk/client-s3"
import {s3} from "../config/s3.js"

const {getSignedURL} = pkg;
export const getFromS3 = async (filename,expiresIn=600) => {
    return await getSignedURL(
        s3,
        new GetObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key:filename
        }),
        {expiresIn}
    )
}