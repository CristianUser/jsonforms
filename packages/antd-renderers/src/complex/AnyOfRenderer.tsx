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
import React, { useCallback, useState } from 'react';

import {
  createCombinatorRenderInfos,
  isAnyOfControl,
  JsonSchema,
  RankedTester,
  rankWith,
  StatePropsOfCombinator,
} from '@jsonforms/core';
import { JsonFormsDispatch, withJsonFormsAnyOfProps } from '@jsonforms/react';
import CombinatorProperties from './CombinatorProperties';
import { Tabs } from 'antd';
import Hidden from '../util/Hidden';

const AnyOfRenderer = ({
  schema,
  rootSchema,
  indexOfFittingSchema,
  visible,
  path,
  renderers,
  cells,
  uischema,
  uischemas,
}: StatePropsOfCombinator) => {
  const [selectedAnyOf, setSelectedAnyOf] = useState(indexOfFittingSchema || 0);
  const handleChange = useCallback(
    (value: string) => setSelectedAnyOf(parseInt(value)),
    [setSelectedAnyOf]
  );
  const anyOf = 'anyOf';
  const anyOfRenderInfos = createCombinatorRenderInfos(
    (schema as JsonSchema).anyOf,
    rootSchema,
    anyOf,
    uischema,
    path,
    uischemas
  );

  return (
    <Hidden hidden={!visible}>
      <CombinatorProperties
        schema={schema}
        combinatorKeyword={'anyOf'}
        path={path}
      />
      <Tabs
        activeKey={selectedAnyOf?.toString()}
        items={anyOfRenderInfos.map(
          (anyOfRenderInfo, idx) =>
            ({
              label: anyOfRenderInfo.label,
              key: idx,
            } as any)
        )}
        onTabClick={handleChange}
      />
      {anyOfRenderInfos.map(
        (anyOfRenderInfo, anyOfIndex) =>
          selectedAnyOf === anyOfIndex && (
            <JsonFormsDispatch
              key={anyOfIndex}
              schema={anyOfRenderInfo.schema}
              uischema={anyOfRenderInfo.uischema}
              path={path}
              renderers={renderers}
              cells={cells}
            />
          )
      )}
    </Hidden>
  );
};

export const anyOfControlTester: RankedTester = rankWith(3, isAnyOfControl);
export default withJsonFormsAnyOfProps(AnyOfRenderer);
