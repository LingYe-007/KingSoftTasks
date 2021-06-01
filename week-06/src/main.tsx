import Button from './components/Button.js'
import Modal from './components/Modal.js'

interface State {
  visible: boolean
}

class App extends React.Component<any, State> {
  state: State = {
    visible: false
  }

  render() {
    return (
      <React.Fragment>
        <Button>默认按钮</Button>
        <Button type="primary">主按钮</Button>
        <Button type="primary" 
        onClick={() => this.setState({visible:!this.state.visible})}>
          打开对话框
        </Button>
        <Modal
          visible={this.state.visible}
          title="窗口标题"
          // 实现关闭窗口的逻辑
          onClose={() => this.setState({visible:!this.state.visible})}
          footer={[
            // 实现关闭窗口的逻辑
            <Button key="cancel" 
            onClick={() => this.setState({visible:!this.state.visible})}>取消</Button>,
            // 实现关闭窗口的逻辑
            <Button type="primary" key="ok"
             onClick={() => this.setState({visible:!this.state.visible})}>确认</Button>
          ]}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </React.Fragment>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
