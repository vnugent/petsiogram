import * as React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';

import { PhotoType, StatsType } from './types/PostType';

type PostType = PhotoType & StatsType;

export class Post extends React.PureComponent<PostType, {}> {
  render() {
    return (
      <Card>
        <Image fluid={true} src={this.props.imagePath} onDoubleClick={() => this.props.onDoubleClick(this.props.id)} />
        <Card.Content>
          <Card.Meta>
            <Icon name="heart" size="large" /> {this.props.likes}
          </Card.Meta>
          <Card.Description>{this.props.description}</Card.Description>
        </Card.Content>
      </Card>
    );
  }
}
