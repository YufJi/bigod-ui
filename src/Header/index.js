import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { isInWeChat } from '../tools';
import { classPrefixer } from '../config';

const noop = () => {};

export default class Header extends Component {
  static defaultProps = {
    backRender: null,
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
    optionRender: PropTypes.any,
    backRender: PropTypes.func,
    children: PropTypes.array,
  }
  state = {
    isWeChat: false,
  }

  componentWillMount() {
    this.setState({ isWeChat: isInWeChat });
  }
  componentDidMount() {
    console.log(`在微信里吗---${isInWeChat}`)
  }

  onBack = (e) => {
    const { eventBack } = this.props;
    e.stopPropagation();
    eventBack();
  }

  render() {
    const { title, style, backIconStyle, backRender, optionRender, children, isIphone } = this.props;
    const { isWeChat } = this.state;
    return (
      <Fragment>
        <div>
          {!isWeChat && (
            <div className={`${classPrefixer}-header ${isIphone && 'ios'}`} style={{ ...style }}>
              <div
                className="back"
                onClick={e => this.onBack(e)}
              >
                {backRender ?  backRender() : 'back'}
              </div>
              <div className="title">{title}</div>
              <div className="option-btn">{optionRender()}</div>
            </div>
          )}
        </div>
      </Fragment>
    );
  }
}