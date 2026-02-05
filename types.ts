
export interface Competition {
  title: string;
  institution: string;
  requirements: string;
  deadline: string;
  description: string;
  sourceUrl?: string;
}

export interface SearchParams {
  qualification: string;
  location: string;
}

export interface GroundingSource {
  title: string;
  uri: string;
}

export interface SearchResult {
  text: string;
  sources: GroundingSource[];
  competitions: Competition[];
}
