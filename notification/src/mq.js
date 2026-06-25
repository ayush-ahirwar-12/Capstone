import amqplib from 'amqplib';
const queue = 'notification_queue';

const connection = await amqplib.connect(process.env.RABBITMQ_URL);
const channel = await connection.createChannel();
channel.assertQueue(queue, { durable: true });

export default channel;