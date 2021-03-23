// Imports the Google Cloud client library
const { PubSub } = require("@google-cloud/pubsub");
const asyncHandler = require("../middleware/async");

async function createOrderTopic(
  projectId = "automateterraform", // Your Google Cloud Platform project ID
  topicName = "order-topic", // Name for the new topic to create
  subscriptionName = "order-delivery-sub" // Name for the new subscription to create
) {
  // Instantiates a client
  const pubsub = new PubSub({ projectId });

  console.log("in createOrderTopic");

  // Creates a new topic
  const [topic] = await pubsub.createTopic(topicName);
  console.log(`Topic: ${topic.name} created.`);

  // Creates a subscription on that new topic
  const [subscription] = await topic.createSubscription(subscriptionName);
  console.log(`Subscription: ${subscription.name} created on Topic ${topic.name}.`);

  // Receive callbacks for new messages on the subscription
  subscription.on("message", (message) => {
    console.log(`Received message ${message.id}`);
    console.log(`Data: ${message.data}`);
    process.exit(0);
  });

  // Receive callbacks for errors on the subscription
  subscription.on("error", (error) => {
    console.error("Received error:", error);
    process.exit(1);
  });

  // Send a message to the topic
  const messageId = topic.publish(Buffer.from("Order created by the customer..."));
  console.log(`Published message ${messageId}`);
  return messageId;
}

exports.publishTopic = asyncHandler(async (req, res, next) => {
  const messageId = await createOrderTopic();
  res.status(200).json({
    success: true,
    data: `Message ${messageId} published `,
  });
});
