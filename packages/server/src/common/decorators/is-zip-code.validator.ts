import { buildMessage, ValidateBy } from 'class-validator';
import { ValidationOptions } from 'joi';

export function isZipCode(value: unknown): boolean {
  return (
    typeof value === 'number' &&
    Number.isInteger(value) &&
    value > 0 &&
    value < 100_000 &&
    value.toString().length === 5
  );
}

export function IsZipCode(validationOptions?: ValidationOptions): PropertyDecorator {
  return ValidateBy(
    {
      name: 'isZipCode',
      validator: {
        validate: isZipCode,
        defaultMessage: buildMessage(
          (eachPrefix) => `${eachPrefix}$property must be a valid 5-digit zip code`,
          validationOptions,
        ),
      },
    },
    validationOptions,
  );
}
