import * as React from 'react';
import axios from 'axios';

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
    axios
      .get('http://localhost:3005/posts')
      .then(response => {
        this.setState({ posts: response.data, error: false });
      })
      .catch(error => {
        this.setState({ error: true });
      });

    this.timerID = setInterval(() => this.fetchLikesFromBackend(), 3000);
  }

  componentWillReceiveProps() {
    clearInterval(this.timerID);
  }

  render() {
    return this.state.posts.map(item => (
      <Post key={item.id} likes={this.lookupLikes(item.id)} {...item} onDoubleClick={this.doubleClickHandler} />
    ));
  }

  doubleClickHandler = (postId: any) => {
    console.log('Liking photo:', postId);
    const data = { media_id: postId, user_id: this.props.userId };
    // this.updateLocalLikes(data);
    axios
      .post('http://localhost:3005/like', data)
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

  updateLocalLikes(data: any) {
    const item = this.state.likeData.get(data.media_id);
    if (item) {
      item.count = item.count + 1;
      console.log('#update local like', item);
      this.setState({ likeData: this.state.likeData });
    }
  }

  fetchLikesFromBackend() {
    axios.get('http://localhost:3005/likes').then(response => {
      const result = new Map(response.data.map((i: any) => [i._id, i.count]));
      this.setState({ likeData: result });
    });
  }
}
