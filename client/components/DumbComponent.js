import React, { Component } from 'react';
import '../public/stylesheets/boilerplate.css';

class DumbComponent extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<p className="text">
				Your page is: { this.props.path || '' }
			</p>
		);
	}
}

export default DumbComponent;