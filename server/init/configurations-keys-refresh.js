const { Kafka } = require('kafkajs')

const microKitProjectId = '326762c7-10d6-4291-adb3-4312f063ba9e';
const sdkTestProjectId       =  '06e1b0c0-8160-4db2-a9c9-02ebe3ac898e';

const kafka = new Kafka({
  clientId: 'configProducerLocal',
  brokers: ['kafka:9092']
})

const producer = kafka.producer()

const run = async () => {
  // Producing
  await producer.connect()
  await producer.send({
    key: "parse-config",
    topic: 'configurations-parser',
    messages: [
        {
            value: JSON.stringify({ProjectId: microKitProjectId})
        },
        {
            value: JSON.stringify({ProjectId: sdkTestProjectId})
        },
    ],});
}

run().then(()=>{process.exit()}).catch(err=>{console.log(err); process.exit()});

