import { Router } from 'express'
import agent from '../agents/code.agent.js'
const router = Router()

router.post('/invoke', async (req, res) => {
  try {
    const { message, projectId } = req.body

    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive'
    })

    const writer = (text) => res.write(text);

    const response = await agent.stream(
      {
        messages: [
          {
            role: 'user',
            content: message
          }
        ]
      },
      {
        context: {
          projectId,
          writer
        },
        streamMode: 'values'
      }
    )

    for await (const chunk of stream) {
      res.write(`data: ${JSON.stringify(chunk)}\n\n`)
    }

    res.end();
  } catch (error) {
    if (res.headersSent){ res.end(); }
    else { res.status(500).json({ error: "Failed to invoke agent" }); }
  }
})

export default router
