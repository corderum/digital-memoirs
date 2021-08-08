const sstk = require("shutterstock-api");
const credentials = require('./credentials.json');
const fs = require('fs'),
  path = require('path'),
  filePath = path.join(__dirname, 'sample-text.csv')

// Read in File of metadata
fs.readFile(filePath, 'utf8', (err, data) => {
  if(err) {
    console.error(err)
    return
  }

  // Run MetaData Grab
  const applicationConsumerId = credentials.auth.id;
  const applicationConsumerSecret = credentials.auth.secret;
  sstk.setBasicAuth(applicationConsumerId, applicationConsumerSecret);

  const imagesApi = new sstk.ImagesApi();

  const queryData = data.replace(/,/g, ' ');

  const queryParams = {
    "query": queryData,
    "image_type": "photo",
    "page": 1,
    "per_page": 5,
    "sort": "popular",
    "view": "minimal",
    "safe": false
  };

  imagesApi.searchImages(queryParams)
    .then(({data}) => {
      console.log(data[0]);
    })
    .catch((error) => {
      console.error(error);
    });
})