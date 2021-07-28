import { Kafka, Producer as KafkaProducer } from 'kafkajs'

interface InterfaceMessage {
  value: string
}

interface InterfaceProduce {
  topic: string
  messages: InterfaceMessage[]
}

export default class Producer {
  private producer: KafkaProducer

  constructor() {
    const kafka = new Kafka({
      brokers: ['localhost: 9092'],
    })

    this.producer = kafka.producer()
  }

  public async produce({ topic, messages }: InterfaceProduce) {
    await this.producer.connect()
    await this.producer.send({
      topic,
      messages,
    })
    await this.producer.disconnect()
  }
}
