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
  computeLabel,
  ControlState,
  DispatchPropsOfControl,
  isDateControl,
  isDescriptionHidden,
  isPlainLabel,
  RankedTester,
  rankWith,
  StatePropsOfControl
} from '@jsonforms/core';
import { Control, withJsonFormsControlProps } from '@jsonforms/react';
import { Hidden } from '@material-ui/core';
import moment from 'moment';
import { Moment } from 'moment';
import { DatePicker, Form } from 'antd';

export interface DateControl {
  momentLocale?: Moment;
}

export class MaterialDateControl extends Control<
  StatePropsOfDateControl & DispatchPropsOfControl & DateControl,
  ControlState
> {
  render() {
    const {
      description,
      id,
      errors,
      label,
      uischema,
      visible,
      enabled,
      required,
      path,
      handleChange,
      data,
      momentLocale,
      config
    } = this.props;
    const defaultLabel = label as string;
    const isValid = errors.length === 0;
    const appliedUiSchemaOptions = merge({}, config, uischema.options);
    const showDescription = !isDescriptionHidden(
      visible,
      description,
      this.state.isFocused,
      appliedUiSchemaOptions.showUnfocusedDescription
    );
    const localeDateTimeFormat = momentLocale
      ? `${momentLocale.localeData().longDateFormat('L')}`
      : 'YYYY-MM-DD';

    let labelText;

    if (isPlainLabel(label)) {
      labelText = label;
    } else {
      labelText = defaultLabel;
    }

    const pickerStyle = !appliedUiSchemaOptions.trim ? { width: '100%' } : {};

    return (
      <Hidden xsUp={!visible}>
        <Form.Item
          required={required}
          status={isValid ? 'success' : 'error'}
          help={!isValid ? errors : showDescription ? description : ' '}
          label={computeLabel(
            labelText,
            required,
            appliedUiSchemaOptions.hideRequiredAsterisk
          )}>
          <DatePicker
            id={id + '-input'}
            style={pickerStyle}
            value={data ? moment(data) : null}
            onChange={(datetime: any) =>
              handleChange(
                path,
                datetime ? datetime.format('YYYY-MM-DD') : ''
              )
            }
            format={localeDateTimeFormat}
            allowClear={true}
            disabled={!enabled}
            autoFocus={appliedUiSchemaOptions.focus}
          />
        </Form.Item>
      </Hidden>
    );
  }
}

export interface StatePropsOfDateControl extends StatePropsOfControl {
  defaultLabel: string;
  cancelLabel: string;
  clearLabel: string;
}

export const materialDateControlTester: RankedTester = rankWith(
  4,
  isDateControl
);

export default withJsonFormsControlProps(MaterialDateControl);
