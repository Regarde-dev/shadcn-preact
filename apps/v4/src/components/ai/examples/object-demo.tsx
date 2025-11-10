/**
 * Object Demo Component
 *
 * Demonstrates the useObject hook with streaming object generation.
 * Shows real-time partial object updates as fields are populated.
 */

import { useState } from 'preact/compat';
import { z } from 'zod';
import { useObject } from '@ai/hooks/useObject';
import { MockObjectTransport } from '@ai/share/mock-object-transport';
import { Button } from '@ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@ui/card';
import { Label } from '@ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@ui/select';

// Define schemas for different object types
const userProfileSchema = z.object({
  name: z.string(),
  age: z.number(),
  email: z.string().email(),
  bio: z.string(),
});

const productSchema = z.object({
  name: z.string(),
  price: z.number(),
  category: z.string(),
  description: z.string(),
  inStock: z.boolean(),
});

const recipeSchema = z.object({
  name: z.string(),
  prepTime: z.number(),
  cookTime: z.number(),
  ingredients: z.array(z.string()),
  steps: z.array(z.string()),
});

type UserProfile = z.infer<typeof userProfileSchema>;
type Product = z.infer<typeof productSchema>;
type Recipe = z.infer<typeof recipeSchema>;

type ObjectType = 'user' | 'product' | 'recipe';

export function ObjectDemo() {
  const [objectType, setObjectType] = useState<ObjectType>('user');

  // Render different demos based on object type
  switch (objectType) {
    case 'user':
      return <UserProfileDemo objectType={objectType} setObjectType={setObjectType} />;
    case 'product':
      return <ProductDemo objectType={objectType} setObjectType={setObjectType} />;
    case 'recipe':
      return <RecipeDemo objectType={objectType} setObjectType={setObjectType} />;
  }
}

function UserProfileDemo({
  objectType,
  setObjectType,
}: {
  objectType: ObjectType;
  setObjectType: (type: ObjectType) => void;
}) {
  const { object, submit, isLoading, error, stop, clear } = useObject({
    api: new MockObjectTransport<UserProfile>(),
    schema: userProfileSchema,
    onFinish: (result) => {
      if (result.error) {
        console.error('Validation error:', result.error);
      } else {
        console.log('Final validated object:', result.object);
      }
    },
  });

  return (
    <ObjectDemoUI
      objectType={objectType}
      setObjectType={setObjectType}
      object={object}
      submit={() => submit('Generate a user profile')}
      isLoading={isLoading}
      error={error}
      stop={stop}
      clear={clear}
    />
  );
}

function ProductDemo({
  objectType,
  setObjectType,
}: {
  objectType: ObjectType;
  setObjectType: (type: ObjectType) => void;
}) {
  const { object, submit, isLoading, error, stop, clear } = useObject({
    api: new MockObjectTransport<Product>(),
    schema: productSchema,
    onFinish: (result) => {
      if (result.error) {
        console.error('Validation error:', result.error);
      } else {
        console.log('Final validated object:', result.object);
      }
    },
  });

  return (
    <ObjectDemoUI
      objectType={objectType}
      setObjectType={setObjectType}
      object={object}
      submit={() => submit('Generate a product')}
      isLoading={isLoading}
      error={error}
      stop={stop}
      clear={clear}
    />
  );
}

function RecipeDemo({
  objectType,
  setObjectType,
}: {
  objectType: ObjectType;
  setObjectType: (type: ObjectType) => void;
}) {
  const { object, submit, isLoading, error, stop, clear } = useObject({
    api: new MockObjectTransport<Recipe>(),
    schema: recipeSchema,
    onFinish: (result) => {
      if (result.error) {
        console.error('Validation error:', result.error);
      } else {
        console.log('Final validated object:', result.object);
      }
    },
  });

  return (
    <ObjectDemoUI
      objectType={objectType}
      setObjectType={setObjectType}
      object={object}
      submit={() => submit('Generate a recipe')}
      isLoading={isLoading}
      error={error}
      stop={stop}
      clear={clear}
    />
  );
}

function ObjectDemoUI({
  objectType,
  setObjectType,
  object,
  submit,
  isLoading,
  error,
  stop,
  clear,
}: {
  objectType: ObjectType;
  setObjectType: (type: ObjectType) => void;
  object: unknown;
  submit: () => void;
  isLoading: boolean;
  error: Error | undefined;
  stop: () => void;
  clear: () => void;
}) {

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Object Generation Demo</CardTitle>
        <CardDescription>
          Stream structured objects with real-time partial updates using Zod schema validation
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Object Type Selector */}
        <div className="space-y-2">
          <Label htmlFor="object-type">Object Type</Label>
          <Select
            value={objectType}
            onValueChange={(value) => {
              setObjectType(value as ObjectType);
              clear();
            }}
          >
            <SelectTrigger id="object-type">
              <SelectValue placeholder="Select object type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="user">User Profile</SelectItem>
              <SelectItem value="product">Product</SelectItem>
              <SelectItem value="recipe">Recipe</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            onClick={submit}
            disabled={isLoading}
          >
            {isLoading ? 'Generating...' : 'Generate Object'}
          </Button>
          {isLoading && (
            <Button
              onClick={stop}
              variant="outline"
            >
              Stop
            </Button>
          )}
          {object && !isLoading && (
            <Button
              onClick={clear}
              variant="outline"
            >
              Clear
            </Button>
          )}
        </div>

        {/* Error Display */}
        {error && (
          <div className="rounded-md bg-red-50 p-4 dark:bg-red-950">
            <p className="text-sm text-red-800 dark:text-red-200">Error: {error.message}</p>
          </div>
        )}

        {/* Object Display */}
        {object && (
          <div className="space-y-2">
            <Label>Generated Object (Partial Updates)</Label>
            <div className="rounded-md bg-muted p-4">
              <pre className="text-sm overflow-auto">{JSON.stringify(object, null, 2)}</pre>
            </div>
          </div>
        )}

        {/* Schema Display */}
        <div className="space-y-2">
          <Label>Expected Schema</Label>
          <div className="rounded-md bg-muted p-4">
            <pre className="text-sm overflow-auto">{getSchemaDescription(objectType)}</pre>
          </div>
        </div>

        {/* Instructions */}
        <div className="rounded-md bg-blue-50 p-4 dark:bg-blue-950">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            <strong>How it works:</strong> Click "Generate Object" to see the object being built field by field in
            real-time. The partial object updates as each field is populated, demonstrating streaming structured data
            generation.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function getSchemaDescription(type: ObjectType): string {
  switch (type) {
    case 'user':
      return `{
  name: string
  age: number
  email: string (email format)
  bio: string
}`;
    case 'product':
      return `{
  name: string
  price: number
  category: string
  description: string
  inStock: boolean
}`;
    case 'recipe':
      return `{
  name: string
  prepTime: number
  cookTime: number
  ingredients: string[]
  steps: string[]
}`;
  }
}

