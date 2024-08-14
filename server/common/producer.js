const { Kafka } = require('kafkajs')
const { getRedisClient } = require('../redis')
const { produceViaFile } = require('./file-producer')

const CONFIGURATIONS_PARSER_TOPIC = "configurations-parser"
const CONFIGURATIONS_PARSER_KEY = null // null means that all messages will go to different partitions, and therefore will bot be handled synchronously 
const CONFIGURATIONS_PARSER_CLIENT_ID = "configProducer"


const FEATURES_PARSER_TOPIC = "features-parser"
const FEATURES_PARSER_KEY = null // null means that all messages will go to different partitions, and therefore will bot be handled synchronously 
const FEATURES_PARSER_CLIENT_ID = "featureProducer"

const PERMISSIONS_PARSER_TOPIC = "permissions-parser"
const PERMISSIONS_PARSER_KEY = null // null means that all messages will go to different partitions, and therefore will bot be handled synchronously 
const PERMISSIONS_PARSER_CLIENT_ID = "permissionProducer"

const sendMessages = async (topic, messages, key, clientId) => {
    if (process.env.PRODCER_TYPE == 'file') {
        const client = await getRedisClient()
        client.RPUSH(topic, JSON.stringify(messages))
        //client.RPUSH(CONFIGURATIONS_PARSER_TOPIC, JSON.stringify(messages))
        // produceViaFile(FEATURES_PARSER_TOPIC, projectId)
        // produceViaFile(CONFIGURATIONS_PARSER_TOPIC, projectId)
    } else {
        // Define Kafka
        const username = process.env.KAFKA_USER;
        const password = process.env.KAFKA_PASSWORD;
        const brokers = [process.env.KAFKA_HOST];
        const sasl = username && password ? {username, password, mechanism: 'plain' } : null;
        const ssl = !!sasl;
        
        const kafka = new Kafka({clientId, brokers, ssl, sasl});
    
        // Producing
        const producer = kafka.producer()
        await producer.connect();
        await producer.send({
            key,
            topic,
            messages: messages.map((message)=>{return {value: JSON.stringify(message)}})
        });
    }
}


const parseProject = async (projectId, type = 'all') =>{
    //  if (['all', 'features'].indexOf(type) > -1 ) {
    //      featureResponse = await sendMessages(FEATURES_PARSER_TOPIC, {ProjectId: projectId}, FEATURES_PARSER_KEY, FEATURES_PARSER_CLIENT_ID);
    //  }
    //  if (['all', 'config'].indexOf(type) > -1 ) {
    //      configResponse = await sendMessages(CONFIGURATIONS_PARSER_TOPIC, {ProjectId: projectId}, CONFIGURATIONS_PARSER_KEY, CONFIGURATIONS_PARSER_CLIENT_ID);
    //  }
    //  if (['all', 'permissions'].indexOf(type) > -1 ) {
    //      configResponse = await sendMessages(PERMISSIONS_PARSER_TOPIC, {ProjectId: projectId}, PERMISSIONS_PARSER_KEY, PERMISSIONS_PARSER_CLIENT_ID);
    //  }
}

module.exports.parseProject = parseProject;
