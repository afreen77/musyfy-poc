import React from 'react';


class Button extends React.Component {
	
	render() {
		let buttonData = this.props.buttonData
		console.log(buttonData)
		return (
			<div className="button">
				<h1>Keypad</h1>
			</div>
		)
	}
}

export default Button