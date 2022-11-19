import React from 'react';
// import '../css/UserPage.css'
import { Input, Button } from '@material-ui/core';
import { withRouter } from 'react-router';
import classNames from 'classnames';



class Table extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
        state_records: [],
        edi: [],
        edit: false,
        tempRole: [],
        tempTitle: [],
      allroles: [],

      };
    
  }
  
  
  handleEdit(i){
    var tempEdi = this.state.edi;
 
    tempEdi[i] = !this.state.edi[i];
    this.setState({ edi: tempEdi });

  }

  handleEdit2(i){

    
    if (this.state.state_records[i].status === 'active'){
      console.log(this.state.state_records[i].status);
      const newvar= this.state.state_records.slice();
      newvar[i].status='inactive'
      this.setState({ [this.state.state_records]: newvar});

    } else {
      console.log('else',this.state.state_records[i].status);
      const newvar= this.state.state_records.slice();
      newvar[i].status='active'
      this.setState({ [this.state.state_records]: newvar});
  
    }

  }

  onChange1(ev,i) {
    
    let temp=ev.target.value.slice();

    var temp1 = this.state.tempRole;
    temp1[i] = temp;
    this.setState({ temp1: temp });

    this.setState({ [this.state.tempRole]: temp1});
    
    const newvar= this.state.state_records.slice();
    newvar[i].role=this.state.tempRole[i]
    this.setState({ [this.state.state_records]: newvar});

    this.setState({ [ev.target.name]: ev.target.value  });

    //console.log(this.state.state_records);
  
  }

  onChange2(ev,i) {
    
    let temp=ev.target.value.slice();

    var temp1 = this.state.tempTitle;
    temp1[i] = temp;
    this.setState({ temp1: temp });

    this.setState({ [this.state.tempTitle]: temp1});
    

    const newvar= this.state.state_records.slice();
    newvar[i].user.title=this.state.tempTitle[i]
    this.setState({ [this.state.state_records]: newvar});

    this.setState({ [ev.target.name]: ev.target.value  });

    //console.log(this.state.state_records);
  
  }
  

  componentDidMount(){
    const response = fetch(`https://raw.githubusercontent.com/NoeticBlue/exercise-company-employees/main/employees.json`, {
      method: 'GET',
      mode: 'cors',

    }).then((res) => {
        return res.json().then((res) => {
          
          this.setState({
            state_records: res.records,

          });
  
          this.setState({
            [this.state.tempRole]: 'first'

          });
        console.log(this.state.state_records)
        
        for (var i in this.state.state_records) {

          this.setState({ [this.state.edi[i]]: false});
          this.setState({ [this.state.tempRole[i]]: ''});
          this.setState({ [this.state.tempTitle[i]]: ''});
          //this.state.edi[i]= false;
          //this.state.tempRole[i]='';
          //this.state.tempTitle[i]='';
          let temp=false

          for (var j in this.state.allroles){
        
            if (this.state.allroles[j] ===this.state.state_records[i].role ){
              temp=true
            }
          }
          if (temp===false){
            this.state.allroles.push(this.state.state_records[i].role)
          }
          
        }
      console.log(this.state.allroles)
      });
 
      })

      .catch((err) => {
        console.log(err);
      });
    

  }

  render() {
    return (
    <div className="bg-gray-300"> 
      <div className="md:mx-auto max-w-7xl border-solid bg-white ">
          <table  className="table-fixed">
            <thead className="bg-gray-50 border-2 border-light-blue-500">
                <th className="pl-4 w-14 md:w-14 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="w-2/6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                <th className="w-2/6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="w-1/6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="w-1/12 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="w-1/12 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
            </thead>
            <tbody>
              {this.state.state_records.map((data, i) => {
                return (
                  
                  <tr  key={i} className="h-20 border-solid border-2 border-light-blue-500">
                                            
                     <td className="pl-4">
                        <img className="w-14 rounded-full mr-20" alt='' src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60"/>
                      </td>
                      <td>
                        <text className="font-medium">
                        {data.user.name}
                        </text>
                        <pre>
                        <text className="text-gray-500 ">
                          {data.user.email} 
                          </text> 
                          
                        </pre>
                      </td>
                      <td>
                      {this.state.edi[i]? 
                      <Input className="font-medium"
                         
                         
                         defaultValue={data.user.title}
                         
                         type='text'
                         onChange={(ev) => this.onChange2(ev,i)}
                         ></Input>
                      
                      
                      :
                      
                        data.user.title
                      
                      }
                        <pre>
                        <text className="text-gray-500 ">
                        {data.user.department}
                          </text>
                          
                      </pre>
              
                      </td>
                      <td >
                      {this.state.edi[i]?
                      <Button className="" onClick={() => this.handleEdit2(i)}>
                        
                        <text className={classNames( " px-3 py-1 capitalize leading-wide font-bold text-xs  rounded-full shadow-sm",

                            )}>{data.status}
                          </text>

                      </Button>: <text className={classNames( "px-3 py-1 capitalize leading-wide font-bold text-xs rounded-full shadow-sm",
                              data.status.startsWith("active") ? " capitalize bg-green-200 text-green-700" : null,
                              data.status.startsWith("inactive") ? " capitalize bg-yellow-200 text-yellow-700" : null,
                            )}>{data.status}
                          </text>
                      }
                      </td>

                      <td>
                        {this.state.edi[i]?
                        <select className="capitalize " defaultValue={data.role} onChange={(ev) => this.onChange1(ev,i)} >{
                          
                          this.state.allroles.map( (x,y) => 
                          
                            <option className="capitalize"  key={y} >{x}</option> )
    
                        }</select>
                         
                         
                          :
                          <text className="capitalize text-gray-500">
                          {data.role}
                          </text>
                        }
                        
                      </td>
                      <td>
                      {(!this.state.edi[i]) ?
                      <Button onClick={() => this.handleEdit(i)}>
                        <text className="text-indigo-500 normal-case">
                        Edit 
                          </text>
                      </Button>:
                      
                      <Button onClick={() => this.handleEdit(i)}>                      
                      <text className="text-green-500 normal-case">
                        Save 
                          </text> 
                      
                      
                    </Button>
                      }
                      </td>
                      
                  </tr>
                 )
            })}
            </tbody>
          </table>
        </div>
        </div>   
    );
  }
}
export default withRouter(Table);
