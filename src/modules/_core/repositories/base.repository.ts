export abstract class BaseRepository {
  protected now(): Date {
    return new Date();
  }

  protected activeWhere() {
    return {
      deletedAt: null,
      isActive: true,
    };
  }

  protected inactiveWhere() {
    return {
      deletedAt: {
        not: null,
      },
    };
  }

  protected softDeleteData() {
    return {
      deletedAt: this.now(),
      isActive: false,
    };
  }

  protected restoreData() {
    return {
      deletedAt: null,
      isActive: true,
    };
  }
}