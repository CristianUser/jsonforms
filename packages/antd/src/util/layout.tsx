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
import isEmpty from 'lodash/isEmpty';
import React from 'react';
import { ComponentType } from 'react';
import { Ajv } from 'ajv';
import {
  getAjv,
  JsonFormsCellRendererRegistryEntry,
  JsonFormsRendererRegistryEntry,
  JsonSchema,
  OwnPropsOfRenderer,
  UISchemaElement
} from '@jsonforms/core';
import { areEqual, JsonFormsDispatch, useJsonForms } from '@jsonforms/react';
import { Col, Row } from 'antd';
import './layout.css';

export const renderLayoutElements = (
  elements: UISchemaElement[],
  schema: JsonSchema,
  path: string,
  enabled: boolean,
  direction: 'row' | 'column',
  renderers?: JsonFormsRendererRegistryEntry[],
  cells?: JsonFormsCellRendererRegistryEntry[],
) => {
  const GridChild = direction === 'row' ? Col : Row;
  const containerProps: any = {};

  if (direction === 'row') {
    containerProps.flex = 1;
  } else {
    containerProps.style = { width: '100%' };
  }

  return elements.map((child, index) => (
    <GridChild {...containerProps} key={`${path}-${index}`}>
      <JsonFormsDispatch
        uischema={child}
        schema={schema}
        path={path}
        enabled={enabled}
        renderers={renderers}
        cells={cells}
      />
    </GridChild>
  ));
};

export interface LayoutRendererProps extends OwnPropsOfRenderer {
  elements: UISchemaElement[];
  direction: 'row' | 'column';
}
export const LayoutRenderer = React.memo(
  ({
    // visible,
    elements,
    schema,
    path,
    enabled,
    direction,
    renderers,
    cells
  }: LayoutRendererProps) => {
    const GridContainer = direction === 'row' ? Row : Col;
    const containerProps: any = {};

    if (direction === 'row') {
      containerProps.gutter = 2;
      containerProps.style = { width: '100%' };
    }

    if (isEmpty(elements)) {
      return null;
    } else {
      return (
        <GridContainer
          {...containerProps}
        >
          {renderLayoutElements(
            elements,
            schema,
            path,
            enabled,
            direction,
            renderers,
            cells,
          )}
        </GridContainer>
      );
    }
  },
  areEqual
);

export interface AjvProps {
  ajv: Ajv;
}

export const withAjvProps = <P extends {}>(Component: ComponentType<AjvProps & P>) =>
  (props: P) => {
    const ctx = useJsonForms();
    const ajv = getAjv({ jsonforms: { ...ctx } });

    return (<Component {...props} ajv={ajv} />);
  };
