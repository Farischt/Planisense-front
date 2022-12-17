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
