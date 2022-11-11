import { extname } from "path";
import { v4 as uuidv4 } from "uuid";
import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({ region: process.env.AWS_S3_REGION });
const bucket = process.env.AWS_S3_BUCKET;
const GET_SIGNED_URL_OPTIONS = {
  expiresIn: parseInt(process.env.AWS_SIGNED_URL_OPTIONS_EXPIRES_IN || "3600"),
};

const generateCoverS3Key = (filename: string) => {
  return `sessions/covers/${uuidv4()}${extname(filename)}`;
};

const generateMediaS3Key = (filename: string) => {
  return `sessions/medias/${uuidv4()}${extname(filename)}`;
};

const uploadToS3 = (body: Buffer, key: string) =>
  s3Client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: body,
    })
  );

const getS3SignedUrl = (key: string, options = GET_SIGNED_URL_OPTIONS) =>
  getSignedUrl(
    s3Client,
    new GetObjectCommand({
      Bucket: bucket,
      Key: key,
    }),
    options
  );

export { generateCoverS3Key, generateMediaS3Key, uploadToS3, getS3SignedUrl };
