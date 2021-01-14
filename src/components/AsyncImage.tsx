import React, {Component} from 'react'; // eslint-disable-line no-unused-vars
import {Image, View} from 'react-native';

type Props = {
  placeholderColor?: string;
  style: {
    width: any;
    height: any;
    [key: string]: any;
  };
  source: {
    uri: string;
  };
};

type State = {
  loaded: boolean;
};

export default class AsyncImage extends Component {
  props: Props;
  state: State;

  constructor(props: Props) {
    super(props);
    this.state = {loaded: false};
  }

  render() {
    const {placeholderColor, style, source} = this.props;

    return (
      <View style={style}>
        <Image
          source={source}
          style={[
            style,
            {
              position: 'absolute',
              resizeMode: 'cover',
            },
          ]}
          onLoad={this._onLoad}
        />

        {!this.state.loaded && (
          <View
            style={[
              style,
              {
                backgroundColor: placeholderColor || '#90a4ae',
                position: 'absolute',
              },
            ]}
          />
        )}
      </View>
    );
  }

  _onLoad = () => {
    this.setState(() => ({loaded: true}));
  };
}
