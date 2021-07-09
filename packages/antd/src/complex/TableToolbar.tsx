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
import React from 'react';
import {
  ControlElement,
  createDefaultValue,
  JsonSchema,
  Labels
} from '@jsonforms/core';
import { Button, Col, PageHeader, Row, Tooltip, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ValidationIcon from './ValidationIcon';

const { Title } = Typography;
export interface MaterialTableToolbarProps {
  errors: string;
  label: string | Labels;
  path: string;
  uischema: ControlElement;
  schema: JsonSchema;
  rootSchema: JsonSchema;
  enabled: boolean;
  addItem(path: string, value: any): () => void;
}

const renderTitle = (label: string | Labels, errors: string) =>
(<Row>
  <Col>
    <Title level={3} >{label}</Title>
  </Col>
  <Col style={{ padding: '0 10px' }}>
    <ValidationIcon id='tooltip-validation' errorMessages={errors} />
  </Col>
</Row>);

const TableToolbar = React.memo(
  ({
    errors,
    label,
    path,
    addItem,
    schema,
    enabled
  }: MaterialTableToolbarProps) => (
    <PageHeader
      ghost={false}
      title={renderTitle(label, errors)}
      extra={enabled ? [
        <Tooltip key='1' title={`Add to ${label}`}>
          <Button type='primary' onClick={addItem(path, createDefaultValue(schema))} shape='circle' icon={<PlusOutlined />} />
        </Tooltip>
      ] : []}
    />
  )
);

export default TableToolbar;
