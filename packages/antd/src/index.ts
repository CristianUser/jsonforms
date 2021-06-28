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
import {
  JsonFormsCellRendererRegistryEntry,
  JsonFormsRendererRegistryEntry
} from '@jsonforms/core';
import {
  materialAllOfControlTester,
  MaterialAllOfRenderer,
  materialAnyOfControlTester,
  MaterialAnyOfRenderer,
  MaterialArrayControlRenderer,
  materialArrayControlTester,
  materialObjectControlTester,
  MaterialObjectRenderer,
  materialOneOfControlTester,
  MaterialOneOfRenderer,
  MaterialEnumArrayRenderer,
  materialEnumArrayRendererTester
} from './complex';
import {
  MaterialLabelRenderer,
  materialLabelRendererTester,
  MaterialListWithDetailRenderer,
  materialListWithDetailTester
} from './additional';
import {
  AnyOfStringOrEnumControl,
  anyOfStringOrEnumControlTester,
  BooleanControl,
  booleanControlTester,
  BooleanToggleControl,
  booleanToggleControlTester,
  MaterialDateControl,
  dateControlTester,
  DateTimeControl,
  dateTimeControlTester,
  MaterialEnumControl,
  enumControlTester,
  IntegerControl,
  integerControlTester,
  NativeControl,
  nativeControlTester,
  MaterialNumberControl,
  numberControlTester,
  OneOfEnumControl,
  oneOfEnumControlTester,
  RadioGroupControl,
  radioGroupControlTesterGroup,
  SliderControl,
  sliderControlTester,
  TextControl,
  textControlTester,
  OneOfRadioGroupControl,
  oneOfRadioGroupControlTester
} from './controls';
import {
  MaterialArrayLayout,
  materialArrayLayoutTester,
  CategorizationLayout,
  categorizationTester,
  GroupLayout,
  antdGroupTester,
  MaterialHorizontalLayout,
  materialHorizontalLayoutTester,
  MaterialVerticalLayout,
  materialVerticalLayoutTester
} from './layouts';
import {
  MaterialBooleanCell,
  materialBooleanCellTester,
  MaterialBooleanToggleCell,
  materialBooleanToggleCellTester,
  MaterialDateCell,
  materialDateCellTester,
  MaterialEnumCell,
  materialEnumCellTester,
  MaterialIntegerCell,
  materialIntegerCellTester,
  MaterialNumberCell,
  materialNumberCellTester,
  MaterialNumberFormatCell,
  materialNumberFormatCellTester,
  MaterialOneOfEnumCell,
  materialOneOfEnumCellTester,
  MaterialTextCell,
  materialTextCellTester,
  MaterialTimeCell,
  materialTimeCellTester
} from './cells';
import MaterialCategorizationStepperLayout, {
  categorizationStepperTester
} from './layouts/CategorizationStepperLayout';

export * from './complex';
export * from './controls';
export * from './layouts';
export * from './cells';
export * from './antd-controls';
export * from './util';

export const renderers: JsonFormsRendererRegistryEntry[] = [
  // controls
  {
    tester: materialArrayControlTester,
    renderer: MaterialArrayControlRenderer
  },
  { tester: booleanControlTester, renderer: BooleanControl },
  { tester: booleanToggleControlTester, renderer: BooleanToggleControl },
  { tester: nativeControlTester, renderer: NativeControl },
  { tester: enumControlTester, renderer: MaterialEnumControl },
  { tester: integerControlTester, renderer: IntegerControl },
  { tester: numberControlTester, renderer: MaterialNumberControl },
  { tester: textControlTester, renderer: TextControl },
  { tester: dateTimeControlTester, renderer: DateTimeControl },
  { tester: dateControlTester, renderer: MaterialDateControl },
  { tester: sliderControlTester, renderer: SliderControl },
  { tester: materialObjectControlTester, renderer: MaterialObjectRenderer },
  { tester: materialAllOfControlTester, renderer: MaterialAllOfRenderer },
  { tester: materialAnyOfControlTester, renderer: MaterialAnyOfRenderer },
  { tester: materialOneOfControlTester, renderer: MaterialOneOfRenderer },
  {
    tester: radioGroupControlTesterGroup,
    renderer: RadioGroupControl
  },
  {
    tester: oneOfRadioGroupControlTester,
    renderer: OneOfRadioGroupControl
  },
  { tester: oneOfEnumControlTester, renderer: OneOfEnumControl },
  // layouts
  { tester: antdGroupTester, renderer: GroupLayout },
  {
    tester: materialHorizontalLayoutTester,
    renderer: MaterialHorizontalLayout
  },
  { tester: materialVerticalLayoutTester, renderer: MaterialVerticalLayout },
  {
    tester: categorizationTester,
    renderer: CategorizationLayout
  },
  {
    tester: categorizationStepperTester,
    renderer: MaterialCategorizationStepperLayout
  },
  { tester: materialArrayLayoutTester, renderer: MaterialArrayLayout },
  // additional
  { tester: materialLabelRendererTester, renderer: MaterialLabelRenderer },
  {
    tester: materialListWithDetailTester,
    renderer: MaterialListWithDetailRenderer
  },
  {
    tester: anyOfStringOrEnumControlTester,
    renderer: AnyOfStringOrEnumControl
  },
  {
    tester: materialEnumArrayRendererTester,
    renderer: MaterialEnumArrayRenderer
  }
];

export const cells: JsonFormsCellRendererRegistryEntry[] = [
  { tester: materialBooleanCellTester, cell: MaterialBooleanCell },
  { tester: materialBooleanToggleCellTester, cell: MaterialBooleanToggleCell },
  { tester: materialDateCellTester, cell: MaterialDateCell },
  { tester: materialEnumCellTester, cell: MaterialEnumCell },
  { tester: materialIntegerCellTester, cell: MaterialIntegerCell },
  { tester: materialNumberCellTester, cell: MaterialNumberCell },
  { tester: materialNumberFormatCellTester, cell: MaterialNumberFormatCell },
  { tester: materialOneOfEnumCellTester, cell: MaterialOneOfEnumCell },
  { tester: materialTextCellTester, cell: MaterialTextCell },
  { tester: materialTimeCellTester, cell: MaterialTimeCell }
];
