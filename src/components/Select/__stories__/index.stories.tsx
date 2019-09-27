import * as React from 'react';
import {storiesOf} from '@storybook/react';
import Select from '../index';
import Option from '../Option';
import {fetch} from './fetch'
import SelectReadMe from '../README.md';
import './index.less'

storiesOf('Select', module)
  .addParameters({
    readme: {
      sidebar: SelectReadMe,
      highlightSidebar: true,
      codeTheme: 'github'
    },
  })
  .add('single & showSearch & resetOption & value & disabled', () =>
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
      <Option value="jack" key={'3'}>
        jack
      </Option>
      <Option value="aimer" key={'2'}>
        aimer
      </Option>
      <Option value="a" key={'1'}>
        lucky
      </Option>
    </Select>
  )
  .add('async & showSearch', () => {
      class Muti extends React.Component {
        state = {
          data: [],
          value: '',
        };

        jump = (v: string) => {
          console.log('jump ', v);
          // location.href = 'https://s.taobao.com/search?q=' + encodeURIComponent(v);
        };

        fetchData = (value: string) => {
          this.setState({
            value,
          });
          fetch(value, (data: any) => {
            this.setState({
              data,
            });
          })
        };

        render() {
          const {data, value} = this.state;
          const options = data.map((d: any) => {
            return <Option key={d.value}>{d.text}</Option>;
          });
          return (
            <div>
              <h2>异步搜索过滤</h2>

              <Select
                style={{width: 500}}
                value={value}
                showSearch
                disabled
                resetOption
                placeholder="placeholder"
                onSearch={this.fetchData}
                onFocus={() => console.log('focus')}
                onBlur={() => console.log('blur')}
                onSelect={(v, p) => {
                  console.log('select-----' + v + p);
                }}
              >
                {options}
              </Select>
            </div>
          );
        }
      }

      return <Muti/>
    }
  )

  .add('Multiple ', () =>
    <Select
      placeholder="please select"
      resetOption
      onChange={(value: any, option: any) => {
        console.log('onchange', value, option)
      }}
      multiple
      defaultValue={'lucy'}
      onFocus={() => console.log('focus')}
      onBlur={() => console.log('blur')}
    >
      <Option value="jack" key={1}>
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
  )
  .add('Multiple & async & resetText & searchPlaceHolder', () => {
      class Multiple extends React.Component {
        state = {
          data: [],
          value: '',
        };

        onSelect = (value: string) => {
          console.log('select ', value);
          this.jump(value);
        };

        jump = (v: string) => {
          console.log('jump ', v);
          // location.href = 'https://s.taobao.com/search?q=' + encodeURIComponent(v);
        };

        fetchData = (value: string) => {
          this.setState({
            value,
          });
          fetch(value, (data: any) => {
            this.setState({
              data,
            });
          })
        };

        render() {
          const {data, value} = this.state;
          const options = data.map((d:any) => {
            return <Option key={d.value} value={d.text}>{d.text}</Option>;
          });

          return (
            <div>
              <h2>多选 异步 搜索 </h2>

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
                  onChange={(v, p) => {
                    console.log('change', v, p);
                  }}
                  onDelete={(v, p) => {
                    console.log('onDelete', v, p);
                  }}
                  onSelect={(v, p) => {
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

      return <Multiple/>
    }
  )
  .add('Multiple& async & defaultValue', () => {
      class Test extends React.Component {
        state = {
          data: [],
          value: '',
        };

        componentDidMount() {
          this.fetchData('wa')
        }

        onSelect = (value :string) => {
          console.log('select ', value);
          this.jump(value);
        };

        jump = (v:string) => {
          console.log('jump ', v);
          // location.href = 'https://s.taobao.com/search?q=' + encodeURIComponent(v);
        };

        fetchData = (value:string) => {
          this.setState({
            value,
          });
          fetch(value, (data:any) => {
            this.setState({
              data,
            });
          });
        };

        render() {
          const {data, value} = this.state;
          const options = data.map((d:any) => {
            return <Option key={d.value} value={d.text}>{d.text}</Option>;
          });
          return (
            <div>
              <h2>多选 异步 搜索 默认选项</h2>

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
                onChange={(v, p) => {
                  console.log('change', v, p);
                }}
              >
                {options}
              </Select>
            </div>
          );
        }
      }

      return <Test/>
    }
  );
