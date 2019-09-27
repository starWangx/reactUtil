import * as PropTypes from 'prop-types';
import React, { Component } from 'react';
import Option, { IOptProps } from './Option';
import cls from 'classnames';

const noop = () => null;

export interface PopupProps {
  showOpts?: boolean;
  value?: string;
  className?: string;
  width?: number;
  activeIndex?: number | null;
  onClick?: any;
  children: JSX.Element[] | JSX.Element | any;
  placeholder?: string | undefined | null;
  multiple?: boolean;
  defaultValue?: Array<string> | string;
  disabled?: boolean;
  showSearch?: boolean;
  allowClear?: boolean;
  onChange?: any;
  onFocus?: () => void;
  onBlur?: () => void;
  onSearch?: (value: string) => void;
  autoWidth?: boolean;
  resetOption?: boolean;
  prefix?: string;
  onOptClick?: any;
  defaultCurrent?: null | number;
  selectedOpts: Array<any>;
  searchPlaceholder?: string;
  resetText?: string;
}

export interface PopupState {
  activeIndex: number | null;
}


export default class Popup extends Component<PopupProps, PopupState> {
  public static propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  };
  public static defaultProps = {
    prefix: '',
    selectedOpts: [],

    onClick: noop,
    onChange: noop,
    onFocus: noop,
    onBlur: noop,
    onOptClick: noop,
  };
  private inputRef: HTMLInputElement | null;
  private popup: HTMLDivElement | null;

  constructor(props: PopupProps) {
    super(props);
    this.state = {
      activeIndex: null,
    };
    this.inputRef = null;
    this.popup = null;
  }


  componentDidUpdate(prevProps: Readonly<PopupProps>, prevState: Readonly<PopupState>, snapshot?: any): void {
    this.inputRef && this.inputRef.focus();
  }

  componentWillUnmount(): void {
    this.popup = null;
    this.inputRef = null;
    this.setState = (state, callback) => {
      return;
    };
  }

  private renderOptions = (
    children: Array<React.ReactElement>,
  ): object => {
    const { activeIndex } = this.state;
    const { resetText, resetOption } = this.props;
    let renderOpts = children as Array<any>;
    renderOpts = [].concat(...renderOpts);
    // let hash = {} as any;
    // renderOpts = renderOpts.reduce((item: Array<IOptProps>, next: IOptProps) => {
    //   if (!hash[next.key]) hash[next.key] = item.push(next);
    //   return item;
    // }, []);
    if (resetOption && this.props.selectedOpts.length > 0) {
      renderOpts.unshift({ props: { children: resetText ? resetText : '...', operate: 'reset' } });
    }

    const selectedKeys = [] as Array<any>;
    renderOpts.forEach((opt, index) => {
      this.props.selectedOpts.forEach(sel => {
        if (opt.props._key === sel.props._key) selectedKeys.push(index);
      });
    });

    return renderOpts.map((opt: IOptProps, inx: number) => {
      const {
        onClick,
        ...others
      } = opt.props;

      return (
        <React.Fragment key={inx}>
          <Option
            index={inx}
            optActive={activeIndex === inx}
            optCurrent={selectedKeys.includes(inx)}
            opt={opt}
            onClick={this.handleClick(opt)}
            onMouseOver={(activeIndex: number) => this.setState({ activeIndex })}
            {...others}
          />
        </React.Fragment>
      );
    });
  };

  private handleClick = (opt: IOptProps) => (current: number) => {
    this.props.onOptClick(opt);
  };

  public render() {
    const {
      prefix,
      showSearch,
      disabled,
      value,
      className,
      width,
      children,
      showOpts,
      searchPlaceholder
    } = this.props;

    const inputDom =
      showSearch && (
        <div className={`${prefix}-search-filter`} key='filter'>
          <input type="text"
            placeholder={searchPlaceholder}
            ref={(ref) => this.inputRef = ref}
            onChange={this.props.onChange}
            onFocus={this.props.onFocus}
            onBlur={this.props.onBlur}
            disabled={disabled}
            value={value} />
        </div>
      );

    return (
      <React.Fragment>
        {
          showOpts &&
          <div
            ref={ref => this.popup = ref}
            onClick={(e) => e.stopPropagation()}
            className={cls(className, `${prefix}-select-menu`)}
            style={{ width, }}>
            {[
              inputDom,
              this.renderOptions(children)
            ]}
          </div>}
      </React.Fragment>
    );
  }
}
