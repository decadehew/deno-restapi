import { Application, Router } from 'https://deno.land/x/oak/mod.ts'
import cors from './src/cors.js'

const env = Deno.env.toObject()
const PORT = env.PORT || 6060
const HOST = env.HOST || '127.0.0.1'

interface Dog {
  id: string | any
  imgLink: string
}

let dogs: Array<Dog> = [
  {
    id: 'qO-PIF84Vxg',
    imgLink: `https://source.unsplash.com/qO-PIF84Vxg/400x300`,
  },
  {
    id: 'UtrE5DcgEyg',
    imgLink: `https://source.unsplash.com/UtrE5DcgEyg/400x300`,
  },
  {
    id: 'ngqyo2AYYnE',
    imgLink: 'https://source.unsplash.com/915UJQaxtrk/400x300',
  },
  {
    id: '915UJQaxtrk',
    imgLink: 'https://source.unsplash.com/ngqyo2AYYnE/400x300',
  },
  {
    id: 'uNNCs5kL70Q',
    imgLink: 'https://source.unsplash.com/uNNCs5kL70Q/400x300',
  },
  {
    id: '915UJQaxtrk',
    imgLink: 'https://source.unsplash.com/2l0CWTpcChI/400x300',
  },
  {
    id: 'P8_RmeffU-w',
    imgLink: 'https://source.unsplash.com/P8_RmeffU-w/400x300',
  },
  {
    id: 'wcO2PWLuQ3U',
    imgLink: 'https://source.unsplash.com/wcO2PWLuQ3U/400x300',
  }
]

export const getDogs = ({ response }: { response: any }) => {
  response.body = dogs
}

export const getDog = ({
  params,
  response,
}: {
  params: {
    id: string
  }
  response: any
}) => {
  const dog = dogs.filter((dog) => dog.id === params.id)
  if (dog.length) {
    response.status = 200
    response.body = dog[0]
    return
  }

  response.status = 400
  response.body = { msg: `Cannot find dog ${params.id}` }
}

export const addDog = async ({
  request,
  response,
}: {
  request: any
  response: any
}) => {
  const body = await request.body()
  const { id, imgLink }: { id: string; imgLink: string } = body.value
  dogs.push({
    id: id,
    imgLink: imgLink,
  })

  response.body = { msg: 'OK' }
  response.status = 200
}

export const updateDog = async ({
  params,
  request,
  response,
}: {
  params: {
    id: string
  }
  request: any
  response: any
}) => {
  const temp = dogs.filter((existingDog) => existingDog.id === params.id)
  const body = await request.body()
  const { imgLink }: { imgLink: string } = body.value

  if (temp.length) {
    temp[0].imgLink = imgLink
    response.status = 200
    response.body = { msg: 'OK' }
    return
  }

  response.status = 400
  response.body = { msg: `Cannot find dog ${params.id}` }
}

export const removeDog = ({
  params,
  response,
}: {
  params: {
    id: string
  }
  response: any
}) => {
  const lengthBefore = dogs.length
  dogs = dogs.filter((dog) => dog.id !== params.id)

  if (dogs.length === lengthBefore) {
    response.status = 400
    response.body = { msg: `Cannot find dog ${params.id}` }
    return
  }

  response.body = { msg: 'OK' }
  response.status = 200
}

const router = new Router()
router
  .get('/dogs', getDogs)
  .get('/dogs/:id', getDog)
  .post('/dogs', addDog)
  .put('/dogs/:id', updateDog)
  .delete('/dogs/:id', removeDog)

const app = new Application()

app.use(cors({ origin: true }))
app.use(router.routes())
app.use(router.allowedMethods())

console.log(`Listening on port ${PORT}...`)

await app.listen(`${HOST}:${PORT}`)
