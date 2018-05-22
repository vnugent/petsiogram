import * as React from 'react';
import { Grid } from 'semantic-ui-react';

import { PostList } from './PostList';

class App extends React.Component {
  public render() {
    return (
      <Grid>
        <Grid.Column mobile={16} tablet={8} computer={4}>
          <PostList />
        </Grid.Column>
      </Grid>
    );
  }
}

export default App;
