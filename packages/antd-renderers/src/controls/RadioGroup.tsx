/*
  The MIT License

  Copyright (c) 2017-2019 EclipseSource Munich
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
import merge from 'lodash/merge';
import React from 'react';
import {
  ControlProps,
  ControlState,
  isDescriptionHidden,
  OwnPropsOfEnum,
} from '@jsonforms/core';
import { Control } from '@jsonforms/react';
import { Form, Radio } from 'antd';

export class RadioGroup extends Control<
  ControlProps & OwnPropsOfEnum,
  ControlState
> {
  render() {
    const {
      config,
      label,
      required,
      description,
      errors,
      // data,
      visible,
      options,
    } = this.props;
    const isValid = errors.length === 0;
    const appliedUiSchemaOptions = merge(
      {},
      config,
      this.props.uischema.options
    );
    const showDescription = !isDescriptionHidden(
      visible,
      description,
      this.state.isFocused,
      appliedUiSchemaOptions.showUnfocusedDescription
    );

    const controlStyle = !appliedUiSchemaOptions.trim ? { width: '100%' } : {};

    return (
      <Form.Item
        hidden={!visible}
        required={required}
        style={controlStyle}
        hasFeedback={!isValid}
        status={isValid ? 'success' : 'error'}
        help={!isValid ? errors : showDescription ? description : null}
        label={label}
      >
        <Radio.Group
          value={this.state.value}
          onChange={(e) => this.handleChange(e.target.value)}
        >
          {options.map((option) => (
            <Radio value={option.value} key={option.label}>
              {option.label}
            </Radio>
          ))}
        </Radio.Group>
      </Form.Item>
    );
  }
}
