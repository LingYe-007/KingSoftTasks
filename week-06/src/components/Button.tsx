type ButtonType = 'default' | 'primary'

interface Props {
  type?: ButtonType
  onClick?: () => void
}

export default class Button extends React.Component<Props> {
  render() {
    return <button className={"button button-"+this.props.type} 
      onClick={this.props.onClick}>
      {this.props.children}
      </button>
  }
  
}