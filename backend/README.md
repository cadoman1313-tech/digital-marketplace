# Backend Structure

PHP API files will live here. This foundation separates HTTP entry points, route definitions, controllers, domain services, models, and persistence code before implementation begins.

```text
backend/
  public/              Future web entry point
  src/
    Config/            Environment and application configuration
    Controllers/       Request handlers grouped by product area
    Middleware/        Auth, validation, CORS, and request middleware
    Models/            Domain models and data transfer objects
    Repositories/      Database access classes
    Routes/            API route registration
    Services/          Business logic and integration services
    Support/           Shared helpers and infrastructure
  storage/             Runtime storage ignored where appropriate
  tests/               Future unit and feature tests
```

Keep business rules in services and repositories rather than embedding them in controllers.
