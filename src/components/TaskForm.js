import React, { Component } from 'react';

class TaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      status: 'fasle',
      taskEditing: null,
    };
  }
  onHandleCloseForm = () => {
    this.props.onCloseForm();
  };
  onHandleChange = e => {
    let name = e.target.name;
    let value = e.target.value;
    if (name === 'status') value = e.target.value === 'true' ? true : false;
    this.setState({
      [name]: value,
    });
  };
  onHandleSubmit = e => {
    e.preventDefault();
    let { id, name, status } = this.state;
    this.props.onSubmitTask({
      id,
      name,
      status,
    });
    this.onClear();
    this.onHandleCloseForm();
  };
  onClear = () => {
    this.setState({
      taskEditing: null,
      name: '',
      status: '',
      id: '',
    });
  };
  // k sử dụng willmount để khỏi tạo mà dùng didmount
  componentDidMount() {
    console.log('cpn did mount');
    if (this.props.taskEditing) {
      this.setState({
        id: this.props.taskEditing.id,
        name: this.props.taskEditing.name,
        status: this.props.taskEditing.status,
        taskEditing: this.props.taskEditing,
      });
    }
  }
  static getDerivedStateFromProps(nextProps, currentState) {
    console.log('getDerivedStateFromProps');
    console.log('nextProps:', nextProps.taskEditing);
    console.log('current:', currentState.taskEditing);
    if (nextProps.taskEditing !== currentState.taskEditing) {
      return {
        taskEditing: nextProps.taskEditing, // gán prop thay đổi vào this.state.taskEdingting
      };
    }
    return null;
  }
  componentDidUpdate(prevProps, prevState) {
    //prevState.taskEditing = currentState.taskEditing
    //this.state.taskEditing = return {
    //    taskEditing: nextProps.taskEditing, // gán prop thay đổi vào this.state.taskEdingting
    // };
    console.log('cpm did update');
    console.log('prevState:', prevState.taskEditing);
    console.log('this.state:', this.state.taskEditing);
    if (prevState.taskEditing !== this.state.taskEditing && this.state.taskEditing !== null) {
      console.log('tick');
      this.setState({
        taskEditing: this.state.taskEditing,
        name: this.state.taskEditing.name,
        status: this.state.taskEditing.status,
        id: this.state.taskEditing.id,
      });
    }
    if (prevState.taskEditing !== this.state.taskEditing && this.state.taskEditing === null) {
      console.log('tock');
      this.setState({
        taskEditing: null,
        name: '',
        status: '',
        id: '',
      });
    }
  }
  // componentWillReceiveProps(nextProps) {
  //   console.log('receive');
  //   if (nextProps && nextProps.taskEditing) {
  //     console.log('tick');
  //     this.setState({
  //       id: nextProps.taskEditing.id,
  //       name: nextProps.taskEditing.name,
  //       status: nextProps.taskEditing.status
  //     });
  //   } else if (!nextProps.taskEditing) {
  //     console.log("tock");
  //     this.setState({
  //       id: "",
  //       name: "",
  //       status: false
  //     });
  //   }
  // }
  render() {
    if (this.state.taskEditing) {
      var {
        taskEditing: { id, name, status },
      } = this.state;
    }

    return (
      <div className="panel panel-warning">
        <div className="panel-heading">
          <h3 className="panel-title">
            {this.state.taskEditing ? 'Cập nhật' : ' Thêm Công Việc'}
            <span className="fa fa-times-circle text-right" onClick={this.onHandleCloseForm}></span>
          </h3>
        </div>
        <div className="panel-body">
          <form onSubmit={e => this.onHandleSubmit(e)}>
            <div className="form-group">
              <label>Tên :</label>
              <input
                type="text"
                className="form-control"
                name="name"
                onChange={e => this.onHandleChange(e)}
                value={this.state.name}
              />
            </div>
            <label>Trạng Thái :</label>
            <select
              className="form-control"
              required="required"
              name="status"
              onChange={e => this.onHandleChange(e)}
              value={this.state.status}
            >
              <option value={true}>Kích Hoạt</option>
              <option value={false}>Ẩn</option>
            </select>
            <br />
            <div className="text-center">
              <button type="submit" className="btn btn-warning">
                Thêm
              </button>
              &nbsp;
              <button type="submit" className="btn btn-danger" onClick={this.onClear}>
                Hủy Bỏ
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default TaskForm;
