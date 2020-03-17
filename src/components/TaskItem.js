import React, { Component } from 'react';
class TaskItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  onHandleRemoveTask = () => {
    this.props.onRemoveTask(this.props.task.id);
  };
  onHandleUpdateTask = () => {
    this.props.onUpdateTask(this.props.task.id);
  };
  onHandleUpdateStatus = () => {
    this.props.onUpdateStatus(this.props.task.id);
  };
  render() {
    let { task, index } = this.props;
    return (
      <tr>
        <td>{index + 1}</td>
        <td>{task.name}</td>
        <td className="text-center">
          <span
            className={Number(task.status) ? 'label label-success' : 'label label-danger'}
            onClick={this.onHandleUpdateStatus}
          >
            {Number(task.status) ? 'Kích hoạt' : 'Ẩn'}
          </span>
        </td>
        <td className="text-center">
          <button type="button" className="btn btn-warning" onClick={this.onHandleUpdateTask}>
            <span className="fa fa-pencil mr-5"></span>Sửa
          </button>
          &nbsp;
          <button type="button" className="btn btn-danger" onClick={this.onHandleRemoveTask}>
            <span className="fa fa-trash mr-5"></span>Xóa
          </button>
        </td>
      </tr>
    );
  }
}

export default TaskItem;
