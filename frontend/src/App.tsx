import * as React from 'react';
import { Grid } from 'semantic-ui-react';

import { PostList } from './PostList';
const uuid = require('uuid');

interface AppStateType {
  userId: string;
}

class App extends React.Component<{}, AppStateType> {
  constructor(props: any) {
    super(props);
    this.state = {
      userId: uuid.v1()
    };
  }

  public render() {
    return (
      <Grid>
        <Grid.Column mobile={16} tablet={8} computer={4}>
          <PostList userId={this.state.userId} />
        </Grid.Column>
      </Grid>
    );
  }
}

export default App;
