export interface IResponse {
  count: number;
  next: string;
  previous: null;
  results: IPerson[];
}

export interface IPerson {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: IGender;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: Date;
  edited: Date;
  url: string;
}

export enum IGender {
  Female = 'female',
  Male = 'male',
  NA = 'n/a',
}
