const SECRET_TOKEN = process.env.SECRET_TOKEN;

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const signature = req.headers['x-webhook-signature'];

    if (signature !== SECRET_TOKEN) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    try {
      const payload = req.body;
      console.log('Webhook received data:', payload);
      res.status(200).json({ message: 'Webhook received successfully' });
    } catch (error) {
      console.error('Error processing webhook:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
