const { microKit } = require('@micro-kit/js-server-sdk');
console.log("intializing configurations");
microKit.syncInitializeKit(process.env.SDK_TOKEN, { updateRate: 30000, baseUrl: 'localhost', http: process.env.SDK_IS_HTTP === "true", port: process.env.SDK_PORT, service: 'configurations'});
console.log("configurations initialized");

const { getDb, connectToServer, dbClose } = require('../mongo');
const { encryptGroups } = require('../routes/configurations');

const sdkTestProjectId  =  '06e1b0c0-8160-4db2-a9c9-02ebe3ac898e';	
const development_env_id = '1955b88b-b37a-4f38-b915-0c97e7a03a63';
const staging_env_id = '1ec0d284-f8e3-43dd-9e54-05f20e4084ae';
const production_env_id = '2ff3a168-a0ad-4751-95f3-693eb1d2f5dc';



const initConfig = async () => {
    console.log("connecting to mongo");
    await connectToServer('localhost').catch(e => console.log(e));
    console.log("mongo connected");
    console.log("inserting new configurations");
    await getDb().collection('config').insertMany([await encryptGroups({
        projectId: sdkTestProjectId,
        groups: [
            {
                "name": "node test types",
                "key": "node_test_types",
                "is_private": true,
                "items": [
                    {
                        "description": "", 
                        "key": "string", 
                        "name": "string", 
                        "type": "string", 
                        "isSecret": false,
                        "values":[
                            {
                                "variants": [], 
                                "env": development_env_id, 
                                "value": "test string" 
                            },
                            {
                                "variants": [],
                                "env": production_env_id,
                                "value": "test string"
                            },
                            {
                                "variants": [],
                                "env": staging_env_id,
                                "value": "test string"
                            }
                        ]
                    },
                ],
            },
         ]
    })
    ]);
    console.log("new configurations wew inserted");
}

initConfig().then(() => {
    dbClose();
    process.exit();
}).catch(err => { console.log(err) });

