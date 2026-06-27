type Delegate = {
  upsert(args: {
    where: Record<string, unknown>;
    update: Record<string, unknown>;
    create: Record<string, unknown>;
  }): Promise<unknown>;
};

interface SeedManyOptions<T extends Record<string, unknown>> {
  delegate: Delegate;
  unique: keyof T;
  data: T[];
}

export async function seedMany<T extends Record<string, unknown>>({
  delegate,
  unique,
  data,
}: SeedManyOptions<T>) {
  for (const item of data) {
    await delegate.upsert({
      where: {
        [unique]: item[unique],
      },
      update: {},
      create: item,
    });
  }
}