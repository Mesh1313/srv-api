/**
 * Interface that defines the contract for entity conversion methods
 */
export interface IEntityConvertible<T> {
  /**
   * Converts the entity to a plain object
   * Must be implemented by each entity class
   */
  toPlainObject(): T;
}

/**
 * Abstract base class for TypeORM entities that provides generic conversion functionality
 *
 * @template T - The plain object type that this entity represents
 */
export abstract class BaseEntity<T> implements IEntityConvertible<T> {
  /**
   * Abstract method that must be implemented by each entity
   * Converts the entity instance to a plain object
   */
  abstract toPlainObject(): T;

  /**
   * Creates a new entity instance from a plain object
   * Generic implementation that works for most cases
   *
   * @param this - The constructor function (class reference)
   * @param plainObject - The plain object to convert to entity
   * @returns New entity instance
   */
  static fromPlainObject<TPlain>(this: new () => any, plainObject: Partial<TPlain>): any {
    // biome-ignore lint/complexity/noThisInStatic: Need to use 'this' to create instance of the correct subclass
    const entity = new this();

    // Get all enumerable properties from the plain object
    Object.keys(plainObject).forEach((key) => {
      const value = (plainObject as any)[key];
      if (value !== undefined) {
        // Use Object.defineProperty to ensure proper assignment
        try {
          (entity as any)[key] = value;
        } catch (error) {
          // Skip properties that cannot be assigned (like readonly properties)
          console.warn(`Could not assign property ${key} to entity:`, error);
        }
      }
    });

    return entity;
  }

  /**
   * Updates the current entity instance with data from a plain object
   * Generic implementation that excludes certain protected fields
   *
   * @param plainObject - The plain object containing update data
   * @param excludeFields - Array of field names to exclude from update (default: ['id', 'createdAt'])
   */
  updateFromPlainObject(plainObject: Partial<T>, excludeFields: string[] = ["id", "createdAt"]): void {
    Object.keys(plainObject).forEach((key) => {
      // Skip excluded fields
      if (excludeFields.includes(key)) {
        return;
      }

      const value = (plainObject as any)[key];
      if (value !== undefined) {
        try {
          (this as any)[key] = value;
        } catch (error) {
          // Skip properties that cannot be assigned
          console.warn(`Could not update property ${key} on entity:`, error);
        }
      }
    });
  }

  /**
   * Helper method to get a list of all properties that can be converted
   * Useful for debugging and validation
   */
  protected getConvertibleProperties(): string[] {
    const properties: string[] = [];

    // Get own properties
    Object.getOwnPropertyNames(this).forEach((prop) => {
      // Skip private properties and methods
      if (!prop.startsWith("_") && typeof (this as any)[prop] !== "function") {
        properties.push(prop);
      }
    });

    return properties;
  }

  /**
   * Validates that the entity has all required properties
   * Can be overridden in child classes for custom validation
   */
  protected validateEntity(): boolean {
    // Basic validation - can be extended in child classes
    return true;
  }
}
