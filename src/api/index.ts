import resolve from './resolver';

interface IResolvedTopStories {
  data: Array<number> | null,
  error: Error | null
}

interface IStory {
  by: string,
  descendants: number,
  id: number,
  kids: number[],
  score: number,
  time: number,
  title: string,
  type: string,
  url: string,
}

interface IResolvedStory {
  data: IStory | null,
  error: Error | null
}

interface IComment {
  by: string,
  id: number,
  kids: number[],
  parent: number,
  text: string,
  time: number,
  type: string,
}

interface IResolvedComment {
  data: IComment | null,
  error: Error | null
}

export function getTopStories(): Promise<IResolvedTopStories> {
  return resolve('https://hacker-news.firebaseio.com/v0/topstories.json');
}

export function getStory(id: number): Promise<IResolvedStory> {
  return resolve(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
}

export function getComment(id: number): Promise<IResolvedComment> {
  return resolve(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
}