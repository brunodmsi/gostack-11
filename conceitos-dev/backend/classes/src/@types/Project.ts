export interface IProject {
  id?: string;
  title: string;
  owner: string;
}

export interface ValidateProjectID {
  params: {
    id: string
  }
}

export interface FilterByTitle {
  query: {
    title?: string
  }
}