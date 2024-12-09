declare module 'multer-s3' {
    import { StorageEngine } from 'multer';
    import { S3 } from 'aws-sdk';

    interface MulterS3Options {
        s3: S3;
        bucket: string;
        contentType?: (req: any, file: any) => string;
        acl?: string;
        key: (req: any, file: any, cb: (err: any, key: string) => void) => void;
        metadata?: (req: any, file: any, cb: (err: any, metadata: any) => void) => void;
    }

    function multerS3(options: MulterS3Options): StorageEngine;

    export = multerS3;
}
