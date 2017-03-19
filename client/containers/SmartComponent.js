import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getStarted } from '../actions';
import DumbComponent from '../components/DumbComponent';

class SmartComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stories: []
    }
  }

  componentWillMount() {
  	console.log('window.location foo', window.location.pathname);
    this.props.dispatch(getStarted(window.location.pathname));

    fetch('/api/Stories')
      .then(res => res.json())
      .then(response => {
        console.log('response.daa..', response);
        this.setState({ stories: response })
      });
  }

  render() {
  	console.log('this.props.path', this.props.path);
		if (!this.props.path) return <div>loading...</div>;

		if (this.props.path === '/client/') {
			return (
				<div>
					Client page
				</div>
			)
		} else {
      return (
				<div>
					<DumbComponent path={ this.props.path }/>

          {this.state.stories.map(story => {
            return (
							<div key={story.id}>
                {story.name}
                {story.pages && story.pages.length && story.pages.map(page => <p key={page.id}>{page.heading}</p>)}
							</div>
            )
          })}

				</div>
      );
		}
  }
}

export default connect(state => state)(SmartComponent);