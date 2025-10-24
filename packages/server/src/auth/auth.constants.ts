import type { ApiSecurity } from '@nestjs/swagger';

/**
 * The `SecurityRequirementObject` type is not exported from `@nestjs/swagger` but we can manually derive it.
 */
type SecurityRequirementObject = Exclude<Parameters<typeof ApiSecurity>[0], string>;

/**
 * Creates a SecurityRequirementObject for the given security scheme type. This is used in the
 * {@link ApiSecurity} decorators to tell the Swagger UI what auth strategy to use for a given endpoint.
 */
function createSecurity<T extends string>(type: T): SecurityRequirementObject {
  return {
    [type]: [],
  } as Record<T, never[]>;
}

/**
 * Represents the JWT authentication strategy for CouncilWatch.
 */
export const JWT = 'jwt';

/**
 * Represents the "magic link" authentication strategy for CouncilWatch.
 */
export const MAGIC = 'magic';

/**
 * Tells the Swagger UI to use the JWT auth strategy for the decorated endpoint.
 */
export const JWT_SECURITY = createSecurity(JWT);
