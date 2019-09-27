import * as PropTypes from 'prop-types';
import React, { Component, EventHandler } from 'react';
import { IOptProps } from './Option';
import { createPropsGetter } from '../../utils';
import cls from 'classnames';

export interface PopupProps {
  optionList: Array<IOptProps> | any;
  placeholder: string;
  prefix?: string;
  multiple?: boolean;
  onDelete: (deleteIndex: number, optionList: Array<IOptProps>, option: any) => void;
}

const defaultProps = {
  prefix: '',
  optionList: [],
  placeholder: '',
};

const getProps = createPropsGetter(defaultProps);

export interface PopupState {
}

export default class Trigger extends Component<PopupProps, PopupState> {
  public static propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  };
  public static defaultProps = defaultProps;

  handleClick = (i: number, optionList: any, opt: any) => (e: any) => {
    e.stopPropagation();
    getProps(this.props).onDelete(i, optionList, opt);
  };

  public render() {
    const {
      prefix,
      optionList,
      placeholder,
      multiple,
    } = getProps(this.props);

    return (
      <React.Fragment>
        <div className={`${prefix}-select-wrapper`}>
          {
            optionList.length === 0 ?
              <span className={`${prefix}-select-placeholder `}>
                {placeholder}
              </span> :
              optionList.map((opt: any, i: number) =>
                (
                  <span className={cls({
                    [`${prefix}-select-tag`]: multiple,
                    [`${prefix}-select-text`]: true
                  })} key={opt.key}>
                    {opt.props.value || opt.props.children}
                    {
                      multiple &&
                      <i className={`${prefix}-select-delete`}
                        onClick={this.handleClick(i, optionList, opt)} />
                    }
                  </span>
                ))
          }
        </div>
      </React.Fragment>
    );
  }
}
