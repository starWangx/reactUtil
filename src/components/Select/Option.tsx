import * as PropTypes from 'prop-types';
import React, { Component } from 'react';
import cls from 'classnames';

const noop = () => null;


export interface IOptProps {
  title: string | number;
  label: string | number;
  value: string | number;
  className: string;
  disabled: boolean;
  opt: any;
  prefix: string;
  index?: number;
  optActive?: boolean;
  optCurrent?: boolean;
  props?: any;
  selected?: boolean;
  onClick: any;
  onMouseOver: any;
}

export default class Option extends Component<Partial<IOptProps>> {
  public static propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onClick: PropTypes.func
  };
  public static defaultProps = {
    onClick: noop,
    // onMouseOver: noop,
    prefix: 'hfdc',
  };


  private handleClick = (e: any) => {
    e.stopPropagation();
    this.props.onClick(this.props.index);
  };

  private handleMouseOver = () => {
    this.props.onMouseOver(this.props.index);
  };


  public render() {
    const { children, prefix, optActive, opt, optCurrent } = this.props;

    const classnames = [
      `${prefix}-select-option`,
      { [`${prefix}-select-option-disabled`]: opt.props.disabled },
      { [`${prefix}-select-option-current`]: optCurrent },
      { [`${prefix}-select-option-active`]: optActive },
    ];

    return (
      <React.Fragment>
        {children && <span onClick={this.handleClick}
          onMouseOver={this.handleMouseOver}
          className={cls(classnames)}>{children}</span>
        }
      </React.Fragment>
    );
  }
}
