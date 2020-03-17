import React from 'react';
import logo from './logo.svg';
import './App.css';
import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList';
import { thisExpression } from '@babel/types';
var randomString = require('random-string');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      isDisplayForm: false,
      taskEditing: null,
      filter: {
        name: '',
        status: -1,
      },
      keyword: '',
      sort: {
        by: '',
        value: 1,
      },
    };
  }
  componentDidMount() {
    if (localStorage && localStorage.getItem('tasks')) {
      let _tasks = JSON.parse(localStorage.getItem('tasks'));
      this.setState({
        tasks: _tasks,
      });
    }
  }
  onToggleForm = () => {
    if (this.state.taskEditing !== null && this.state.isDisplayForm) {
      this.setState({
        isDisplayForm: true,
        taskEditing: null,
      });
    } else {
      this.setState({
        isDisplayForm: !this.state.isDisplayForm,
        taskEditing: null,
      });
    }
  };
  onOpenForm = () => {
    this.setState({
      isDisplayForm: true,
    });
  };
  onCloseForm = () => {
    this.setState({
      isDisplayForm: false,
      taskEditing: null,
    });
  };

  onSubmitTask = childData => {
    const { tasks } = this.state;
    if (childData.id === '') {
      childData.id = randomString({ length: 20 });
      tasks.push(childData);
    } else {
      let indexTaskUpdate = tasks.findIndex(task => task.id === childData.id);
      tasks[indexTaskUpdate].name = childData.name;
      tasks[indexTaskUpdate].status = childData.status;
    }
    this.setState(
      {
        tasks: tasks,
        taskEditing: null,
      },
      () => console.log(this.state),
    );
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };
  onRemoveTask = childData => {
    this.state.tasks.splice(childData, 1);
    let newArr = this.state.tasks;
    this.setState({ tasks: newArr });
    this.onCloseForm();
    localStorage.setItem('tasks', JSON.stringify(newArr));
  };
  onUpdateTask = childData => {
    const { tasks } = this.state;
    let indexTask = tasks.findIndex(task => task.id === childData);
    if (indexTask != -1) {
      this.setState({
        taskEditing: tasks[indexTask],
      });
      this.onOpenForm();
    }
  };
  onUpdateStatus = childData => {
    const { tasks } = this.state;
    let indexTask = tasks.findIndex(task => task.id === childData);
    if (indexTask != -1) {
      tasks[indexTask].status = !tasks[indexTask].status;
      this.setState({
        tasks: tasks,
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  };
  onFilter = (filterName, filterStatus) => {
    this.setState({
      filter: {
        name: filterName,
        status: Number(filterStatus),
      },
    });
  };
  onSearch = keyword => {
    this.setState(
      {
        keyword: keyword,
      },
      () => console.log(this.state.keyword),
    );
  };
  onSort = (by, value) => {
    this.setState({
      sort: {
        by: by,
        value: value,
      },
    });
  };
  render() {
    let { tasks, taskEditing, isDisplayForm, filter, keyword, sort } = this.state;
    if (filter) {
      if (filter.name) tasks = tasks.filter(task => task.name.toLowerCase().indexOf(filter.name.toLowerCase()) !== -1);
    }
    // if(filter.status){//!=null, !=undefine, !=0
    // }
    tasks = tasks.filter(task => {
      if (filter.status === -1) return task;
      else {
        return task.status === (filter.status === 1 ? true : false);
      }
    });
    if (keyword) {
      tasks = tasks.filter(task => task.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1);
    }

    if (sort.by === 'name') {
      tasks.sort((a, b) => {
        if (a.name > b.name) return sort.value;
        else if (a.name < b.name) return -sort.value;
        else return 0;
      });
    } else {
      tasks.sort((a, b) => {
        if (a.status > b.status) return -sort.value;
        else if (a.status < b.status) return sort.value;
        else return 0;
      });
    }

    let elementForm = isDisplayForm ? (
      <TaskForm onCloseForm={this.onCloseForm} onSubmitTask={this.onSubmitTask} taskEditing={taskEditing} />
    ) : (
      ''
    );

    return (
      <div className="container">
        <div className="text-center">
          <h1>Quản Lý Công Việc</h1>
          <hr />
        </div>
        <div className="row">
          <div className={this.state.isDisplayForm ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4' : ''}>{elementForm}</div>
          <div
            className={
              this.state.isDisplayForm
                ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8'
                : 'col-xs-12 col-sm-12 col-md-12 col-lg-12'
            }
          >
            <button type="button" className="btn btn-primary" onClick={this.onToggleForm}>
              <span className="fa fa-plus mr-5"></span>Thêm Công Việc
            </button>
            <div className="row mt-15">
              <Control onSearch={this.onSearch} onSort={this.onSort} sort={this.state.sort} />
            </div>
            <div className="row mt-15">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <TaskList
                  tasks={tasks}
                  onUpdateStatus={this.onUpdateStatus}
                  onUpdateTask={this.onUpdateTask}
                  onRemoveTask={this.onRemoveTask}
                  onFilter={this.onFilter}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
