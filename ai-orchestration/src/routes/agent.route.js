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
          projectId
        },
        streamMode: 'values'
      }
    )

    for await (const chunk of response) {
      console.log(JSON.stringify(chunk, null, 2))

      res.write(`data: ${JSON.stringify(chunk)}\n\n`)
    }

    // res.json({ response })
    res.end()
  } catch (error) {
    console.error('Error invoking agent:', error)
    res.status(500).json({ error: 'Failed to invoke agent' })
  }
})

export default router
