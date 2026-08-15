# Consent module

The consent system is installed once in `src/main.ts` and exposed to Vue components through `useConsent()`.

## Add a category

1. Add the category to `src/modules/consent/config.ts`. Required categories are always enabled; optional categories default to disabled.
2. Add the category title and description keys to both locale files.
3. Add one or more services whose `categoryId` matches the new category.

## Add a consent-gated service

Implement the `ConsentService` interface:

```ts
const service = {
  id: 'example-service',
  categoryId: 'analytics',
  activate: () => loadExampleService(),
  deactivate: () => disableExampleService(),
} satisfies ConsentService
```

Register the service in the `services` array passed to `createConsentModule()` in `src/main.ts`. The module calls `activate` only after that category is allowed, and calls `deactivate` when consent is absent or withdrawn.

The saved record is versioned. Change `policyVersion` whenever the purposes or services change materially so visitors are asked for consent again.

This module supplies the website's technical consent controls. Before enabling a service that can communicate personal information outside Quebec, the organization should also complete the required privacy impact assessment, contractual review, and internal approval process.
