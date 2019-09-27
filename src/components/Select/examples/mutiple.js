/* eslint no-console: 0 */
import React from 'react';
import Select, {Option} from '../index';

import {fetch} from './fetch';

const Input = props => <input {...props} />;

class Test extends React.Component {
	state = {
		data: [],
		value: '',
	};

	onKeyDown = e => {
		if (e.keyCode === 13) {
			const {value} = this.state;
			console.log('onEnter', value);
			this.jump(value);
		}
	};

	onSelect = value => {
		console.log('select ', value);
		this.jump(value);
	};

	jump = v => {
		console.log('jump ', v);
		// location.href = 'https://s.taobao.com/search?q=' + encodeURIComponent(v);
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
				<h2>多选 异步 搜索 </h2>

				<div onKeyDown={this.onKeyDown}>
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
