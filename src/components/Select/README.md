# Select

## API

| 参数(props) | 说明(specification) | 类型(type) | 默认值(defaultProps) |
| --- | --- | --- | --- |
| className(optional) | Select的类名 (The class property for Select) | string | hfdc |
| multiple(optional) | 是否多选 | boolean | false |
| defaultValue(optional) | 指定默认选中的条目	| string / array | ''/[]
| disabled(optional) | 是否禁用	| boolean | false
| showSearch(optional) | 是否展示筛选框	| boolean | false
| resetOption(optional) | 是否显示重置按钮	| boolean | false
| resetText(optional) | 重置文案	| string | ...
| autoWidth(optional) | 选项是否自适应宽度	| boolean | true
| prefix(optional) | 类名前缀	| string | hdfc
| searchPlaceholder(optional) | 搜索框的搜索文案提示	| string | ''
| placeholder(optional) | 选择框的文案提示	| string | ''
| onChange(optional) | 选择改变的回调	| function(value/Array<value>, option:Option/Array<Option>) | -'
| onSearch(optional) | 文本框值变化时回调		| function(value: string) | -
| onDelete(optional) | 删除多选标签时回调		|function(value/Array<value>, option:Option/Array<Option>) | -
| onSelect(optional) | 选择选项时的回调		|function(value/Array<value>, option:Option/Array<Option>) | -
| onBlur(optional) | 搜索框失去焦点时回调			| function | -
| onFocus(optional) | 搜索框获得焦点时回调			| function | -


# Option

## API

| 参数(props) | 说明(specification) | 类型(type) | 默认值(defaultProps) |
| --- | --- | --- | --- |
| disabled | 是否禁用	| boolean	 | false |
| className(optional) | Option的类名  string | hfdc |
| key | 和 value 含义一致。如果 React 需要你设置此项，此项值与 value 的值相同，然后可以省略 value 设置| string	 | - |
| value | 默认根据此属性值进行筛选	  | string	 | - |




## 基本用法

```
    <Select
      placeholder="please select"
      showSearch
      onSearch={(val) => {
        console.log(val);
      }}
      resetOption
      onChange={(value: any, option: any) => {
        console.log('onchange', value, option)
      }}

      defaultValue={'jack'}
      onFocus={() => console.log('focus')}
      onBlur={() => console.log('blur')}
    >
      <Option value="jack" key={'jack'}>
        jack
      </Option>
      <Option value="lucy" key={2}>
        lucy
      </Option>
      <Option value="disabled" key={4} disabled>
        disabled
      </Option>
      <Option value="yiminghe" key={3}>
        yiminghe
      </Option>
    </Select>
```

## 多选 异步 搜索

```

import React from 'react';
import Select, {Option} from '../index';

import {fetch} from './fetch';

const Input = props => <input {...props} />;

class Test extends React.Component {
	state = {
		data: [],
		value: '',
	};
	
	fetchData = value => {
		this.setState({
			value,
		});
		fetch(value, data => {
			this.setState({
				data,
			});
		});
	};

	render() {
		const {data, value} = this.state;
		const options = data.map(d => {
			return <Option key={d.value} value={d.text}>{d.text}</Option>;
		});
		return (
			<div>
				<div>
					<Select
						style={{width: 500}}
						value={value}
						showSearch
						multiple
						resetOption
						resetText='清空所有选项'
						placeholder="placeholder"
						searchPlaceholder='请搜索'
						onSearch={this.fetchData}
						onFocus={() => console.log('focus')}
						onBlur={() => console.log('blur')}
						onChange={(v,p)=>{
							console.log('change', v, p);
						}}
						onDelete={(v,p)=>{
							console.log('onDelete', v, p);
						}}
						onSelect={(v,p)=>{
							console.log('onSelect', v, p);
						}}
					>
						{options}
					</Select>
				</div>
			</div>
		);
	}
}

export default Test;

```
