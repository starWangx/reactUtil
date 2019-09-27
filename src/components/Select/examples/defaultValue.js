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

	componentDidMount() {
		this.fetchData('wa')
	}

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
				<h2>多选 异步 搜索 默认选项</h2>

				<div onKeyDown={this.onKeyDown}>
					<Select
						style={{width: 500}}
						showSearch
						value={value}
						resetOption
						defaultValue={['玩具']}
						multiple={true}
						placeholder="placeholder"
						onSelect={this.onSelect}
						onFocus={() => console.log('focus')}
						onBlur={() => console.log('blur')}
						onChange={(v,p)=>{
							console.log('change', v, p);
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
