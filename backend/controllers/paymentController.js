require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { MongoClient } = require("mongodb");
const nm = require('nodemailer');
let client = new MongoClient(process.env.MONGO_URL, {
});
client.connect(err => {
  if (err) {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  } else {
    console.log('Connected to MongoDB');
  }
});
const userCollection = client.db('database').collection('users');


const endpointSecret = process.env.STRIPE_SIGNING_ACC;

async function convertPointsToSubscription(req, res) {
  const { email, pts } = req.query;
  try {
    const user = await userCollection.findOne({ email: email });
    if (!user) {
      return res.status(404).send("User not found");
    }
    const toDeductPts = parseInt(user.toDeduct) + parseInt(pts);
    console.log(toDeductPts);
    const updatedUser = await userCollection.updateOne(
      { email: email },
      { $set: { toDeduct: toDeductPts, isSubscribed: pts == 200 ? 1 : 2, subscriptionExpiry: Date.now() + 31536000000 } }
    );
    res.json(updatedUser);
  } catch (error) {
    res.status(500).send({ message: "An error occurred", error });
  }
}

async function handleWebhook(request, response) {
  const sig = request.headers['stripe-signature'];
    let event;
    try {
      event = stripe.webhooks.constructEvent(request.body, sig, process.env.STRIPE_SIGNING_ACC);
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
    console.log("Hello World");
    console.log(event.type);
    // Handle the event
    switch (event.type) {
      case 'checkout.session.async_payment_failed':
        session = event.data.object;
        console.log(session);
        // Then define and call a function to handle the event checkout.session.async_payment_failed
        break;
      case 'checkout.session.completed':
        session = event.data.object;
        const userCollection = client.db("database").collection("users");
        const user = await userCollection.findOne({ email: session.customer_details.email });
        if (user) {
          await userCollection.updateOne(
            {
              email: session.customer_details.email
            },
            {
              $set: { isSubscribed: true }
            }
          );
        }
        console.log(session);
        let emailto = session.customer_details.email
        pLink = session.payment_link;
        subscriptionNumber = 0;
        // Update user's subscription status
        if (pLink == process.env.YEARLY_SUBSCRIPTION_LINK) {
          // yearly subscription
          subscriptionNumber = 2;
          await userCollection.updateOne(
            { email: emailto },
            { $set: { isSubscribed: 2 } }
          );
          // set subscription expiry to 1 year from present date
          await userCollection.updateOne(
            { email: emailto },
            { $set: { subscriptionExpiry: Date.now() + 31536000000 } }
          );
        }
        else if (pLink == process.env.MONTHLY_SUBSCRIPTION_LINK) {
          // monthly subsscription
          subscriptionNumber = 1
          await userCollection.updateOne(
            { email: emailto },
            { $set: { isSubscribed: 2 } }
          );
          // set subscription expiry to 1 month from present date
          await userCollection.updateOne(
            { email: emailto },
            { $set: { subscriptionExpiry: Date.now() + 2592000000 } }
          );
        }

        // Then define and call a function to handle the event checkout.session.async_payment_succeeded
        let transporter = nm.createTransport(
          {
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
              user: process.env.EMAIL,
              pass: process.env.PASSWORD,
            }
          }
        );

        subscriptionType = subscriptionNumber == 2 ? "Yearly" : "Monthly";
        amountPaid = subscriptionNumber == 2 ? "Rs 499" : "Rs 199";
        // send mail with defined transporter object
        let info = await transporter.sendMail({
          from: process.env.EMAIL, // sender address
          to: emailto, // list of receivers
          subject: "Payment Successful", // Subject line
          text: "Payment Successful", // plain text body
          html: `
          <div class="container mt-6 mb-7">
            <div class="row justify-content-center">
              <div class="col-lg-12 col-xl-7">
                <div class="card">
                  <div class="card-body p-5">
                    <h2>
                      Hey ${session.customer_details.name},
                    </h2>
                    <p class="fs-sm">
                      This is the receipt for a payment of <strong>${amountPaid}</strong> (Rupees) you made to Twitter Subscription.
                    </p>

                    <div class="border-top border-gray-200 pt-4 mt-4">
                      <div class="row">
                        <div class="col-md-6">
                          <div class="text-muted mb-2">Payment No.</div>
                          <strong>#${session.subscription}</strong>
                        </div>
                        <div class="col-md-6 text-md-end">
                          <div class="text-muted mb-2">Payment Date</div>
                          <strong>${new Date.now() + 2592000000}</strong>
                        </div>
                      </div>
                    </div>

                    <div class="border-top border-gray-200 mt-4 py-4">
                      <div class="row">
                        <div class="col-md-6">
                          <div class="text-muted mb-2">Client</div>
                          <strong>
                            ${session.customer_details.name}
                          </strong>
                          <p class="fs-sm">

                            <br>
                            <a href="#!" class="text-purple">${session.customer_details.email}
                            </a>
                          </p>
                        </div>
                        <div class="col-md-6 text-md-end">
                          <div class="text-muted mb-2">Payment To</div>
                          <strong>
                            Twitter ${subscriptionType} Subscription
                          </strong>
                          <p class="fs-sm">
                            NIT Durgapur
                            <br>
                            <a href="#!" class="text-purple">avinash.80031@gmail.com
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>

                    <table class="table border-bottom border-gray-200 mt-3">
                      <thead>
                        <tr>
                          <th scope="col" class="fs-sm text-dark text-uppercase-bold-sm px-0">Description</th>
                          <th scope="col" class="fs-sm text-dark text-uppercase-bold-sm text-end px-0">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td class="px-0">${subscriptionType} Subscription</td>
                          <td class="text-end px-0">${amountPaid}</td>
                        </tr>
                      </tbody>
                    </table>

                    <div class="mt-5">
                      <div class="d-flex justify-content-end">
                        <p class="text-muted me-3">Subtotal:</p>
                        <span>${amountPaid}</span>
                      </div>
                      <div class="d-flex justify-content-end">

                      </div>
                      <div class="d-flex justify-content-end mt-3">
                        <h5 class="me-3">Total:</h5>
                        <h5 class="text-success">${amountPaid}</h5>
                      </div>
                    </div>
                  </div>
                  <a href="#!" class="btn btn-dark btn-lg card-footer-btn justify-content-center text-uppercase-bold-sm hover-lift-light">
                    <span class="svg-icon text-white me-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><title>ionicons-v5-g</title><path d="M336,208V113a80,80,0,0,0-160,0v95" style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"></path><rect x="96" y="208" width="320" height="272" rx="48" ry="48" style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"></rect></svg>
                    </span>
                    Payment Status : ${session.payment_status}
                  </a>
                </div>
              </div>
            </div>
          </div>
          `, // html body
        });
        console.log("Message sent ");

        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    response.send();
}

async function updateSubscription(userCollection, session) {
  const user = await userCollection.findOne({ email: session.customer_details.email });
  if (user) {
    const subscriptionDetails = getSubscriptionDetails(session.payment_link);
    await userCollection.updateOne(
      { email: session.customer_details.email },
      {
        $set: {
          isSubscribed: subscriptionDetails.subscriptionNumber,
          subscriptionExpiry: Date.now() + subscriptionDetails.expiryTime
        }
      }
    );

    sendSubscriptionEmail(session.customer_details.email, subscriptionDetails.amountPaid, subscriptionDetails.subscriptionType, session);
  }
}

function getSubscriptionDetails(paymentLink) {
  let subscriptionNumber = 0;
  let amountPaid = "";
  let subscriptionType = "";
  let expiryTime = 0;

  if (paymentLink === process.env.YEARLY_SUBSCRIPTION_LINK) {
    subscriptionNumber = 2;
    amountPaid = "Rs 499";
    subscriptionType = "Yearly";
    expiryTime = 31536000000; // 1 year
  } else if (paymentLink === process.env.MONTHLY_SUBSCRIPTION_LINK) {
    subscriptionNumber = 1;
    amountPaid = "Rs 199";
    subscriptionType = "Monthly";
    expiryTime = 2592000000; // 1 month
  }

  return { subscriptionNumber, amountPaid, subscriptionType, expiryTime };
}

async function sendSubscriptionEmail(email, amountPaid, subscriptionType, session) {
  const transporter = nm.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const emailHtml = generateEmailHtml(amountPaid, subscriptionType, session);

  await transporter.sendMail({
    from: process.env.EMAIL,
    to: email,
    subject: "Payment Successful",
    html: emailHtml,
  });
}

function generateEmailHtml(amountPaid, subscriptionType, session) {
  return `
    <div class="container mt-6 mb-7">
      <div class="row justify-content-center">
        <div class="col-lg-12 col-xl-7">
          <div class="card">
            <div class="card-body p-5">
              <h2>Hey ${session.customer_details.name},</h2>
              <p class="fs-sm">This is the receipt for a payment of <strong>${amountPaid}</strong> (Rupee) you made to Twitter Subscription.</p>
              <div class="border-top border-gray-200 pt-4 mt-4">
                <div class="row">
                  <div class="col-md-6">
                    <div class="text-muted mb-2">Payment No.</div>
                    <strong>#${session.subscription}</strong>
                  </div>
                  <div class="col-md-6 text-md-end">
                    <div class="text-muted mb-2">Payment Date</div>
                    <strong>${new Date(session.created * 1000)}</strong>
                  </div>
                </div>
              </div>
              <div class="border-top border-gray-200 mt-4 py-4">
                <div class="row">
                  <div class="col-md-6">
                    <div class="text-muted mb-2">Client</div>
                    <strong>${session.customer_details.name}</strong>
                    <p class="fs-sm"><a href="#!" class="text-purple">${session.customer_details.email}</a></p>
                  </div>
                  <div class="col-md-6 text-md-end">
                    <div class="text-muted mb-2">Payment To</div>
                    <strong>Twitter ${subscriptionType} Subscription</strong>
                    <p class="fs-sm">
                      NIT Durgapur<br>
                      <a href="#!" class="text-purple">avinash.80031@gmail.com</a>
                    </p>
                  </div>
                </div>
              </div>
              <table class="table border-bottom border-gray-200 mt-3">
                <thead>
                  <tr>
                    <th scope="col" class="fs-sm text-dark text-uppercase-bold-sm px-0">Description</th>
                    <th scope="col" class="fs-sm text-dark text-uppercase-bold-sm text-end px-0">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="px-0">${subscriptionType} Subscription</td>
                    <td class="text-end px-0">${amountPaid}</td>
                  </tr>
                </tbody>
              </table>
              <div class="mt-5">
                <div class="d-flex justify-content-end">
                  <p class="text-muted me-3">Subtotal:</p>
                  <span>${amountPaid}</span>
                </div>
                <div class="d-flex justify-content-end mt-3">
                  <h5 class="me-3">Total:</h5>
                  <h5 class="text-success">${amountPaid}</h5>
                </div>
              </div>
            </div>
            <a href="#!" class="btn btn-dark btn-lg card-footer-btn justify-content-center text-uppercase-bold-sm hover-lift-light">
              <span class="svg-icon text-white me-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
                  <title>ionicons-v5-g</title>
                  <path d="M336,208V113a80,80,0,0,0-160,0v95" style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"></path>
                  <rect x="96" y="208" width="320" height="272" rx="48" ry="48" style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"></rect>
                </svg>
              </span>
              Payment Status: ${session.payment_status}
            </a>
          </div>
        </div>
      </div>
    </div>
  `;
}

module.exports = { handleWebhook, convertPointsToSubscription };

