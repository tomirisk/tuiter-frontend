import { v4 as uuidv4 } from 'uuid';

// TODO : Uncomment after configuring S3
// import * as AWS from 'aws-sdk';
// const s3 = new AWS.S3({
//                         accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
//                         secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
//                       });

export const upload = (file) => {
  const key = uuidv4();
  // TODO : Uncomment after configuring S3
  // const params = {
  //   Bucket: process.env.REACT_APP_AWS_BUCKET_NAME,
  //   Key: key,
  //   Body: file
  // };
  //
  // s3.upload(params, function(err, data) {
  //   if (err) {
  //     throw err;
  //   }
  //
  //   console.log(`File uploaded successfully. ${data.Location}`);
  //   return params.Key;
  // });
  console.log(file);
  return key;
}

export const get = (key) => {
  // TODO : Uncomment after configuring S3
  // const params = { Bucket: process.env.REACT_APP_AWS_BUCKET_NAME, Key: key};
  // s3.getObject(params, function (err, data) {
  //   if (err) {
  //     throw err;
  //   }
  //
  //   return data;
  // });
  console.log(key);
  return {};
}