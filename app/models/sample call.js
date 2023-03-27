const request = require('request');

const options = {
  method: 'PUT',
  url: 'https://fuseapi.azurewebsites.net/api/members/demographics/update/',
  body: {
    memberId: 317429,
    gender: 'Male',
    dob: '2023-05-19',
    ethnicity: 'White',
    race: 'White',
    hasDisabilities: 1,
    disabilityNotes: 'Test',
    userId: 3
  },
  json: true
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
