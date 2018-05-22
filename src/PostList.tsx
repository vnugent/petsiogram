import * as React from 'react';

import { Post } from './Post';
import { PhotoType } from './types/PostType';

interface PostListStateType {
  posts: PhotoType[];
}

export class PostList extends React.PureComponent<{}, PostListStateType> {
  constructor(props: any) {
    super(props);
    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    const data = [
      {
        id: 1,
        imagePath: 'images/george1.png',
        description: 'What a lovely summer day in Portland'
      },
      {
        id: 2,
        imagePath: 'images/george2.png',
        description: 'Hi! I\'m George!'
      },
      {
        id: 3,
        imagePath: 'images/wilson.png',
        description: 'Hola!'
      },
      {
        id: 4,
        imagePath: 'images/goldie1.jpg',
        description: 'Goldie on vacation'
      }
    ];
    this.setState({ posts: data });
  }

  render() {
    return this.state.posts.map(item => <Post key={item.id} likes={Math.round(Math.random() * 100) + 1} {...item} onDoubleClick={this.doubleClickHandler}/>);
  }

  doubleClickHandler = (postId: any) => {
      console.log('Liking photo:', postId);
  }
}
