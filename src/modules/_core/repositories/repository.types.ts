export interface FindManyOptions {
  skip?: number;
  take?: number;
}

export interface FindByIdOptions {
  id: string;
}

export interface ExistsOptions {
  id: string;
}