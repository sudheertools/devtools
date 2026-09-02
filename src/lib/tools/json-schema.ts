interface SchemaProperty {
  type?: string;
  description?: string;
  required?: boolean;
  properties?: Record<string, SchemaProperty>;
  items?: SchemaProperty;
  enum?: unknown[];
  minimum?: number;
  maximum?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
}

interface JsonSchema {
  type?: string;
  properties?: Record<string, SchemaProperty>;
  required?: string[];
  additionalProperties?: boolean;
  enum?: unknown[];
  minimum?: number;
  maximum?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  items?: SchemaProperty;
}

interface ValidationError {
  path: string;
  message: string;
}

function validateValue(
  value: unknown,
  schema: SchemaProperty | JsonSchema,
  path: string
): ValidationError[] {
  const errors: ValidationError[] = [];

  if (schema.type) {
    const actualType = Array.isArray(value) ? "array" : typeof value;
    const expectedTypes = schema.type.split("|");

    if (!expectedTypes.includes(actualType)) {
      errors.push({
        path,
        message: `Expected type "${schema.type}", got "${actualType}".`,
      });
      return errors;
    }
  }

  if (schema.enum && !schema.enum.includes(value)) {
    errors.push({
      path,
      message: `Value must be one of: ${schema.enum.map((v) => JSON.stringify(v)).join(", ")}.`,
    });
  }

  if (typeof value === "number") {
    if (schema.minimum !== undefined && value < schema.minimum) {
      errors.push({ path, message: `Value must be at least ${schema.minimum}.` });
    }
    if (schema.maximum !== undefined && value > schema.maximum) {
      errors.push({ path, message: `Value must be at most ${schema.maximum}.` });
    }
  }

  if (typeof value === "string") {
    if (schema.minLength !== undefined && value.length < schema.minLength) {
      errors.push({ path, message: `String must be at least ${schema.minLength} characters.` });
    }
    if (schema.maxLength !== undefined && value.length > schema.maxLength) {
      errors.push({ path, message: `String must be at most ${schema.maxLength} characters.` });
    }
    if (schema.pattern) {
      try {
        const regex = new RegExp(schema.pattern);
        if (!regex.test(value)) {
          errors.push({ path, message: `String does not match pattern "${schema.pattern}".` });
        }
      } catch {
        errors.push({ path, message: `Invalid pattern "${schema.pattern}".` });
      }
    }
  }

  if (schema.properties && typeof value === "object" && value !== null && !Array.isArray(value)) {
    const obj = value as Record<string, unknown>;
    for (const [key, propSchema] of Object.entries(schema.properties)) {
      if (key in obj) {
        errors.push(...validateValue(obj[key], propSchema, `${path}.${key}`));
      }
    }
  }

  if (schema.items && Array.isArray(value)) {
    value.forEach((item, index) => {
      errors.push(...validateValue(item, schema.items!, `${path}[${index}]`));
    });
  }

  return errors;
}

export function validateJsonSchema(data: string, schemaStr: string): {
  valid: boolean;
  errors: ValidationError[];
} {
  try {
    const dataObj = JSON.parse(data);
    const schema = JSON.parse(schemaStr) as JsonSchema;

    const errors: ValidationError[] = [];

    if (schema.required && schema.properties) {
      for (const requiredField of schema.required) {
        if (!(requiredField in (dataObj as Record<string, unknown>))) {
          errors.push({
            path: requiredField,
            message: `Required property "${requiredField}" is missing.`,
          });
        }
      }
    }

    if (schema.properties) {
      for (const [key, propSchema] of Object.entries(schema.properties)) {
        if (key in (dataObj as Record<string, unknown>)) {
          errors.push(...validateValue((dataObj as Record<string, unknown>)[key], propSchema, key));
        }
      }
    }

    return { valid: errors.length === 0, errors };
  } catch (e) {
    return {
      valid: false,
      errors: [{ path: "", message: (e as Error).message }],
    };
  }
}
