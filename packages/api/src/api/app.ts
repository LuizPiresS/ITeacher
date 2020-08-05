import express from 'express'
import { createConnection } from 'typeorm'

import connectionOptions from './ormconfig'
import { UserRoutes } from './route/user.route'

class App {
  public express: express.Application

  public constructor() {
    this.express = express()
    this.middlewares()
    this.routes()
  }

  private middlewares(): void {
    this.express.use(express.json())
    // this.express.use(cors);
  }

  private async routes(): Promise<void> {
    await createConnection(connectionOptions)
    UserRoutes()
  }
}

export default new App().express
