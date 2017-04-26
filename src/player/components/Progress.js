import React from 'react';

class Progress extends React.Component {

  render(){
    return(
      <div className="progress">

        <progress
           value={this.props.position}
           max="1"></progress>

      </div>
    )
  }

}

export default Progress