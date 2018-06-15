import * as React from 'react';
import axios from 'axios';

import * as Config from './Config';
import { Post } from './Post';
import { PhotoType } from './types/PostType';

interface PostListStateType {
  posts: PhotoType[];
  likeData: any;
  error: boolean;
}

interface PostListPropType {
  userId: string;
}

export class PostList extends React.PureComponent<PostListPropType, PostListStateType> {
  timerID: any;

  constructor(props: any) {
    super(props);
    this.state = {
      likeData: undefined,
      posts: [],
      error: false
    };
  }

  componentDidMount() {
    this.fetchPostsFromBackend();
    this.timerID = setInterval(() => this.fetchLikesFromBackend(), 5000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  render() {
    if (this.state.posts.length === 0 && !this.state.error) {
      return (
        <div>
          No posts found. <p><button onClick={this.initializeDb}>Re-initialize sample posts</button></p>
        </div>
      );
    }
    return this.state.posts.map(item => (
      <Post key={item.id} likes={this.lookupLikes(item.id)} {...item} onDoubleClick={this.doubleClickHandler} />
    ));
  }

  initializeDb = () => {
    axios
      .get(`${Config.API_HOST}/init`)
      .then(response => {
        console.log('Data init succeeded!');
        this.fetchPostsFromBackend();
        this.setState({ error: false });
      })
      .catch(error => {
        console.log('Data init failed!');
        this.setState({ error: true });
      });
  };

  doubleClickHandler = (postId: any) => {
    console.log('Liking photo:', postId);
    const data = { media_id: postId, user_id: this.props.userId };
    axios
      .post(`${Config.API_HOST}/like`, data)
      .then(response => {
        console.log('## like data ', data);
      })
      .catch(error => {
        console.log('like error', error);
      });
  };

  lookupLikes(mediaId: string) {
    const likeCounts = this.state.likeData;
    return likeCounts ? likeCounts.get(mediaId) : 0;
  }

  fetchPostsFromBackend() {
    axios
      .get(`${Config.API_HOST}/posts`)
      .then(response => {
        this.setState({ posts: response.data, error: false });
      })
      .catch(error => {
        this.setState({ error: true });
      });
  }

  fetchLikesFromBackend() {
    axios.get(`${Config.API_HOST}/likes`).then(response => {
      if (response && response.data) {
        const result = new Map(response.data.map((i: any) => [i._id, i.count]));
        this.setState({ likeData: result });
      }
    });
  }
}
