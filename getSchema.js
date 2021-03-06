/*
 * One off node task for getting graphql schema data
 * Needed for GraphQL introspection result on fragments
 * Run w/ `node 'getSchema.js'` or NPM script (see package.json)
 *
 * Returns query json - write to local json file
 * Resulting data added to apollo cache - see src/vue-apollo.js
 */

const fetch = require("node-fetch");
const fs = require("fs");
require("dotenv").config();

fetch(process.env.VUE_APP_GRAPHQL_HTTP, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    variables: {},
    query: `
      {
        __schema {
          types {
            kind
            name
            possibleTypes {
              name
            }
          }
        }
      }
    `
  })
})
  .then(result => result.json())
  .then(result => {
    // here we're filtering out any type information unrelated to unions or interfaces
    const filteredData = result.data.__schema.types.filter(
      type => type.possibleTypes !== null
    );
    result.data.__schema.types = filteredData;
    fs.writeFile(
      "./src/graphql/fragmentTypes.json",
      JSON.stringify(result.data),
      err => {
        if (err) {
          console.error("Error writing fragmentTypes file", err);
        } else {
          console.log("Fragment types successfully extracted!");
        }
      }
    );
  });
