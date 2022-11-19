import { Switch, Route, withRouter } from "react-router";
import { Component } from "react";
import Table from "./components/table";


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: 'Grigoris'
       
        };
    }    

    render() {
      return (
        <div>
          <Switch>
            <Route path="/" component={Table} history={this.props.history} />
          </Switch>
  
        </div>
      );
    }
  }
  
  export default withRouter(App);
  