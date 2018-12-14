import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { isInWeChat } from '@ctrip/nfes-util';

const noop = () => {};

export default class Header extends Component {
  static defaultProps = {
    optionRender: noop,
    children: [],
    isIphone: false,
  }
  static propTypes = {
    title: PropTypes.string.isRequired,
    eventBack: PropTypes.func.isRequired,
    style: PropTypes.object.isRequired,
    backIconStyle: PropTypes.object.isRequired,
    isIphone: PropTypes.bool,
    optionRender: PropTypes.func,
    children: PropTypes.array,
  }
  state = {
    isInWeChat: false,
  }

  componentWillMount() {
    this.setState({ isInWeChat });
  }

  onBack = (e) => {
    const { eventBack } = this.props;
    e.stopPropagation();
    eventBack();
  }

  render() {
    const { title, style, backIconStyle, optionRender, children, isIphone } = this.props;
    const { isInWeChat } = this.state;
    return (
      <Fragment>
        <div>
          {!isInWeChat && (
            <div className={`bus-ui-header ${isIphone && 'ios'}`} style={{ ...style }}>
              <div
                className="back"
                onClick={e => this.onBack(e)}
              >
                <i className="iconfont" style={backIconStyle}>&#xe601;</i>
              </div>
              <div className="title">{title}</div>
              <div className="option-btn">{optionRender()}</div>
              {children}
            </div>
          )}
        </div>
      </Fragment>
    );
  }
}
