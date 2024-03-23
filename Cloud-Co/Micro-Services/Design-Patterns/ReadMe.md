# Micro-Services Design-Patterns

## Overview

- **Database Per Service**: Each service has its own database, improving scalability and reducing coupling. More details can be found at [Microservices.io](https://microservices.io/patterns/data/database-per-service.html) and [AWS Prescriptive Guidance](https://docs.aws.amazon.com/prescriptive-guidance/latest/modernization-data-persistence/database-per-service.html).

- **Saga Pattern**: Manages data consistency across distributed transactions via a series of local transactions. Learn more at [Microservices.io - Saga](https://microservices.io/patterns/data/saga.html).

- **API Gateway**: Provides a single entry point for multiple microservices, simplifying client interactions. Information available at [Microservices.io - API Gateway](https://microservices.io/patterns/apigateway.html).

- **Aggregator Pattern**: Gathers data from various services to return a unified response. Details at [Microservices.io - Aggregator](https://microservices.io/patterns/data/aggregator.html).

- **Circuit Breaker**: Prevents failure in one service from cascading to others by monitoring for failures and redirecting traffic. More at [Martin Fowler - Circuit Breaker](https://martinfowler.com/bliki/CircuitBreaker.html).

- **CQRS (Command Query Responsibility Segregation)**: Separates read and write operations for improved performance and scalability. Learn more at [Microsoft - CQRS](https://docs.microsoft.com/en-us/azure/architecture/patterns/cqrs).

- **Asynchronous Messaging**: Enables services to communicate without waiting for responses, enhancing responsiveness. Details can be found at [AWS - Asynchronous Messaging](https://aws.amazon.com/messaging/).

- **Event Sourcing**: Tracks changes in application state as a sequence of events, facilitating state reconstruction. More information at [Event Sourcing](https://martinfowler.com/eaaDev/EventSourcing.html).

- **Strangler Pattern**: Gradually replaces parts of a monolithic application with microservices. Learn more at [Martin Fowler - StranglerFigApplication](https://martinfowler.com/bliki/StranglerFigApplication.html).

- **Decomposition Patterns**: Breaks down a monolith into microservices based on business capabilities, subdomains, or transactions. More details at [Microservices.io - Decomposition](https://microservices.io/patterns/decomposition/decompose-by-business-capability.html).

_Capital One Tech, Jan 9, 2024_
