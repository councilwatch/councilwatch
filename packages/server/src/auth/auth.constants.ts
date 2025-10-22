function createSecurity<T extends string>(type: T): Record<T, never[]> {
  return {
    [type]: [],
  } as Record<T, never[]>;
}

export const JWT = 'jwt';
export const MAGIC = 'magic';

export const JWT_SECURITY = createSecurity(JWT);
