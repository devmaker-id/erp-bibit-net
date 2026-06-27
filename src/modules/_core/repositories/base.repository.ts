export abstract class BaseRepository {
  protected readonly now = () => new Date();

  protected softDeleteData() {
    return {
      deletedAt: this.now(),
    };
  }

  protected activeWhere() {
    return {
      deletedAt: null,
      isActive: true,
    };
  }
}