export interface ApiPost {
  title: string;
  description: string;
  datetime: string;
}

export interface ApiPosts {
  [id: string]: ApiPost;
}

export interface Post extends ApiPost {
  id: string;
}

export interface GameMutation {
  title: string;
  description: string;
  datetime: string;
}