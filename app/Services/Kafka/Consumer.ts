import { Kafka, Consumer as KafkaConsumer } from 'kafkajs'

interface InterfaceConsume {
  groupId: string
}

interface InterfaceConsume {
  topic: string
  fromBeginning: boolean
}

export default class Consumer {
  private consumer: KafkaConsumer

  constructor({ groupId }: InterfaceConsume) {
    const kafka = new Kafka({
      brokers: ['localhost:9092'],
    })
    this.consumer = kafka.consumer({ groupId })
  }

  public async consume({ topic, fromBeginning }: InterfaceConsume) {
    await this.consumer.connect()
    await this.consumer.subscribe({ topic, fromBeginning })
    console.log(`Consuming topic ${topic}`)

    await this.consumer.run({
      eachMessage: async ({ message }) => {
        console.log({
          value: message.value?.toString(),
        })
        if (!message.value) {
          return
        }
        const payload = message.value.toString()
        console.log(payload)
      },
    })
  }
}
