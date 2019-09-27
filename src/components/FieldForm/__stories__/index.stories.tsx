import * as React from 'react';
import {storiesOf} from '@storybook/react';
import {boolean, number} from '@storybook/addon-knobs'
import {Form, FormStore} from '../index'
import {useFormChange, useFormStore} from '../index'

import Select from '../../Select/index';
import Option from '../../Select/Option';
import './index.less'
import ReadMe from '../README.md'

storiesOf('FieldForm', module)
  .addParameters({
    readme: {
      sidebar: ReadMe,
      highlightSidebar: true,
      codeTheme: 'github'
    },
  })
  .add('form-field', () => {
    const store = new FormStore(
      {
        username: 'Default',
        password: '1',
        gender: 'female',
        contact: {
          phone: '',
          address: ''
        }
      },
      {
        username: (val: string) => !!val.trim() || '请输入用户名',
        password: (val: string) => !!val.trim() || '请输入密码',
        'contact.phone': (val: string) => /[0-9]{11}/.test(val) || 'Phone is invalid',
        'contact.address': (val: string) => !!val.trim() || 'Address is required'
      }
    )

    store.subscribe((name: string) => {
      console.log('change', name, store.get(name))
    })

    const onReset = (e: React.MouseEvent) => {
      e.preventDefault()
      store.reset()
    }

    const onSubmit = async (e: React.MouseEvent) => {
      e.preventDefault()

      const [error, values] = await store.validate();
      console.log([error, values]);
    }

    return (
      <Form
        store={store}
        inline={boolean('Inline', false)}
        required={boolean('Required', true)}
        labelWidth={number('Label Width', 120)}
      >
        <Form.Field label='Username' name='username'
                    required={boolean('Required', true)}
        >
          <input type='text'/>
        </Form.Field>

        <Form.Field label='Password' name='password'>
          <input type='password'/>
        </Form.Field>

        <Form.Field label='Gender' name='gender'>
          <Select
            autoWidth
            placeholder="please select"
            onChange={(value: any, option: any) => {
              console.log('onchange', value, option)
            }}
            defaultValue={store.get('gender') + ''}
          >
            <Option value="male" key={'3'}>
              male
            </Option>
            <Option value="female" key={'2'}>
              female
            </Option>
          </Select>
        </Form.Field>

        <Form.Field label='Phone' name='contact.phone'>
          <input type='text'/>
        </Form.Field>

        <Form.Field label='Address' name='contact.address'>
          <input type='text'/>
        </Form.Field>

        <Form.Field label=''>
          <button onClick={onReset}>Reset</button>
          <button onClick={onSubmit}>Submit</button>
        </Form.Field>
      </Form>
    )
  })

  .add('with-hook', () => {
    function HookForm() {
      const store = useFormStore(
        {
          username: 'Default',
          password: '',
          gender: 'male',
          contact: {
            phone: '',
            address: ''
          }
        },
        {
          username: (val) => !!val.trim() || 'Name is required',
          password: (val) => !!val.trim() || 'Password is required',
          'contact.phone': (val) => /[0-9]{11}/.test(val) || 'Phone is invalid',
          'contact.address': (val) => !!val.trim() || 'Address is required'
        }
      )

      useFormChange(store, (name: string) => {
        console.log('change', name, store.get(name))
      })

      const onReset = React.useCallback((e: React.MouseEvent) => {
        e.preventDefault()
        store.reset()
      }, [])

      const onSubmit = React.useCallback(async (e: React.MouseEvent) => {
        e.preventDefault()

        const [error, values] = await store.validate()
        console.log(error, values)
      }, [])

      return (
        <Form
          store={store}
          inline={boolean('Inline', false)}
          compact={boolean('Compact', false)}
          required={boolean('Required', false)}
        >
          <Form.Field label='Username' name='username'>
            <input type='text'/>
          </Form.Field>
          <Form.Field label='Password' name='password'>
            <input type='password'/>
          </Form.Field>
          <Form.Field label='Gender' name='gender'>
            <select>
              <option value='male'>Male</option>
              <option value='female'>Female</option>
            </select>
          </Form.Field>
          <Form.Field label='Phone' name='contact.phone'>
            <input type='text'/>
          </Form.Field>
          <Form.Field label='Address' name='contact.address'>
            <input type='text'/>
          </Form.Field>
          <Form.Field label=''>
            <button onClick={onReset}>Reset</button>
            <button onClick={onSubmit}>Submit</button>
          </Form.Field>
        </Form>
      )
    }
    return <HookForm/>
  });
