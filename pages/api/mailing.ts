import { NextApiHandler } from 'next';

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== 'POST') {
    return res
      .setHeader('Allow', 'POST')
      .status(405)
      .end(`Method ${req.method} Not Allowed`);
  }

  const email = req.body.email;
  if (typeof email !== 'string') {
    return res.status(400).json({ message: 'Email is required' });
  }

  console.log(process.env.MAILERLITE_API_KEY, process.env.MAILERLITE_GROUP_ID);

  if (!process.env.MAILERLITE_API_KEY || !process.env.MAILERLITE_GROUP_ID) {
    return res
      .status(500)
      .json({ message: 'Nie podano zmiennych środowiskowych' });
  }

  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-MailerLite-ApiKey': process.env.MAILERLITE_API_KEY,
    },
    body: JSON.stringify({
      email,
    }),
  };

  const mailerliteResponse = await fetch(
    `https://api.mailerlite.com/api/v2/groups/${process.env.MAILERLITE_GROUP_ID}/subscribers`,
    options
  );

  if (!mailerliteResponse.ok) {
    return res
      .status(500)
      .json({ message: 'Pojawił się problem przy zapisie do Newslettera' });
  }

  return res.status(201).json({});
};

export default handler;
