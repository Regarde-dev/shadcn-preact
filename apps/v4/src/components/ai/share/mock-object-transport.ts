/**
 * Mock Object Transport for Testing
 *
 * Simulates streaming object generation for development and testing.
 * Gradually builds up objects field by field to demonstrate partial updates.
 */

import type { DeepPartial, ObjectTransport } from '@ai/hooks/useObject';

/**
 * Mock transport that simulates streaming object generation
 */
export class MockObjectTransport<SCHEMA> implements ObjectTransport<SCHEMA> {
  constructor() {
    // No configuration needed for mock transport
  }

  async streamObject(params: {
    input: unknown;
    abortSignal?: AbortSignal;
  }): Promise<ReadableStream<DeepPartial<SCHEMA>>> {
    const { input, abortSignal } = params;

    return new ReadableStream({
      async start(controller) {
        try {
          // Determine which mock response to use based on input
          const inputStr = String(input).toLowerCase();

          if (inputStr.includes('user') || inputStr.includes('profile')) {
            await streamUserProfile(controller, abortSignal);
          } else if (inputStr.includes('product')) {
            await streamProduct(controller, abortSignal);
          } else if (inputStr.includes('recipe')) {
            await streamRecipe(controller, abortSignal);
          } else {
            await streamGenericObject(controller, abortSignal);
          }

          controller.close();
        } catch (error) {
          if (error instanceof Error && error.name === 'AbortError') {
            controller.close();
          } else {
            controller.error(error);
          }
        }
      },
    });

    /**
     * Stream a user profile object
     */
    async function streamUserProfile(
      controller: ReadableStreamDefaultController<DeepPartial<SCHEMA>>,
      abortSignal?: AbortSignal,
    ) {
      const steps: DeepPartial<SCHEMA>[] = [
        { name: 'John' } as DeepPartial<SCHEMA>,
        { name: 'John', age: 30 } as DeepPartial<SCHEMA>,
        { name: 'John', age: 30, email: 'john@' } as DeepPartial<SCHEMA>,
        { name: 'John', age: 30, email: 'john@example.com' } as DeepPartial<SCHEMA>,
        {
          name: 'John',
          age: 30,
          email: 'john@example.com',
          bio: 'Software engineer',
        } as DeepPartial<SCHEMA>,
        {
          name: 'John',
          age: 30,
          email: 'john@example.com',
          bio: 'Software engineer with 10 years of experience',
        } as DeepPartial<SCHEMA>,
      ];

      for (const step of steps) {
        if (abortSignal?.aborted) {
          throw new DOMException('Aborted', 'AbortError');
        }
        controller.enqueue(step);
        await sleep(100);
      }
    }

    /**
     * Stream a product object
     */
    async function streamProduct(
      controller: ReadableStreamDefaultController<DeepPartial<SCHEMA>>,
      abortSignal?: AbortSignal,
    ) {
      const steps: DeepPartial<SCHEMA>[] = [
        { name: 'Laptop' } as DeepPartial<SCHEMA>,
        { name: 'Laptop', price: 999 } as DeepPartial<SCHEMA>,
        { name: 'Laptop', price: 999.99, category: 'Electronics' } as DeepPartial<SCHEMA>,
        {
          name: 'Laptop',
          price: 999.99,
          category: 'Electronics',
          description: 'High-performance',
        } as DeepPartial<SCHEMA>,
        {
          name: 'Laptop',
          price: 999.99,
          category: 'Electronics',
          description: 'High-performance laptop with 16GB RAM',
        } as DeepPartial<SCHEMA>,
        {
          name: 'Laptop',
          price: 999.99,
          category: 'Electronics',
          description: 'High-performance laptop with 16GB RAM and 512GB SSD',
          inStock: true,
        } as DeepPartial<SCHEMA>,
      ];

      for (const step of steps) {
        if (abortSignal?.aborted) {
          throw new DOMException('Aborted', 'AbortError');
        }
        controller.enqueue(step);
        await sleep(100);
      }
    }

    /**
     * Stream a recipe object
     */
    async function streamRecipe(
      controller: ReadableStreamDefaultController<DeepPartial<SCHEMA>>,
      abortSignal?: AbortSignal,
    ) {
      const steps: DeepPartial<SCHEMA>[] = [
        { name: 'Chocolate' } as DeepPartial<SCHEMA>,
        { name: 'Chocolate Chip Cookies' } as DeepPartial<SCHEMA>,
        { name: 'Chocolate Chip Cookies', prepTime: 15 } as DeepPartial<SCHEMA>,
        {
          name: 'Chocolate Chip Cookies',
          prepTime: 15,
          cookTime: 12,
        } as DeepPartial<SCHEMA>,
        {
          name: 'Chocolate Chip Cookies',
          prepTime: 15,
          cookTime: 12,
          ingredients: ['flour'],
        } as DeepPartial<SCHEMA>,
        {
          name: 'Chocolate Chip Cookies',
          prepTime: 15,
          cookTime: 12,
          ingredients: ['flour', 'sugar', 'butter'],
        } as DeepPartial<SCHEMA>,
        {
          name: 'Chocolate Chip Cookies',
          prepTime: 15,
          cookTime: 12,
          ingredients: ['flour', 'sugar', 'butter', 'eggs', 'chocolate chips'],
        } as DeepPartial<SCHEMA>,
        {
          name: 'Chocolate Chip Cookies',
          prepTime: 15,
          cookTime: 12,
          ingredients: ['flour', 'sugar', 'butter', 'eggs', 'chocolate chips'],
          steps: ['Mix dry ingredients'],
        } as DeepPartial<SCHEMA>,
        {
          name: 'Chocolate Chip Cookies',
          prepTime: 15,
          cookTime: 12,
          ingredients: ['flour', 'sugar', 'butter', 'eggs', 'chocolate chips'],
          steps: ['Mix dry ingredients', 'Cream butter and sugar'],
        } as DeepPartial<SCHEMA>,
        {
          name: 'Chocolate Chip Cookies',
          prepTime: 15,
          cookTime: 12,
          ingredients: ['flour', 'sugar', 'butter', 'eggs', 'chocolate chips'],
          steps: ['Mix dry ingredients', 'Cream butter and sugar', 'Add eggs', 'Fold in chocolate chips', 'Bake at 350°F for 12 minutes'],
        } as DeepPartial<SCHEMA>,
      ];

      for (const step of steps) {
        if (abortSignal?.aborted) {
          throw new DOMException('Aborted', 'AbortError');
        }
        controller.enqueue(step);
        await sleep(100);
      }
    }

    /**
     * Stream a generic object
     */
    async function streamGenericObject(
      controller: ReadableStreamDefaultController<DeepPartial<SCHEMA>>,
      abortSignal?: AbortSignal,
    ) {
      const steps: DeepPartial<SCHEMA>[] = [
        { title: 'Example' } as DeepPartial<SCHEMA>,
        { title: 'Example Object' } as DeepPartial<SCHEMA>,
        { title: 'Example Object', content: 'This is' } as DeepPartial<SCHEMA>,
        { title: 'Example Object', content: 'This is a sample object' } as DeepPartial<SCHEMA>,
        {
          title: 'Example Object',
          content: 'This is a sample object generated by the mock transport',
        } as DeepPartial<SCHEMA>,
      ];

      for (const step of steps) {
        if (abortSignal?.aborted) {
          throw new DOMException('Aborted', 'AbortError');
        }
        controller.enqueue(step);
        await sleep(100);
      }
    }

    function sleep(ms: number): Promise<void> {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
  }
}

