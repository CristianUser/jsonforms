/*
  The MIT License

  Copyright (c) 2018-2019 EclipseSource Munich
  https://github.com/eclipsesource/jsonforms

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE.
*/
import './MatchMediaMock';
import React from 'react';
import Enzyme, { mount, ReactWrapper } from 'enzyme';
import { TextControl } from '../../src/controls/TextControl';
import { InputControl } from '../../src/controls/InputControl';
import { AntdInputText } from '../../src/antd-controls/AntdInputText';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { ControlElement, ControlProps } from '@jsonforms/core';

Enzyme.configure({ adapter: new Adapter() });

const schema = {
  type: 'object',
  properties: {
    foo: {
      type: 'string',
    },
  },
};
const uischema: ControlElement = {
  type: 'Control',
  scope: '#/properties/foo',
};

const createTextControl = (props: ControlProps) => {
  return <TextControl {...props} />;
};

const defaultControlProps = (): ControlProps => {
  return {
    handleChange: () => {},
    enabled: true,
    visible: true,
    path: 'path',
    rootSchema: schema,
    schema: schema.properties.foo,
    uischema,
    label: 'Foo',
    id: 'foo-id',
    errors: '',
    data: '',
  };
};

describe('Material text control', () => {
  let wrapper: ReactWrapper;

  afterEach(() => {
    wrapper.unmount();
  });

  it('render', () => {
    const props = defaultControlProps();
    wrapper = mount(createTextControl(props));
    expect(wrapper.find(InputControl).props()).toEqual({
      ...props,
      input: AntdInputText,
    });

    expect(wrapper.find('input').props().id).toEqual(`${props.id}-input`);
  });

  it('hides clear button when data is undefined', () => {
    const props = defaultControlProps();
    delete props.data;
    wrapper = mount(createTextControl(props));
    const clearButton = wrapper.find('span.ant-input-suffix');
    expect(clearButton).toHaveLength(0);
  });
});
