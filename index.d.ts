export type Tree = {
  id: number;
  area: string;
  gender: string;
};

export type AreaWithCount = {
  area: Tree["area"];
  _count: {
    _all: number;
  };
};

export type GenderWithCount = {
  gender: Tree["gender"];
  _count: {
    _all: number;
  };
};

export type Areas = {
  areas: AreaWithCount[] | null;
  loading: boolean;
  error: string | null;
};

export type Genders = {
  genders: GenderWithCount[] | null;
  loading: boolean;
  error: string | null;
};

export type GenericData = {
  title: string;
  description: string;
  data: AreaWithCount[] | GenderWithCount[] | null;
  loading: boolean;
  error: string | null;
  fetch: () => Promise<void>;
};
