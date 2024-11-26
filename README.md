For each microservice:

1. Create a new NestJS service:
    ```bash
    nest new {service}
    ```

2. Add a `Dockerfile` to the service.

3. Update `docker-compose` to include the service, exposing a different port for each one.

4. Add `amqplib` to the service using Yarn:
    ```bash
    yarn add amqplib @nestjs/microservices @nestjs/config rabbitmq-plugins
    ```

5. Configure `app.module`, `main.ts`, `app.controller.ts`, and `app.service.ts` for the service:

### Main Configuration

In `main.ts`, set up the connection to RabbitMQ:

```typescript
async function bootstrap() {
    const configService = new ConfigService();
    const logger = new Logger('Bootstrap');
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
        PairModule,
        {
            transport: Transport.RMQ,
            options: {
                urls: [`${configService.get('RABBITMQ_URL')}`],
                prefetchCount: 1,
                queue: '{service}_queue',
                queueOptions: {
                    durable: false,
                },
            },
        }
    );

    await app.listen();
    logger.log(`{service} service started`);
}
bootstrap();
```

### Service Implementation

In `app.service.ts`, create the function that receives a number and returns a response.

### Controller Implementation

In `app.controller.ts`, call the service function:

```typescript
constructor(private readonly {service}Service: {Service}Service) {}

@MessagePattern('{service}')
public async {service}(@Payload() data: number): Promise<any> {  
    return this.{service}Service.{function}(data);
}
```

### Module Configuration

Set the controller and the service provider in `app.module.ts`.

Update `app.module.ts` and `app.service.ts` in `main` to include the service.


### Logs

The logs are located in the src directory of the docker container prueba-directo-pruebadirecto, in the file application.log

### Usage
The endpoint request must be a json object with the following structure:

```JSON
{
	"number": 8
}
```

replace the "8" with the number you want to send to the service.

### Environments

To use a different environment, simply add a .env.{[production || development || local]} file to ./main, with the following structure:

```ENV
RABBITMQ_URL=amqp://localhost:5672
SERVICE_PORT=3000
NODE_ENV={[production || development || local]}
```

You can use the env.example as a template.