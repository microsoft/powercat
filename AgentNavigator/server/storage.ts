// Storage interface for future extensibility
// Currently not used by the Microsoft Agent Platform Selection Tool
// which operates entirely on the frontend

export interface IStorage {
  // Placeholder for future data storage needs
}

export class MemStorage implements IStorage {
  constructor() {
    // Placeholder implementation
  }
}

export const storage = new MemStorage();
