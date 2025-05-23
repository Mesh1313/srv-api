import { vi } from "vitest";

// Mock the database module before any imports
vi.mock("@/db/data-source", () => {
  const createMockRepository = () => ({
    find: vi.fn(),
    findOne: vi.fn(),
    findOneBy: vi.fn(),
    save: vi.fn(),
    remove: vi.fn(),
    clear: vi.fn(),
    createQueryBuilder: vi.fn(() => ({
      where: vi.fn().mockReturnThis(),
      andWhere: vi.fn().mockReturnThis(),
      getMany: vi.fn().mockResolvedValue([]),
      getOne: vi.fn().mockResolvedValue(null),
    })),
    // Add the extend method that returns the repository with additional methods
    extend: vi.fn((customMethods) => {
      const baseRepo = createMockRepository();
      return {
        ...baseRepo,
        ...customMethods,
      };
    }),
  });

  const mockDataSource = {
    isInitialized: true,
    initialize: vi.fn().mockResolvedValue(undefined),
    destroy: vi.fn().mockResolvedValue(undefined),
    getRepository: vi.fn(() => createMockRepository()),
  };

  return {
    AppDataSource: mockDataSource,
    initializeDatabase: vi.fn().mockResolvedValue(mockDataSource),
  };
});

// Mock the server logger
vi.mock("@/server", async () => {
  const actual = await vi.importActual("@/server");
  return {
    ...actual,
    logger: {
      info: vi.fn(),
      error: vi.fn(),
      warn: vi.fn(),
      debug: vi.fn(),
    },
  };
});
