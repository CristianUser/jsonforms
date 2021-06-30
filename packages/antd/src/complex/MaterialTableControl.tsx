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
import union from 'lodash/union';
import {
  DispatchCell,
  JsonFormsStateContext,
  useJsonForms
} from '@jsonforms/react';
import startCase from 'lodash/startCase';
import range from 'lodash/range';
import React, { Fragment } from 'react';
import { Grid } from '@material-ui/core';
import {
  ArrayLayoutProps,
  ControlElement,
  errorsAt,
  formatErrorMessage,
  JsonSchema,
  Paths,
  Resolve,
  JsonFormsRendererRegistryEntry,
  JsonFormsCellRendererRegistryEntry
} from '@jsonforms/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import ArrowUpward from '@material-ui/icons/ArrowUpward';

import { WithDeleteDialogSupport } from './DeleteDialog';
import TableToolbar from './TableToolbar';
import { ErrorObject } from 'ajv';
import merge from 'lodash/merge';
import { Table, Typography } from 'antd';

const { Text } = Typography;

// we want a cell that doesn't automatically span
// const styles = {
//   fixedCell: {
//     width: '150px',
//     height: '50px',
//     paddingLeft: 0,
//     paddingRight: 0,
//     textAlign: 'center'
//   },
//   fixedCellSmall: {
//     width: '50px',
//     height: '50px',
//     paddingLeft: 0,
//     paddingRight: 0,
//     textAlign: 'center'
//   }
// };

const RenderActionsCell = (props: any) => {
  const {
    config,
    uischema,
    path,
    index,
    moveUp,
    enableUp,
    moveDown,
    enableDown,
    openDeleteDialog
  } = props;
  const appliedUiSchemaOptions = merge({}, config, uischema.options);
  const childPath = Paths.compose(path, `${index}`)

  return <Grid
          container
          direction='row'
          justify='flex-end'
          alignItems='center'
        >
          {appliedUiSchemaOptions.showSortButtons ? (
            <Fragment>
              <Grid item>
                <IconButton
                  aria-label={`Move up`}
                  onClick={moveUp}
                  disabled={!enableUp}
                >
                  <ArrowUpward />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton
                  aria-label={`Move down`}
                  onClick={moveDown}
                  disabled={!enableDown}
                >
                  <ArrowDownward />
                </IconButton>
              </Grid>
            </Fragment>
          ) : null}
          <Grid item>
            <IconButton
              aria-label={`Delete`}
              onClick={() => openDeleteDialog(childPath, index)}
            >
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
}

const generateColumns = (props: any) => {
  const {
    path,
    schema,
    rootSchema,
    // errors,
    enabled,
    renderers,
    cells
  } = props;
  if (schema.type === 'object') {
    return getValidColumnProps(schema).map(prop => {
      const props = {
        dataIndex: prop,
        editable: enabled,
        title: schema.properties?.[prop]?.title ?? startCase(prop),
        render: (_field: any, _row: any, index: number) => {
          const rowPath = Paths.compose(path, `${index}`);

          return <RenderCell schema={schema} propName={prop} rowPath={rowPath} enabled={enabled}
            renderers={renderers}
            cells={cells} />
        }
      };

      return props;
    }).concat([{
      dataIndex: '',
      title: '',
      editable: true,
      render: (_field: any, _row: any, index: number) => {
        return <RenderActionsCell {...{index, ...props}}/>
      }
    }]);
  } else {
    // primitives
    const props = {
      editable: enabled,
      render: () => {
        return <DispatchCell
          schema={Resolve.schema(
            schema,
            `#/properties/${path}`,
            rootSchema
          )}
          uischema={controlWithoutLabel(`#/properties/${path}`)}
          path={'path'}
          enabled={enabled}
          renderers={renderers}
          cells={cells}
        />
      }
    };
    return props;
  }
};

const getValidColumnProps = (scopedSchema: JsonSchema) => {
  if (scopedSchema.type === 'object' && typeof scopedSchema.properties === 'object') {
    return Object.keys(scopedSchema.properties).filter(
      prop => scopedSchema.properties[prop].type !== 'array'
    );
  }
  // primitives
  return [''];
};

export interface EmptyTableProps {
  numColumns: number;
}
interface RenderCellProps extends OwnPropsOfRenderCell {
  rootSchema: JsonSchema;
  errors: string;
  path: string;
  enabled: boolean;
}
interface OwnPropsOfRenderCell {
  rowPath: string;
  propName?: string;
  schema: JsonSchema;
  enabled: boolean;
  renderers?: JsonFormsRendererRegistryEntry[];
  cells?: JsonFormsCellRendererRegistryEntry[];
}
const ctxToRenderCellProps = (
  ctx: JsonFormsStateContext,
  ownProps: OwnPropsOfRenderCell
): RenderCellProps => {
  const path =
    ownProps.rowPath +
    (ownProps.schema.type === 'object' ? '.' + ownProps.propName : '');
  const errors = formatErrorMessage(
    union(
      errorsAt(
        path,
        ownProps.schema,
        p => p === path
      )(ctx.core.errors).map((error: ErrorObject) => error.message)
    )
  );
  return {
    rowPath: ownProps.rowPath,
    propName: ownProps.propName,
    schema: ownProps.schema,
    rootSchema: ctx.core.schema,
    errors,
    path,
    enabled: ownProps.enabled,
    cells: ownProps.cells || ctx.cells,
    renderers: ownProps.renderers || ctx.renderers
  };
};

const controlWithoutLabel = (scope: string): ControlElement => ({
  type: 'Control',
  scope: scope,
  label: false
});

const RenderCell = (ownProps: OwnPropsOfRenderCell) => {
  const ctx = useJsonForms();
  const {
    path,
    propName,
    schema,
    rootSchema,
    errors,
    enabled,
    renderers,
    cells
  } = ctxToRenderCellProps(ctx, ownProps);

  const isValid = isEmpty(errors);
  return (
    <>
      {schema.properties ? (
        <DispatchCell
          schema={Resolve.schema(
            schema,
            `#/properties/${propName}`,
            rootSchema
          )}
          uischema={controlWithoutLabel(`#/properties/${propName}`)}
          path={path}
          enabled={enabled}
          renderers={renderers}
          cells={cells}
        />
      ) : (
        <DispatchCell
          schema={schema}
          uischema={controlWithoutLabel('#')}
          path={path}
          enabled={enabled}
          renderers={renderers}
          cells={cells}
        />
      )}
      {!isValid && <Text type={'danger'}>{errors}</Text>}
    </>
  );
};

export class MaterialTableControl extends React.Component<
  ArrayLayoutProps & WithDeleteDialogSupport,
  any
> {
  addItem = (path: string, value: any) => this.props.addItem(path, value);
  render() {
    const {
      label,
      path,
      schema,
      rootSchema,
      uischema,
      errors,
      visible,
      enabled,
      data
    } = this.props;

    const controlElement = uischema as ControlElement;
    const isObjectSchema = schema.type === 'object';

    const columns: any = generateColumns(this.props)
    const dataSource = isObjectSchema ? range(data).map(index => ({ index })) : []
    return (
      <div hidden={!visible}>
        <TableToolbar
          errors={errors}
          label={label}
          addItem={this.addItem}
          numColumns={isObjectSchema ? columns.length : 1}
          path={path}
          uischema={controlElement}
          schema={schema}
          rootSchema={rootSchema}
          enabled={enabled}
        />
        <Table columns={columns} dataSource={dataSource} />
      </div>
    );
  }
}
