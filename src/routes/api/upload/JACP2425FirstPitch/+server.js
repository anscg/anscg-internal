import { error } from '@sveltejs/kit';
import {
    S3Client,
    ListBucketsCommand,
    ListObjectsV2Command,
    GetObjectCommand,
    PutObjectCommand
  } from "@aws-sdk/client-s3";
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const S3 = new S3Client({
  region: "apac",
  endpoint: `https://internal.anscg.net`,
  credentials: {
    accessKeyId: import.meta.env.VITE_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_SECRET_ACCESS_KEY,
  },
});

async function streamToString(stream) {
    const chunks = [];
    for await (let chunk of stream) {
        chunks.push(chunk)
    }
    const buffer = Buffer.concat(chunks);
    return buffer.toString("utf-8")
}

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    let signedurl
    //return a signed link from S3 bucket
    console.log()
    signedurl = await getSignedUrl(S3, new GetObjectCommand({Bucket: 'bucket', Key: await streamToString(request.body)}), { expiresIn: 3600 })
    return new Response(signedurl, { status: 200 });
}