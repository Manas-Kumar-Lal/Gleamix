import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const accessKeyId = process.env.AWS_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY
const awsRegion = process.env.AWS_REGION
const bucketName = process.env.AWS_BUCKET_NAME

const s3 = new S3Client({
    region: awsRegion,
    credentials: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
    },
});

// Generate signed URLs for uploading files
const getUploadSignedUrls = async (keys) => {
    if (!keys || keys.length < 1) return;
    return await Promise.all(
        keys.map(async (key) => {
            const command = new PutObjectCommand({
                Bucket: bucketName,
                Key: key,
            });

            const signedUrl = await getSignedUrl(s3, command, { expiresIn: 60 }); // URL expires in 60 seconds
            return { uploadSignedUrl: signedUrl };
        })
    );
};

// Generate signed URLs for retrieving files
const getDownloadSignedUrls = async (keys) => {
    if (!keys || keys.length < 1) return;
    return await Promise.all(
        keys.map(async (key) => {
            const command = new GetObjectCommand({
                Bucket: bucketName,
                Key: key,
            });

            const signedUrl = await getSignedUrl(s3, command, { expiresIn: 60 }); // URL expires in 60 seconds
            return { downloadSignedUrl: signedUrl };
        })
    );
};

export { getUploadSignedUrls, getDownloadSignedUrls };
