import * as React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';

import { PhotoType, StatsType } from './types/PostType';

type PostType = PhotoType & StatsType;

interface PostStateType {
  likes: number;
}

export class Post extends React.PureComponent<PostType, PostStateType> {
  static getDerivedStateFromProps(props: PostType, state: PostStateType) {
    console.log('# props, state', props, state);
    return props.likes > state.likes ? { likes: props.likes } : null;
  }
  constructor(props: PostType) {
    super(props);
    this.state = {
      likes: this.props.likes
    };
  }

  onLike = () => {
    this.setState({ likes: this.state.likes + 1 });
    this.props.onDoubleClick(this.props.id);
  };

  render() {
    return (
      <Card>
        <Image fluid={true} src={'//localhost:3050/' + this.props.imagePath} onDoubleClick={this.onLike} />
        <Card.Content>
          <Card.Meta>
            <Icon name="heart" size="large" /> {this.state.likes}
          </Card.Meta>
          <Card.Description>{this.props.description}</Card.Description>
        </Card.Content>
      </Card>
    );
  }
}
