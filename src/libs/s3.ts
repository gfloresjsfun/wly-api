import { extname } from "path";
import { v4 as uuidv4 } from "uuid";
import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
  DeleteObjectCommand,
  ObjectCannedACL,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({ region: process.env.AWS_S3_REGION });
const bucket = process.env.AWS_S3_BUCKET;
const GET_SIGNED_URL_OPTIONS = {
  expiresIn: parseInt(process.env.AWS_SIGNED_URL_OPTIONS_EXPIRES_IN || "3600"),
};
const s3BaseUrl = `https://${bucket}.s3.amazonaws.com/`;

export const generateS3Url = (key: string) => `${s3BaseUrl}${key}`;

export const generateS3Key = (prefix: string, filename: string) => {
  return `${prefix}/${uuidv4()}${extname(filename)}`;
};

export const uploadToS3 = (
  body: Buffer,
  key: string,
  acl: ObjectCannedACL = ObjectCannedACL.private
) =>
  s3Client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: body,
      ACL: acl,
    })
  );

export const getS3SignedUrl = (key: string, options = GET_SIGNED_URL_OPTIONS) =>
  getSignedUrl(
    s3Client,
    new GetObjectCommand({
      Bucket: bucket,
      Key: key,
    }),
    options
  );

export const deleteFromS3 = (key: string) =>
  s3Client.send(
    new DeleteObjectCommand({
      Bucket: bucket,
      Key: key,
    })
  );
