import express, { Application } from 'express';

class Server {
  public app: Application;
  private port: number;

  constructor(port: number) {
    this.app = express();
    this.port = port;
  }

  public start() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on http://localhost:${this.port}`);
    });
  }
}

export default Server;
