import amql from "amqplib";
let channel;
//creating channel and connection to rabbitmq server
export const connectRabbitMQ = async () => {
    try {
        const connection = await amql.connect({
            protocol: "amqp",
            hostname: process.env.Rabbitmq_Host,
            port: 5672,
            username: process.env.Rabbitmq_Username,
            password: process.env.Rabbitmq_Password,
        });
        channel = await connection.createChannel();
        console.log("✅ connected to rabbitmq");
    }
    catch (error) {
        console.log("Failed to connect to rabbitmq", error);
    }
};
//0. RabbitMQ is used as a message broker — it helps different parts of your system communicate asynchronously and reliably.
//1.publishToQueue() sends data from the producer side, and RabbitMQ’s queue temporarily stores it until some consumer service reads and handles it.
//2.producer --> queue --> consumer
//3.Buffer convet JS into binary buffer , persistent stores message in disk
//4. { durable: true } means the queue will survive a RabbitMQ server restart, making it more reliable.
export const publishToQueue = async (queuename, message) => {
    if (!channel) {
        throw new Error("Rabitmq is not initialised");
    }
    await channel.assertQueue(queuename, { durable: true });
    channel.sendToQueue(queuename, Buffer.from(JSON.stringify(message)), { persistent: true });
};
//# sourceMappingURL=rabbitmq.js.map