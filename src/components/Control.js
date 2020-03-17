import React, {Component} from 'react'
import Search from './Search';
import Sort from './Sort';
class Control extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (  
            <>
              <Search onSearch={this.props.onSearch}/>
              <Sort onSort={this.props.onSort}  sort={this.props.sort}/>
            </>  
         );
    }
}
 
export default Control;
