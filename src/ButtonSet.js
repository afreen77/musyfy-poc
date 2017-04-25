import React from 'react';
import Button from './Button';

class ButtonSet extends React.Component {
	render() {
		return (
			<div>
				{
					this.props.data.map((buttonData)=> {
						return<Button buttonData={buttonData.data} key={buttonData.key}/> 
					})
				}
			</div>
		)
	}
}

export default ButtonSet