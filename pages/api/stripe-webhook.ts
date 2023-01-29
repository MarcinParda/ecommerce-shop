import { NextApiHandler } from 'next';

const stripeWebhookHandler: NextApiHandler = async (req, res) => {
  //TODO: Verify signing secret
  console.log(req.body);
  const event = req.body;

  switch (event.type) {
    case 'checkout.session.completed':
      // TODO: Zaktualizuje stan zamówienia w GraphCMS
      return;
  }

  res.status(204).end();
};

export default stripeWebhookHandler;
