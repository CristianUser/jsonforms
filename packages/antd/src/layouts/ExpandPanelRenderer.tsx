import merge from 'lodash/merge';
import get from 'lodash/get';
import React, { Dispatch, ReducerAction, useMemo } from 'react';
import { ComponentType } from 'enzyme';
import {
  // areEqual,
  JsonFormsDispatch,
  // JsonFormsStateContext,
  useJsonForms
} from '@jsonforms/react';
import {
  composePaths,
  ControlElement,
  findUISchema,
  getFirstPrimitiveProp,
  JsonFormsCellRendererRegistryEntry,
  JsonFormsRendererRegistryEntry,
  JsonFormsUISchemaRegistryEntry,
  JsonSchema,
  moveDown,
  moveUp,
  Resolve,
  update
} from '@jsonforms/core';
import { Avatar, Button, Collapse, Space, Tooltip, Typography } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined, DeleteFilled } from '@ant-design/icons';
import Hidden from '../util/Hidden';

interface OwnPropsOfExpandPanel {
  index: number;
  path: string;
  disabled?: boolean;
  collapsible?: boolean;
  uischema: ControlElement;
  schema: JsonSchema;
  expanded?: boolean;
  renderers?: JsonFormsRendererRegistryEntry[];
  cells?: JsonFormsCellRendererRegistryEntry[];
  uischemas?: JsonFormsUISchemaRegistryEntry[];
  rootSchema: JsonSchema;
  enableMoveUp: boolean;
  enableMoveDown: boolean;
  config: any;
  childLabelProp?: string;
  isExpanded?: boolean;
  handleChange?(index: number): void;
}

interface StatePropsOfExpandPanel extends OwnPropsOfExpandPanel {
  key: React.Key;
  childLabel: string;
  childPath: string;
  enableMoveUp: boolean;
  enableMoveDown: boolean;
}

/**
 * Dispatch props of a table control
 */
export interface DispatchPropsOfExpandPanel {
  disabled?: boolean;
  collapsible?: boolean;
  removeItems(path: string, toDelete: number[]): (event: any) => void;
  moveUp(path: string, toMove: number): (event: any) => void;
  moveDown(path: string, toMove: number): (event: any) => void;
}

export interface ExpandPanelProps
  extends StatePropsOfExpandPanel,
  DispatchPropsOfExpandPanel { }

const ExpandPanelRenderer = (props: ExpandPanelProps & any) => {
  const {
    childLabel,
    childPath,
    index,
    key,
    moveDown,
    moveUp,
    enableMoveDown,
    enableMoveUp,
    removeItems,
    path,
    rootSchema,
    schema,
    uischema,
    uischemas,
    renderers,
    cells,
    config,
    handleChange,
    isExpanded,
    ...panelProps
  } = props;

  const foundUISchema = useMemo(
    () =>
      findUISchema(
        uischemas,
        schema,
        uischema.scope,
        path,
        undefined,
        uischema,
        rootSchema
      ),
    [uischemas, schema, uischema.scope, path, uischema, rootSchema]
  );

  const appliedUiSchemaOptions = merge({}, config, uischema.options);
  const avatarStyle = isExpanded ? { backgroundColor: '#1890FF' } : {};

  const getExtra = () => {
    return (appliedUiSchemaOptions.showSortButtons ? (
      [
        <Tooltip key='1' title='Move up'>
          <Button shape='circle' icon={<ArrowUpOutlined />} onClick={moveUp(path, index)} disabled={!enableMoveUp} />
        </Tooltip>,
        <Tooltip key='2' title='Move down'>
          <Button shape='circle' icon={<ArrowDownOutlined />} onClick={moveDown(path, index)} disabled={!enableMoveDown} />
        </Tooltip>]
    ) :
      []
    ).concat(
      <Tooltip key='3' title='Delete'>
        <Button
          shape='circle'
          onClick={removeItems(path, [index])}
          icon={<DeleteFilled />}
        />
      </Tooltip>
    );
  };

  return (
    <Collapse.Panel
      {...panelProps}
      key={key}
      header={<>
        <Avatar style={avatarStyle}>{index + 1}</Avatar>
        <Hidden hidden={!childLabel}>
          <Typography.Text>{childLabel}</Typography.Text>
        </Hidden>
      </>}
      extra={<Space>{getExtra()}</Space>}
    >
      <JsonFormsDispatch
        schema={schema}
        uischema={foundUISchema}
        path={childPath}
        key={childPath}
        renderers={renderers}
        cells={cells}
      />
    </Collapse.Panel>
  );
};

/**
 * Maps state to dispatch properties of an expand pandel control.
 *
 * @param dispatch the store's dispatch method
 * @returns {DispatchPropsOfArrayControl} dispatch props of an expand panel control
 */
export const ctxDispatchToExpandPanelProps: (
  dispatch: Dispatch<ReducerAction<any>>
) => DispatchPropsOfExpandPanel = dispatch => ({
  removeItems: (path: string, toDelete: number[]) => (event: any): void => {
    event.stopPropagation();
    dispatch(
      update(path, array => {
        toDelete
          .sort()
          .reverse()
          .forEach(s => array.splice(s, 1));
        return array;
      })
    );
  },
  moveUp: (path: string, toMove: number) => (event: any): void => {
    event.stopPropagation();
    dispatch(
      update(path, array => {
        moveUp(array, toMove);
        return array;
      })
    );
  },
  moveDown: (path: string, toMove: number) => (event: any): void => {
    event.stopPropagation();
    dispatch(
      update(path, array => {
        moveDown(array, toMove);
        return array;
      })
    );
  }
});

/**
 * Map state to control props.
 * @param state the JSON Forms state
 * @param ownProps any own props
 * @returns {StatePropsOfControl} state props for a control
 */
export const withContextToExpandPanelProps = (
  Component: ComponentType<ExpandPanelProps>
): ComponentType<OwnPropsOfExpandPanel> => (
  props: ExpandPanelProps) => {
    const ctx = useJsonForms();
    const dispatchProps = ctxDispatchToExpandPanelProps(ctx.dispatch);
    const { childLabelProp, schema, path, index, uischemas } = props;
    const childPath = composePaths(path, `${index}`);
    const childData = Resolve.data(ctx.core.data, childPath);
    const childLabel = childLabelProp
      ? get(childData, childLabelProp, '')
      : get(childData, getFirstPrimitiveProp(schema), '');

    return (
      <Component
        {...props}
        {...dispatchProps}
        childLabel={childLabel}
        childPath={childPath}
        uischemas={uischemas}
      />
    );
  };

export const withJsonFormsExpandPanelProps = (
  Component: ComponentType<ExpandPanelProps>
): ComponentType<OwnPropsOfExpandPanel> =>
  withContextToExpandPanelProps(Component);

export default withJsonFormsExpandPanelProps(ExpandPanelRenderer);
