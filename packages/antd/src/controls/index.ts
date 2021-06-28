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
import BooleanControl, {
  booleanControlTester,
  BooleanControl as BooleanControlUnwrapped
} from './BooleanControl';
import BooleanToggleControl, {
  booleanToggleControlTester,
  BooleanToggleControl as BooleanToggleControlUnwrapped
} from './BooleanToggleControl';
import MaterialEnumControl, {
  enumControlTester,
  EnumControl as EnumControlUnwrapped
} from './EnumControl';
import NativeControl, {
  nativeControlTester,
  NativeControl as NativeControlUnwrapped
} from './NativeControl';
import MaterialDateControl, {
  dateControlTester,
  DateControl as MaterialDateControlUnwrapped
} from './DateControl';
import DateTimeControl, {
  dateTimeControlTester,
  DateTimeControl as DateTimeControlUnwrapped
} from './DateTimeControl';
import SliderControl, {
  sliderControlTester,
  SliderControl as SliderControlUnwrapped
} from './SliderControl';
import RadioGroupControl, {
  radioGroupControlTesterGroup,
  RadioGroupControl as RadioGroupControlUnwrapped
} from './RadioGroupControl';
import IntegerControl, {
  integerControlTester,
  IntegerControl as IntegerControlUnwrapped
} from './IntegerControl';
import MaterialNumberControl, {
  numberControlTester,
  NumberControl as NumberControlUnwrapped
} from './NumberControl';
import TextControl, {
  textControlTester,
  TextControl as TextControlUnwrapped
} from './TextControl';

import AnyOfStringOrEnumControl, {
  anyOfStringOrEnumControlTester,
  AnyOfStringOrEnumControl as AnyOfStringOrEnumControlUnwrapped
} from './AnyOfStringOrEnumControl';

import OneOfEnumControl, {
  oneOfEnumControlTester,
  OneOfEnumControl as OneOfEnumControlUnwrapped
} from './OneOfEnumControl';

import OneOfRadioGroupControl, {
  oneOfRadioGroupControlTester,
  OneOfRadioGroupControl as OneOfRadioGroupControlUnwrapped
} from './OneOfRadioGroupControl';

export const Unwrapped = {
  BooleanControl: BooleanControlUnwrapped,
  BooleanToggleControl: BooleanToggleControlUnwrapped,
  MaterialEnumControl: EnumControlUnwrapped,
  NativeControl: NativeControlUnwrapped,
  MaterialDateControl: MaterialDateControlUnwrapped,
  DateTimeControl: DateTimeControlUnwrapped,
  SliderControl: SliderControlUnwrapped,
  RadioGroupControl: RadioGroupControlUnwrapped,
  IntegerControl: IntegerControlUnwrapped,
  MaterialNumberControl: NumberControlUnwrapped,
  TextControl: TextControlUnwrapped,
  AnyOfStringOrEnumControl: AnyOfStringOrEnumControlUnwrapped,
  OneOfEnumControl: OneOfEnumControlUnwrapped,
  OneOfRadioGroupControl: OneOfRadioGroupControlUnwrapped
};

export {
  BooleanControl,
  booleanControlTester,
  BooleanToggleControl,
  booleanToggleControlTester,
  MaterialEnumControl,
  enumControlTester,
  NativeControl,
  nativeControlTester,
  MaterialDateControl,
  dateControlTester,
  DateTimeControl,
  dateTimeControlTester,
  SliderControl,
  sliderControlTester,
  RadioGroupControl,
  radioGroupControlTesterGroup,
  IntegerControl,
  integerControlTester,
  MaterialNumberControl,
  numberControlTester,
  TextControl,
  textControlTester,
  AnyOfStringOrEnumControl,
  anyOfStringOrEnumControlTester,
  OneOfEnumControl,
  oneOfEnumControlTester,
  OneOfRadioGroupControl,
  oneOfRadioGroupControlTester
};

export * from './InputControl';
