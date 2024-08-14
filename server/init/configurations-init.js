const { microKit } = require('@micro-kit/js-server-sdk');
console.log("intializing configurations");
microKit.syncInitializeKit(process.env.SDK_TOKEN, { updateRate: 30000, baseUrl: 'localhost', http: process.env.SDK_IS_HTTP === "true", port: process.env.SDK_PORT, service: 'configurations'});
console.log("configurations initialized");

const { getDb, connectToServer, dbClose } = require('../mongo');
const { encryptGroups } = require('../routes/configurations');

const microkit_project_id = '326762c7-10d6-4291-adb3-4312f063ba9e';
const development_env_id = 'c4dfe6cb-cdca-41d0-a518-7ddc405d1e64';
const production_env_id = 'ae1eceb2-0f72-469b-baab-28b4a56590d9';
const staging_env_id = '87d497f2-25c5-4fe5-8dee-2bf881d28a39';
const users_service_id = 'b52bbd8e-3a5e-4a2f-80a8-571bb1c69ea7';
const projects_service_id = '9cb14bf7-1653-49da-8e59-aa2da911ba20';
const postgres_test_service_id = '3e435618-4590-4796-abfd-4dfaedfc6bb7';
const mongo_test_service_id = 'c3ac5080-3871-491e-a73e-035654c09327';
const client_service_id = '2d31be66-5b81-4a10-bcb8-4a4198e81679';
const rule_service_id = 'd2089562-bf60-4189-b7f4-1a936b498ec6';
const billing_service_id = '000f7ab3-0f29-414c-93df-a388f6bdc83b';
const admin_api_service_id = '000f7ab3-0f29-414c-93df-4312f063ba9e';

const initConfig = async () => {
    console.log("connecting to mongo");
    await connectToServer('localhost').catch(e => console.log(e));
    console.log("mongo connected");
    console.log("inserting new configurations");
    await getDb().collection('config').insertMany([await encryptGroups({
        projectId: microkit_project_id,
        groups: [
            {
                "name": "mailer",
                "key": "mailer",
                "is_private": true,
                "items": [
                    {
                        "description": "", 
                        "key": "host", 
                        "name": "host", 
                        "type": "string", 
                        "isSecret": false,
                        "values":[
                            {
                                "variants": [], 
                                "env": development_env_id, 
                                "value": "smtp.mailtrap.io" },
                            {
                                "variants": [],
                                "env": production_env_id,
                                "value": "smtp.gmail.com"
                            },
                            {
                                "variants": [],
                                "env": staging_env_id,
                                "value": "smtp.mailtrap.io"
                            }
                            ]
                    },
                    {
                        "description": "",
                        "key": "port",
                        "name": "port",
                        "type": "string",
                        "isSecret": false,
                        "values": [
                            {
                                "variants": [],
                                "env": development_env_id,
                                "value": "2525"
                            },
                            {
                                "variants": [],
                                "env": production_env_id,
                                "value": "587"
                            },
                            {
                                "variants": [],
                                "env": staging_env_id,
                                "value": "2525"
                            }
                        ]
                    },
                    {
                        "description": "",
                        "key": "sendrate",
                        "name": "sendRate",
                        "type": "number",
                        "isSecret": false,
                        "values": [
                            {
                                "variants": [],
                                "env": development_env_id,
                                "value": 300
                            },
                            {
                                "variants": [],
                                "env": production_env_id,
                                "value": 300
                            },
                            {
                                "variants": [],
                                "env": staging_env_id,
                                "value": 300
                            }
                        ]
                    },
                    {
                        "description": "",
                        "key": "support_address",
                        "name": "Support Address",
                        "type": "string",
                        "isSecret": false,
                        "values": [
                            {
                                "variants": [],
                                "env": development_env_id,
                                "value": "support@microkit.app"
                            },
                            {
                                "variants": [],
                                "env": production_env_id,
                                "value": "support@microkit.app"
                            },
                            {
                                "variants": [],
                                "env": staging_env_id,
                                "value": "support@microkit.app"
                            }
                        ]
                    },
                    {
                        "description": "",
                        "key": "contact_address",
                        "name": "Contact Address",
                        "type": "string",
                        "isSecret": false,
                        "values": [
                            {
                                "variants": [],
                                "env": development_env_id,
                                "value": "amram@microkit.app"
                            },
                            {
                                "variants": [],
                                "env": production_env_id,
                                "value": "amram@microkit.app"
                            },
                            {
                                "variants": [],
                                "env": staging_env_id,
                                "value": "amram@microkit.app"
                            }
                        ]
                    },
                    {
                        "description": "",
                        "key": "secure",
                        "name": "secure",
                        "type": "string",
                        "isSecret": false,
                        "values": [
                            {
                                "variants": [],
                                "env": development_env_id,
                                "value": "false"
                            },
                            {
                                "variants": [],
                                "env": production_env_id,
                                "value": "false"
                            },
                            {
                                "variants": [],
                                "env": staging_env_id,
                                "value": "false"
                            }
                        ]
                    },
                    {
                        "description": "",
                        "key": "password",
                        "name": "password",
                        "type": "string",
                        "isSecret": "true",
                        "values": [
                            {
                                "variants": [],
                                "env": development_env_id,
                                "value": "cb292389880e7c"
                            },
                            {
                                "variants": [],
                                "env": production_env_id,
                                "value": "GMAIL_SUPPORT_PASSWORD_ENV_VAL"
                            },
                            {
                                "variants": [],
                                "env": staging_env_id,
                                "value": "cb292389880e7c"
                            }
                        ]
                    },
                    {
                        "description": "",
                        "key": "user",
                        "name": "user",
                        "type": "string",
                        "isSecret": false,
                        "values": [
                            {
                                "variants": [],
                                "env": development_env_id,
                                "value": "54d5dac58e66df"
                            },
                            {
                                "variants": [],
                                "env": production_env_id,
                                "value": "support@microkit.app"
                            },
                            {
                                "variants": [],
                                "env": staging_env_id,
                                "value": "54d5dac58e66df"
                            }
                        ]
                    }
                ],
                "name": "mailer"
            },
            {
                "key": "service_urls",
                "is_private": true,
                "items": [
                    {
                        "description": "",
                        "key": "users",
                        "name": "users",
                        "type": "string",
                        "isSecret": false,
                        "values": [
                            {
                                "variants": [],
                                "value": "http://users:8010",
                                "env": development_env_id
                            },
                            {
                                "variants": [],
                                "value": "http://users:8010",
                                "env": production_env_id
                            },
                            {
                                "variants": [],
                                "value": "http://users:8010",
                                "env": staging_env_id
                            }
                        ]
                    },
                    {
                        "description": "",
                        "key": "projects",
                        "name": "projects",
                        "type": "string",
                        "isSecret": false,
                        "values": [
                            {
                                "variants": [],
                                "value": "http://projects:8040",
                                "env": development_env_id
                            },
                            {
                                "variants": [],
                                "value": "http://projects:8040",
                                "env": production_env_id
                            },
                            {
                                "variants": [],
                                "value": "http://projects:8040",
                                "env": staging_env_id
                            }
                        ]
                    },
                    {
                        "description": "",
                        "key": "rules",
                        "name": "rules",
                        "type": "string",
                        "isSecret": false,
                        "values": [
                            {
                                "variants": [],
                                "value": "http://rules:8070",
                                "env": development_env_id
                            },
                            {
                                "variants": [],
                                "value": "http://rules:8070",
                                "env": production_env_id
                            },
                            {
                                "variants": [],
                                "value": "http://rules:8070",
                                "env": staging_env_id
                            }
                        ]
                    },
                    {
                        "description": "",
                        "key": "features",
                        "name": "features",
                        "type": "string",
                        "isSecret": false,
                        "values": [
                            {
                                "variants": [],
                                "value": "http://features:8060",
                                "env": development_env_id
                            },
                            {
                                "variants": [],
                                "value": "http://features:8060",
                                "env": production_env_id
                            },
                            {
                                "variants": [],
                                "value": "http://features:8060",
                                "env": staging_env_id
                            }
                        ]
                    },
                    {
                        "description": "",
                        "defaultValue": "http://configurations:8020",
                        "key": "configurations",
                        "name": "configurations",
                        "isSecret": false,
                        "type": "string",
                        "values": [
                            {
                                "variants": [],
                                "value": "http://configurations:8020",
                                "env": development_env_id
                            },
                            {
                                "variants": [],
                                "value": "http://configurations:8020",
                                "env": production_env_id
                            },
                            {
                                "variants": [],
                                "value": "http://configurations:8020",
                                "env": staging_env_id
                            }
                        ]
                    },
                    {
                        "description": "",
                        "defaultValue": "http://billing:9010",
                        "key": "billing",
                        "name": "billing",
                        "isSecret": false,
                        "type": "string",
                        "values": [
                            {
                                "variants": [],
                                "value": "http://billing:9010",
                                "env": development_env_id
                            },
                            {
                                "variants": [],
                                "value": "http://billing:9010",
                                "env": production_env_id
                            },
                            {
                                "variants": [],
                                "value": "http://billing:9010",
                                "env": staging_env_id
                            }
                        ]
                    }
                ],
                "name": "service_urls"
            },
            {
                "key": "ports",
                "is_private": true,
                "items": [
                    {
                        "description": "",
                        "key": "configurations",
                        "name": "configurations",
                        "type": "number",
                        "isSecret": false,
                        "values": [
                            {
                                "variants": [],
                                "value": "8020",
                                "env": development_env_id
                            },
                            {
                                "variants": [],
                                "value": "8020",
                                "env": production_env_id
                            },
                            {
                                "variants": [],
                                "value": "8020",
                                "env": staging_env_id
                            }
                        ]
                    },
                    {
                        "description": "",
                        "key": "features",
                        "name": "features",
                        "type": "number",
                        "isSecret": false,
                        "values": [
                            {
                                "variants": [],
                                "value": "8060",
                                "env": development_env_id
                            },
                            {
                                "variants": [],
                                "value": "8060",
                                "env": production_env_id
                            },
                            {
                                "variants": [],
                                "value": "8060",
                                "env": staging_env_id
                            }
                        ]
                    },
                    {
                        "description": "",
                        "key": "rules",
                        "name": "rules",
                        "type": "number",
                        "isSecret": false,
                        "values": [
                            {
                                "variants": [],
                                "value": "8070",
                                "env": development_env_id
                            },
                            {
                                "variants": [],
                                "value": "8070",
                                "env": production_env_id
                            },
                            {
                                "variants": [],
                                "value": "8070",
                                "env": staging_env_id
                            }
                        ]
                    },
                    {
                        "description": "",
                        "key": "projects",
                        "name": "projects",
                        "type": "number",
                        "isSecret": false,
                        "values": [
                            {
                                "variants": [],
                                "value": "8040",
                                "env": development_env_id
                            },
                            {
                                "variants": [],
                                "value": "8040",
                                "env": production_env_id
                            },
                            {
                                "variants": [],
                                "value": "8040",
                                "env": staging_env_id
                            }
                        ]
                    },
                    {
                        "description": "",
                        "key": "users",
                        "name": "users",
                        "type": "number",
                        "isSecret": false,
                        "values": [
                            {
                                "variants": [],
                                "value": "8010",
                                "env": development_env_id
                            },
                            {
                                "variants": [],
                                "value": "8010",
                                "env": production_env_id
                            },
                            {
                                "variants": [],
                                "value": "8010",
                                "env": staging_env_id
                            }
                        ]
                    },
                    {
                        "description": "",
                        "key": "billing",
                        "name": "billing",
                        "type": "number",
                        "isSecret": false,
                        "values": [
                            {
                                "variants": [],
                                "value": "9010",
                                "env": development_env_id
                            },
                            {
                                "variants": [],
                                "value": "9010",
                                "env": production_env_id
                            },
                            {
                                "variants": [],
                                "value": "9010",
                                "env": staging_env_id
                            }
                        ]
                    },
                    {
                        "description": "",
                        "key": "admin_api",
                        "name": "admin_api",
                        "type": "number",
                        "isSecret": false,
                        "values": [
                            {
                                "variants": [],
                                "value": "9020",
                                "env": development_env_id
                            },
                            {
                                "variants": [],
                                "value": "9020",
                                "env": production_env_id
                            },
                            {
                                "variants": [],
                                "value": "9020",
                                "env": staging_env_id
                            }
                        ]
                    }
                ],
                "name": "ports"
            },
            {
                "key": "crypto",
                "is_private": true,
                "items": [
                    {
                        "description": "",
                        "defaultValue": "",
                        "key": "paddle_key",
                        "name": "paddle_key",
                        "isSecret": "true",
                        "type": "",
                        "values": [
                            {
                                "variants": [],
                                "value": "MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAmbwNSjOWbvmdowGtBQT4 MHQxlDdl8ab9++ubRJl2YdmjCsZNT2FyFm7epmuZ/aUlsXM/s6vlHPlowz5IqwN+ 5MPle8eXJFsMdcBNI8qTG6BGKWgW+N4cC4/bV7iWcMYPvzLTGOxrtzimoO1o/APb JaAdhsDakEY8+RouZo0qtFDHw7BxzX+9Jj/wM1aFqjCjuRW1WHkguJIvjQDyZFOc CJ6Fe+b78Hr12P0lCT5Mkc1cOpsJPidchrLrc588OTADHWF6sz34AK4QH+DP0q4N FUasg5TRnzfec9uWML0Rb1L6YaLB2s/KfboR5up+vrWwmF+F5Te3PzYPcxKEqOLY nB510oOCW1nEeHzGmdyE+llB9d6ywAonLWcrQjENtov20hjzOMd2qvltu0rD0U3k xYoxfUizaT2glnJ5cEHz5BgNDzNzTO8QsnKBAjFUefyBCTlnLZJ3ptFj8Jq2BIAP Rp0upg2GcJvYT52Q8PQzn08iuH1dkoocQAuldL4g+JUqW7XmO8eDsomaJ/1Mz/5J B9hWABHuW9OrMLvpafeb5/hQajA+2ML43kXLlnr8AZR+CygZnK8DNxYSnEXZ427B f1wYy6d+aBjzY+o6QKT+8vSVOrhJHetMSn/qUN26rPzLIyr6IPtZqU5p+MNPX2q6 YDbpaFTr/VO37Nqy4FleuesCAwEAAQ== ",
                                "env": development_env_id
                            },
                            {
                                "variants": [],
                                "value": "PADDLE_PUBLIC_KEY_ENV_VAL",
                                "env": production_env_id
                            },
                            {
                                "variants": [],
                                "value": "MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAmbwNSjOWbvmdowGtBQT4 MHQxlDdl8ab9++ubRJl2YdmjCsZNT2FyFm7epmuZ/aUlsXM/s6vlHPlowz5IqwN+ 5MPle8eXJFsMdcBNI8qTG6BGKWgW+N4cC4/bV7iWcMYPvzLTGOxrtzimoO1o/APb JaAdhsDakEY8+RouZo0qtFDHw7BxzX+9Jj/wM1aFqjCjuRW1WHkguJIvjQDyZFOc CJ6Fe+b78Hr12P0lCT5Mkc1cOpsJPidchrLrc588OTADHWF6sz34AK4QH+DP0q4N FUasg5TRnzfec9uWML0Rb1L6YaLB2s/KfboR5up+vrWwmF+F5Te3PzYPcxKEqOLY nB510oOCW1nEeHzGmdyE+llB9d6ywAonLWcrQjENtov20hjzOMd2qvltu0rD0U3k xYoxfUizaT2glnJ5cEHz5BgNDzNzTO8QsnKBAjFUefyBCTlnLZJ3ptFj8Jq2BIAP Rp0upg2GcJvYT52Q8PQzn08iuH1dkoocQAuldL4g+JUqW7XmO8eDsomaJ/1Mz/5J B9hWABHuW9OrMLvpafeb5/hQajA+2ML43kXLlnr8AZR+CygZnK8DNxYSnEXZ427B f1wYy6d+aBjzY+o6QKT+8vSVOrhJHetMSn/qUN26rPzLIyr6IPtZqU5p+MNPX2q6 YDbpaFTr/VO37Nqy4FleuesCAwEAAQ== ",
                                "env": staging_env_id
                            }
                        ]
                    },
                    {
                        "description": "",
                        "defaultValue": "",
                        "key": "google_client_secret",
                        "name": "google_client_secret",
                        "isSecret": "true",
                        "type": "",
                        "values": [
                            {
                                "variants": [],
                                "value": "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",
                                "env": development_env_id
                            },
                            {
                                "variants": [],
                                "value": "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",
                                "env": production_env_id
                            },
                            {
                                "variants": [],
                                "value": "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",
                                "env": staging_env_id
                            }
                        ]
                    },
                    {
                        "name": "google_client_id",
                        "values": [
                            {
                                "variants": [],
                                "value": "271155060307-llpcaf0m7u8kal4psp2u5q8pm0hs1iss.apps.googleusercontent.com",
                                "env": development_env_id
                            },
                            {
                                "variants": [],
                                "value": "271155060307-llpcaf0m7u8kal4psp2u5q8pm0hs1iss.apps.googleusercontent.com",
                                "env": production_env_id
                            },
                            {
                                "variants": [],
                                "value": "271155060307-llpcaf0m7u8kal4psp2u5q8pm0hs1iss.apps.googleusercontent.com",
                                "env": staging_env_id
                            }
                        ],
                        "defaultValue": "",
                        "description": "",
                        "isSecret": "true",
                        "key": "google_client_id",
                        "type": "string"
                    },
                    {
                        "description": "",
                        "key": "aes_key",
                        "name": "aes_key",
                        "type": "string",
                        "isSecret": "true",
                        "values": [
                            {
                                "variants": [],
                                "value": "qm8GgI1aP4XlcXQHCdV84AO/Mu2BGuqs8Rihj61JP1M=",
                                "env": development_env_id
                            },
                            {
                                "variants": [],
                                "value": "AES_KEY_ENV_VAL",
                                "env": production_env_id
                            },
                            {
                                "variants": [],
                                "value": "AES_KEY_ENV_VAL",
                                "env": staging_env_id
                            }
                        ]
                    },
                    {
                        "description": "",
                        "key": "internal_key",
                        "name": "internal_key",
                        "type": "string",
                        "isSecret": "true",
                        "values": [
                            {
                                "variants": [],
                                "value": "358E9A3DE07C57E73AF4E1E5E9775912A12AD8171BA24427653492250A4DE1A7",
                                "env": development_env_id
                            },
                            {
                                "variants": [],
                                "value": "INTERNAL_KEY_ENV_VAL",
                                "env": production_env_id
                            },
                            {
                                "variants": [],
                                "value": "INTERNAL_KEY_ENV_VAL",
                                "env": staging_env_id
                            }
                        ]
                    },
                    {
                        "description": "",
                        "key": "jwt_secret",
                        "name": "jwt_secret",
                        "type": "string",
                        "isSecret": "true",
                        "values": [
                            {
                                "variants": [],
                                "value": "qm8GgI1aP4XlcXQHCdV84AO/Mu2BGuqs8Rihj61JP1M=",
                                "env": development_env_id
                            },
                            {
                                "variants": [],
                                "value": "JWT_SECRET_ENV_VAL",
                                "env": production_env_id
                            },
                            {
                                "variants": [],
                                "value": "JWT_SECRET_ENV_VAL",
                                "env": staging_env_id
                            }
                        ]
                    }
                ],
                "name": "crypto"
            },
            {
                "key": "postgres",
                "is_private": true,
                "items": [
                    {
                        "description": "",
                        "key": "username",
                        "name": "username",
                        "type": "string",
                        "isSecret": false,
                        "values": [
                            {
                                "variants": [],
                                "value": "postgres",
                                "env": development_env_id
                            },
                            {
                                "variants": [],
                                "value": "postgres",
                                "env": production_env_id
                            },
                            {
                                "variants": [],
                                "value": "postgres",
                                "env": staging_env_id
                            }
                        ]
                    },
                    {
                        "description": "",
                        "key": "password",
                        "name": "password",
                        "type": "string",
                        "isSecret": "true",
                        "values": [
                            {
                                "variants": [],
                                "value": "postgres",
                                "env": development_env_id
                            },
                            {
                                "variants": [],
                                "value": "POSTGRES_PASSWORD_ENV_VAL",
                                "env": production_env_id
                            },
                            {
                                "variants": [],
                                "value": "POSTGRES_PASSWORD_ENV_VAL",
                                "env": staging_env_id
                            }
                        ]
                    },
                    {
                        "description": "",
                        "key": "dialect",
                        "name": "dialect",
                        "type": "string",
                        "isSecret": false,
                        "values": [
                            {
                                "variants": [],
                                "value": "postgres",
                                "env": development_env_id
                            },
                            {
                                "variants": [],
                                "value": "postgres",
                                "env": production_env_id
                            },
                            {
                                "variants": [],
                                "value": "postgres",
                                "env": staging_env_id
                            }
                        ]
                    },
                    {
                        "description": "",
                        "key": "port",
                        "name": "port",
                        "type": "number",
                        "isSecret": false,
                        "values": [
                            {
                                "variants": [],
                                "value": "5432",
                                "env": development_env_id
                            },
                            {
                                "variants": [],
                                "value": "5432",
                                "env": production_env_id
                            },
                            {
                                "variants": [],
                                "value": "5432",
                                "env": staging_env_id
                            }
                        ]
                    },
                    {
                        "description": "",
                        "key": "host",
                        "name": "host",
                        "type": "string",
                        "isSecret": false,
                        "values": [
                            {
                                "variants": [],
                                "value": "postgres",
                                "env": development_env_id
                            },
                            {
                                "variants": [],
                                "value": "postgres",
                                "env": production_env_id
                            },
                            {
                                "variants": [],
                                "value": "postgres",
                                "env": staging_env_id
                            }
                        ]
                    },
                    {
                        "description": "",
                        "key": "database",
                        "name": "database",
                        "type": "string",
                        "isSecret": false,
                        "values": [
                            {
                                "variants": [
                                    {
                                        "value": "users",
                                        "services": [
                                            users_service_id
                                        ]
                                    },
                                    {
                                        "value": "projects",
                                        "services": [
                                            projects_service_id
                                        ]
                                    },
                                    {
                                        "value": "rules",
                                        "services": [
                                            rule_service_id
                                        ]
                                    },
                                    {
                                        "value": "admin_api",
                                        "services": [
                                            admin_api_service_id
                                        ]
                                    },
                                    {
                                        "value": "billing",
                                        "services": [
                                            billing_service_id
                                        ]
                                    },
                                    {
                                        "value": "postgres_unit_test",
                                        "services": [
                                            postgres_test_service_id
                                        ]
                                    }
                                ],
                                "value": "",
                                "env": development_env_id
                            },
                            {
                                "variants": [
                                    {
                                        "value": "users",
                                        "services": [
                                            users_service_id
                                        ]
                                    },
                                    {
                                        "value": "projects",
                                        "services": [
                                            projects_service_id
                                        ]
                                    },
                                    {
                                        "value": "rules",
                                        "services": [
                                            rule_service_id
                                        ]
                                    },
                                    {
                                        "value": "admin_api",
                                        "services": [
                                            admin_api_service_id
                                        ]
                                    },
                                    {
                                        "value": "billing",
                                        "services": [
                                            billing_service_id
                                        ]
                                    },
                                    {
                                        "value": "postgres_unit_test",
                                        "services": [
                                            postgres_test_service_id
                                        ]
                                    }
                                ],
                                "value": "",
                                "env": production_env_id
                            },
                            {
                                "variants": [
                                    {
                                        "value": "users",
                                        "services": [
                                            users_service_id
                                        ]
                                    },
                                    {
                                        "value": "projects",
                                        "services": [
                                            projects_service_id
                                        ]
                                    },
                                    {
                                        "value": "rules",
                                        "services": [
                                            rule_service_id
                                        ]
                                    },
                                    {
                                        "value": "admin_api",
                                        "services": [
                                            admin_api_service_id
                                        ]
                                    },
                                    {
                                        "value": "billing",
                                        "services": [
                                            billing_service_id
                                        ]
                                    },
                                    {
                                        "value": "postgres_unit_test",
                                        "services": [
                                            postgres_test_service_id
                                        ]
                                    }
                                ],
                                "value": "",
                                "env": staging_env_id
                            }
                        ]
                    }
                ],
                "name": "postgres"
            },
            {
                "key": "mongo",
                "is_private": true,
                "items": [
                    {
                        "name": "db_name",
                        "isSecret": false,
                        "type": "string",
                        "key": "db_name",
                        "values": [
                            {
                                "variants": [
                                    {
                                        "services": [
                                            mongo_test_service_id
                                        ],
                                        "value": "mongo_unit_test"
                                    }
                                ],
                                "value": "configurations",
                                "env": development_env_id
                            },
                            {
                                "variants": [
                                    {
                                        "services": [
                                            mongo_test_service_id
                                        ],
                                        "value": "mongo_unit_test"
                                    }
                                ],
                                "value": "configurations",
                                "env": production_env_id
                            },
                            {
                                "variants": [
                                    {
                                        "services": [
                                            mongo_test_service_id
                                        ],
                                        "value": "mongo_unit_test"
                                    }
                                ],
                                "value": "configurations",
                                "env": staging_env_id
                            }
                        ]
                    },
                    {
                        "description": "",
                        "key": "username",
                        "name": "username",
                        "type": "string",
                        "isSecret": false,

                        "values": [
                            {
                                "variants": [],
                                "value": "mongodb",
                                "env": development_env_id
                            },
                            {
                                "variants": [],
                                "value": "microkit",
                                "env": production_env_id
                            },
                            {
                                "variants": [],
                                "value": "microkit",
                                "env": staging_env_id
                            }
                        ]
                    },
                    {
                        "description": "",
                        "key": "password",
                        "name": "password",
                        "type": "string",
                        "isSecret": "true",
                        "values": [
                            {
                                "variants": [],
                                "value": "password",
                                "env": development_env_id
                            },
                            {
                                "variants": [],
                                "value": "MONGO_PASSWORD_ENV_VAL",
                                "env": production_env_id
                            },
                            {
                                "variants": [],
                                "value": "MONGO_PASSWORD_ENV_VAL",
                                "env": staging_env_id
                            }
                        ]
                    },
                    {
                        "description": "",
                        "key": "url",
                        "name": "url",
                        "type": "string",
                        "isSecret": false,
                        "values": [
                            {
                                "variants": [],
                                "value": "mongo",
                                "env": development_env_id
                            },
                            {
                                "variants": [],
                                "value": "MONGO_HOST_ENV_VAL",
                                "env": production_env_id
                            },
                            {
                                "variants": [],
                                "value": "MONGO_HOST_ENV_VAL",
                                "env": staging_env_id
                            }
                        ]
                    },
                    {
                        "description": "",
                        "key": "protocol",
                        "name": "protocol",
                        "type": "string",
                        "isSecret": false,
                        "values": [
                            {
                                "variants": [],
                                "value": "mongodb",
                                "env": development_env_id
                            },
                            {
                                "variants": [],
                                "value": "mongodb+srv",
                                "env": production_env_id
                            },
                            {
                                "variants": [],
                                "value": "mongodb+srv",
                                "env": staging_env_id
                            }
                        ]
                    }
                ],
                "name": "mongo"
            },
            {
                "key": "redis",
                "is_private": true,
                "items": [
                    {
                        "description": "",
                        "key": "host",
                        "name": "host",
                        "type": "string",
                        "isSecret": false,
                        "values": [
                            {
                                "value": "redis:6379",
                                "env": development_env_id,
                                "variants": []
                            },
                            {
                                "value": "REDIS_HOST_ENV_VAL",
                                "env": production_env_id,
                                "variants": []
                            },
                            {
                                "value": "REDIS_HOST_ENV_VAL",
                                "env": staging_env_id,
                                "variants": []
                            }
                        ]
                    },
                    {
                        "description": "",
                        "defaultValue": "",
                        "key": "password",
                        "name": "password",
                        "isSecret": "true",
                        "type": "string",
                        "values": [
                            {
                                "value": "",
                                "env": development_env_id,
                                "variants": []
                            },
                            {
                                "value": "REDIS_PASSWORD_ENV_VAL",
                                "env": production_env_id,
                                "variants": []
                            },
                            {
                                "value": "REDIS_PASSWORD_ENV_VAL",
                                "env": staging_env_id,
                                "variants": []
                            }
                        ]
                    }
                ],
                "name": "redis"
            },
            {
                "key": "settings",
                "is_private": true,
                "items": [
                    {
                        "description": "",
                        "key": "app_url",
                        "name": "app_url",
                        "type": "string",
                        "isSecret": false,
                        "values": [
                            {
                                "variants": [],
                                "env": development_env_id,
                                "value": "http://localhost:3000"
                            },
                            {
                                "variants": [],
                                "env": production_env_id,
                                "value": "https://app.microkit.app"
                            },
                            {
                                "variants": [],
                                "env": staging_env_id,
                                "value": "https://app.stage.microkit.app"
                            }
                        ]
                    },
                    {
                        "description": "",
                        "key": "is_local",
                        "name": "is_local",
                        "type": "boolean",
                        "isSecret": false,
                        "values": [
                            {
                                "variants": [],
                                "env": development_env_id,
                                "value": "true"
                            },
                            {
                                "variants": [],
                                "env": production_env_id,
                                "value": "false"
                            },
                            {
                                "variants": [],
                                "env": staging_env_id,
                                "value": "false"
                            }
                        ]
                    },
                ],
                "name": "settings"
            },
            {
                "key": "kafka",
                "is_private": true,
                "items": [
                    {
                        "description": "",
                        "key": "host",
                        "name": "Host",
                        "type": "string",
                        "isSecret": false,
                        "values": [
                            {
                                "variants": [],
                                "env": development_env_id,
                                "value": "kafka:9092"
                            },
                            {
                                "variants": [],
                                "env": production_env_id,
                                "value": "KAFKA_HOST_ENV_VAL"
                            },
                            {
                                "variants": [],
                                "env": staging_env_id,
                                "value": "KAFKA_HOST_ENV_VAL"
                            }
                        ]
                    },
                    {
                        "description": "",
                        "key": "sasl",
                        "name": "SASL",
                        "type": "string",
                        "isSecret": false,
                        "values": [
                            {
                                "variants": [],
                                "env": development_env_id,
                                "value": "PLAINTEXT"
                            },
                            {
                                "variants": [],
                                "env": production_env_id,
                                "value": "SASL_SSL"
                            },
                            {
                                "variants": [],
                                "env": staging_env_id,
                                "value": "SASL_SSL"
                            }
                        ]
                    },
                    {
                        "description": "",
                        "key": "user",
                        "name": "User",
                        "type": "string",
                        "isSecret": false,
                        "values": [
                            {
                                "variants": [],
                                "env": development_env_id,
                                "value": ""
                            },
                            {
                                "variants": [],
                                "env": production_env_id,
                                "value": "KAFKA_API_KEY_ENV_VAL"
                            },
                            {
                                "variants": [],
                                "env": staging_env_id,
                                "value": "KAFKA_API_KEY_ENV_VAL"
                            }
                        ]
                    },
                    {
                        "description": "",
                        "key": "password",
                        "name": "Password",
                        "type": "string",
                        "isSecret": false,
                        "values": [
                            {
                                "variants": [],
                                "env": development_env_id,
                                "value": ""
                            },
                            {
                                "variants": [],
                                "env": production_env_id,
                                "value": "KAFKA_API_SECRET_ENV_VAL"
                            },
                            {
                                "variants": [],
                                "env": staging_env_id,
                                "value": "KAFKA_API_SECRET_ENV_VAL"
                            }
                        ]
                    }
                ],
                "name": "Kafka"
            },
            {
                "name": "client_settings",
                "is_private": false,
                "items": [
                    {
                        "name": "google_redirect_uri",
                        "values": [
                            {
                                "variants": [],
                                "value": "http://localhost:8010/auth/google/callback",
                                "env": development_env_id
                            },
                            {
                                "variants": [],
                                "value": "https://app.microkit.app/api/users/auth/google/callback",
                                "env": production_env_id
                            },
                            {
                                "variants": [],
                                "value": "https://app.stage.microkit.app/api/users/auth/google/callback",
                                "env": staging_env_id
                            }
                        ],
                        "defaultValue": "",
                        "description": "",
                        "isSecret": false,
                        "key": "google_redirect_uri",
                        "type": "string"
                    },
                    {
                        "name": "sentry_url",
                        "values": [
                            {
                                "variants": [],
                                "value": "",
                                "env": development_env_id
                            },
                            {
                                "variants": [],
                                "value": "https://9497b84f97a2441e8a646587bb417ab5@o1405792.ingest.sentry.io/6739180",
                                "env": production_env_id
                            },
                            {
                                "variants": [],
                                "value": "https://55a384aef441405693bab367472435cb@o1405792.ingest.sentry.io/6739164",
                                "env": staging_env_id
                            }
                        ],
                        "defaultValue": "",
                        "description": "",
                        "isSecret": false,
                        "key": "sentry_url",
                        "type": "string"
                    },
                    {
                        "name": "smartlook_token",
                        "values": [
                            {
                                "variants": [],
                                "value": "",
                                "env": development_env_id
                            },
                            {
                                "variants": [],
                                "value": "5570542f3713caff23cae6270206c56bdd1236fe",
                                "env": production_env_id
                            },
                            {
                                "variants": [],
                                "value": "",
                                "env": staging_env_id
                            }
                        ],
                        "defaultValue": "",
                        "description": "",
                        "isSecret": false,
                        "key": "smartlook_token",
                        "type": "string"
                    },
                    {
                        "description": "",
                        "key": "item_types",
                        "name": "item_types",
                        "type": "json",
                        "isSecret": false,
                        "values": [
                            {
                                "variants": [],
                                "env": development_env_id,
                                "value": "['string','number','boolean']"
                            },
                            {
                                "variants": [],
                                "env": production_env_id,
                                "value": "['string','number','boolean']"
                            },
                            {
                                "variants": [],
                                "env": staging_env_id,
                                "value": "['string','number','boolean']"
                            }
                        ]
                    },
                    {
                        "description": "",
                        "key": "operators_list",
                        "name": "Operators List",
                        "type": "string",
                        "isSecret": false,
                        "values": [
                            {
                                "variants": [],
                                "env": development_env_id,
                                "value": JSON.stringify({number: ["equals", "not equal", "greater than", "less than", "greater than or equals", "less than or equals"], string: ["is", "is not", "contains", "does not contain"], boolean: ["is"]})
                            },
                            {
                                "variants": [],
                                "env": production_env_id,
                                "value": JSON.stringify({number: ["equals", "not equal", "greater than", "less than", "greater than or equals", "less than or equals"], string: ["is", "is not", "contains", "does not contain"], boolean: ["is"]})
                            },
                            {
                                "variants": [],
                                "env": staging_env_id,
                                "value": JSON.stringify({number: ["equals", "not equal", "greater than", "less than", "greater than or equals", "less than or equals"], string: ["is", "is not", "contains", "does not contain"], boolean: ["is"]})
                            }
                        ]
                    },
                    {
                        "description": "",
                        "key": "target_group_types",
                        "name": "Target Group Types",
                        "type": "string",
                        "isSecret": false,
                        "values": [
                            {
                                "variants": [],
                                "env": development_env_id,
                                "value": JSON.stringify([{name: 'Rule Base', value: 1}, {name: 'Switch Board', value: 2}])
                            },
                            {
                                "variants": [],
                                "env": production_env_id,
                                "value": JSON.stringify([{name: 'Rule Base', value: 1}, {name: 'Switch Board', value: 2}])
                            },
                            {
                                "variants": [],
                                "env": staging_env_id,
                                "value": JSON.stringify([{name: 'Rule Base', value: 1}, {name: 'Switch Board', value: 2}])
                            }
                        ]
                    },
                    {
                        "description": "",
                        "key": "env_types",
                        "name": "Env Types",
                        "type": "string",
                        "isSecret": false,
                        "values": [
                            {
                                "variants": [],
                                "env": development_env_id,
                                "value": JSON.stringify([{"name": "Development","value": "1"},{"name": "Testing","value": "2"},{"name": "Staging","value": "3"},{"name": "Production","value": "4"}])
                            },
                            {
                                "variants": [],
                                "env": production_env_id,
                                "value": JSON.stringify([{"name": "Development","value": "1"},{"name": "Testing","value": "2"},{"name": "Staging","value": "3"},{"name": "Production","value": "4"}])
                            },
                            {
                                "variants": [],
                                "env": staging_env_id,
                                "value": JSON.stringify([{"name": "Development","value": "1"},{"name": "Testing","value": "2"},{"name": "Staging","value": "3"},{"name": "Production","value": "4"}])
                            }
                        ]
                    },
                    {
                        "name": "plans",
                        "key": "plans",
                        "type": "string",
                        "defaultValue": "",
                        "isSecret": false,
                        "values": [
                            {
                                "variants": [],
                                "env": development_env_id,
                                "value": "[     {         \"key\": \"pro_yearly\",         \"name\": \"Pro Yearly\",         \"provider_plan_id\": \"39986\",         \"users\": 25,         \"project\": 10000,         \"mau\": 10,         \"max_mau\": 300,         \"environment\": 10000,         \"price\": 25     },     {         \"key\": \"pro_monthly\",         \"name\": \"Pro Monthly\",         \"provider_plan_id\": \"39947\",         \"users\": 25,         \"project\": 10000,         \"mau\": 10,         \"max_mau\": 300,         \"environment\": 10000,         \"price\": 30     },     {         \"key\": \"basic_yearly\",         \"name\": \"Basic Yearly\",         \"provider_plan_id\": \"39985\",         \"users\": 3,         \"project\": 2,         \"mau\": 1,         \"max_mau\": 10,         \"environment\": 5,         \"price\": 8     },     {         \"key\": \"basic_monthly\",         \"name\": \"Basic Monthly\",         \"provider_plan_id\": \"39816\",         \"users\": 3,         \"project\": 2,         \"mau\": 1,         \"max_mau\": 10,         \"environment\": 5,         \"price\": 10     } ]"
                            },
                            {
                                "variants": [],
                                "env": production_env_id,
                                "value": "[     {         \"key\": \"pro_yearly\",         \"name\": \"Pro Yearly\",         \"provider_plan_id\": \"804923\",         \"users\": 25,         \"project\": 10000,         \"mau\": 10,         \"max_mau\": 300,         \"environment\": 10000,         \"price\": 25     },     {         \"key\": \"pro_monthly\",         \"name\": \"Pro Monthly\",         \"provider_plan_id\": \"804925\",         \"users\": 25,         \"project\": 10000,         \"mau\": 10,         \"max_mau\": 300,         \"environment\": 10000,         \"price\": 30     },     {         \"key\": \"basic_yearly\",         \"name\": \"Basic Yearly\",         \"provider_plan_id\": \"804924\",         \"users\": 3,         \"project\": 2,         \"mau\": 1,         \"max_mau\": 10,         \"environment\": 5,         \"price\": 8     },     {         \"key\": \"basic_monthly\",         \"name\": \"Basic Monthly\",         \"provider_plan_id\": \"804926\",         \"users\": 3,         \"project\": 2,         \"mau\": 1,         \"max_mau\": 10,         \"environment\": 5,         \"price\": 10     } ]"
                            },
                            {
                                "variants": [],
                                "env": staging_env_id,
                                "value": "[     {         \"key\": \"pro_yearly\",         \"name\": \"Pro Yearly\",         \"provider_plan_id\": \"39986\",         \"users\": 25,         \"project\": 10000,         \"mau\": 10,         \"max_mau\": 300,         \"environment\": 10000,         \"price\": 25     },     {         \"key\": \"pro_monthly\",         \"name\": \"Pro Monthly\",         \"provider_plan_id\": \"39947\",         \"users\": 25,         \"project\": 10000,         \"mau\": 10,         \"max_mau\": 300,         \"environment\": 10000,         \"price\": 30     },     {         \"key\": \"basic_yearly\",         \"name\": \"Basic Yearly\",         \"provider_plan_id\": \"39985\",         \"users\": 3,         \"project\": 2,         \"mau\": 1,         \"max_mau\": 10,         \"environment\": 5,         \"price\": 8     },     {         \"key\": \"basic_monthly\",         \"name\": \"Basic Monthly\",         \"provider_plan_id\": \"39816\",         \"users\": 3,         \"project\": 2,         \"mau\": 1,         \"max_mau\": 10,         \"environment\": 5,         \"price\": 10     } ]"
                            }
                        ]
                    },
                    {
                        "name": "vendor id",
                        "key": "vendor_id",
                        "type": "number",
                        "defaultValue": "",
                        "description": "",
                        "isSecret": false,
                        "values": [
                            {
                                "variants": [],
                                "env": development_env_id,
                                "value": "9215"
                            },
                            {
                                "variants": [],
                                "env": production_env_id,
                                "value": "160888"
                            },
                            {
                                "variants": [],
                                "env": staging_env_id,
                                "value": "9215"
                            }
                        ]
                    },
                    {
                        "name": "paddle sandbox",
                        "key": "paddle_sandbox",
                        "type": "boolean",
                        "defaultValue": "",
                        "description": "",
                        "isSecret": false,
                        "values": [
                            {
                                "variants": [],
                                "env": development_env_id,
                                "value": true
                            },
                            {
                                "variants": [],
                                "env": production_env_id,
                                "value": false
                            },
                            {
                                "variants": [],
                                "env": staging_env_id,
                                "value": true
                            }
                        ]
                    },
                    {
                        "groupKey": "client_settings",
                        "name": "Default environment Data",
                        "key": "default_environment_data",
                        "type": "string",
                        "defaultValue": "[{\"name\":\"Development\",\"key\":\"development\",\"type\":1,\"description\":\"\",\"position\": 2,\"color\":\"#9EE86A\"},{\"name\":\"Staging\", \"key\":\"staging\", \"type\":3,\"description\":\"\",\"position\": 2,\"color\":\"#0E44F0\"},{\"name\":\"Production\",\"key\":\"production\",\"type\":4,\"description\":\"\",\"position\": 3, \"color\":\"#EF2FA2\"}]",
                        "isSecret": false,
                        "values": [
                            {
                                "env": development_env_id,
                                "value": "[{\"name\":\"Development\",\"key\":\"development\",\"type\":1,\"description\":\"\",\"position\": 2,\"color\":\"#9EE86A\"},{\"name\":\"Staging\", \"key\":\"staging\", \"type\":3,\"description\":\"\",\"position\": 2,\"color\":\"#0E44F0\"},{\"name\":\"Production\",\"key\":\"production\",\"type\":4,\"description\":\"\",\"position\": 3, \"color\":\"#EF2FA2\"}]",
                                "variants": []
                            },
                            {
                                "env": production_env_id,
                                "value": "[{\"name\":\"Development\",\"key\":\"development\",\"type\":1,\"description\":\"\",\"position\": 2,\"color\":\"#9EE86A\"},{\"name\":\"Staging\", \"key\":\"staging\", \"type\":3,\"description\":\"\",\"position\": 2,\"color\":\"#0E44F0\"},{\"name\":\"Production\",\"key\":\"production\",\"type\":4,\"description\":\"\",\"position\": 3, \"color\":\"#EF2FA2\"}]",
                                "variants": []
                            },
                            {
                                "env": staging_env_id,
                                "value": "[{\"name\":\"Development\",\"key\":\"development\",\"type\":1,\"description\":\"\",\"position\": 2,\"color\":\"#9EE86A\"},{\"name\":\"Staging\", \"key\":\"staging\", \"type\":3,\"description\":\"\",\"position\": 2,\"color\":\"#0E44F0\"},{\"name\":\"Production\",\"key\":\"production\",\"type\":4,\"description\":\"\",\"position\": 3, \"color\":\"#EF2FA2\"}]",
                                "variants": []
                            }
                        ]
                    }
                ],
                "key": "client_settings"
            },
            {
                    "name": "paddle api",
                    "key": "paddle_api",
                    "is_private": true,
                    "items": [
                        {
                            "name": "vendor id",
                            "key": "vendor_id",
                            "type": "string",
                            "defaultValue": "",
                            "description": "",
                            "isSecret": false,
                            "values": [
                                {
                                    "variants": [],
                                    "env": development_env_id,
                                    "value": "9215"
                                },
                                {
                                    "variants": [],
                                    "env": production_env_id,
                                    "value": "160888"
                                },
                                {
                                    "variants": [],
                                    "env": staging_env_id,
                                    "value": "9215"
                                }
                            ]
                        },
                        {
                            "name": "access key",
                            "key": "access_key",
                            "type": "string",
                            "defaultValue": "",
                            "description": "",
                            "isSecret": true,
                            "values": [
                                {
                                    "variants": [],
                                    "env": development_env_id,
                                    "value": "b18dca669270a3aa88d20065a7f245593e7ced336df80ffea7"
                                },
                                {
                                    "variants": [],
                                    "env": production_env_id,
                                    "value": "PADDLE_API_KEY_ENV_VAL"
                                },
                                {
                                    "variants": [],
                                    "env": staging_env_id,
                                    "value": "b18dca669270a3aa88d20065a7f245593e7ced336df80ffea7"
                                }
                            ]
                        },
                        {
                            "name": "url",
                            "key": "url",
                            "type": "string",
                            "defaultValue": "",
                            "description": "",
                            "isSecret": false,
                            "values": [
                                {
                                    "variants": [],
                                    "env": development_env_id,
                                    "value": "https://sandbox-vendors.paddle.com/api/2.0/"
                                },
                                {
                                    "variants": [],
                                    "env": production_env_id,
                                    "value": "https://vendors.paddle.com/api/2.0/"
                                },
                                {
                                    "variants": [],
                                    "env": staging_env_id,
                                    "value": "https://sandbox-vendors.paddle.com/api/2.0/"
                                }
                            ]
                        }
                    ]
                }
        ]
    })
    ]);
    console.log("new configurations wew inserted");
}

initConfig().then(() => {
    dbClose();
    process.exit();
}).catch(err => { console.log(err) });

