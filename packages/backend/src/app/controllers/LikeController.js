import Dev from '../models/Dev'

export default {
  async store(req, res) {
    const { user } = req.headers
    const { devId } = req.params

    const loggedDev = await Dev.findById(user)
    const targetDev = await Dev.findById(devId)

    if (!targetDev) {
      return res.status(400).json({ error: 'Dev not exists' })
    }

    if (targetDev.likes.includes(user)) {
      const loggedSocket = req.connectedUsers[user]
      const targetSocket = req.connectedUsers[devId]

      if (loggedSocket) req.io.to(loggedSocket).emit('match', targetDev)
      if (targetSocket) req.io.to(targetSocket).emit('match', loggedDev)
    }

    loggedDev.likes.push(devId)

    await loggedDev.save()

    return res.json(loggedDev)
  },
}
