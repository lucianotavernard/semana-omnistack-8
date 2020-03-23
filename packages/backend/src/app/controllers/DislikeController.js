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

    loggedDev.likes.push(devId)

    await loggedDev.save()

    return res.json(loggedDev)
  },
}
