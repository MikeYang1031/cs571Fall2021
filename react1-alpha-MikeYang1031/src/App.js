class ListOfWords extends React.PureComponent {

  render() {
    return <div>{this.props.words.join(',')}</div>;
  }
}

class WordAdder extends React.Component {

  constructor(props) {

    super(props);
    this.state = {
      words: ['hello']
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {

    const words = this.state.words;
    words.push('world');
    this.setState({words: words});

  }

  render() {

    return (
      <div>
        <button onClick={this.handleClick} />
        <ListOfWords words={this.state.words} />
      </div>
    );
  }
}