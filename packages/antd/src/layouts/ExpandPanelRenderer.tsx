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
  JsonFormsRendererRegistryEntry,
  JsonSchema,
  moveDown,
  moveUp,
  Resolve,
  update,
  JsonFormsCellRendererRegistryEntry,
  JsonFormsUISchemaRegistryEntry,
  getFirstPrimitiveProp
} from '@jsonforms/core';
import { Button, Collapse } from 'antd';

const iconStyle: any = { float: 'right' };

interface OwnPropsOfExpandPanel {
  index: number;
  path: string;
  disabled?: boolean
  collapsible?: boolean
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
  handleChange?: (index: number) => void
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

const ExpandPanelRenderer = (props: ExpandPanelProps) => {
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
    handleChange
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

  return (
    <Collapse.Panel
      key={key}
      header={<div onClick={() => {
        console.log('klk', index)
        handleChange(index)
      }}>
        `${index + 1} ${childLabel}`
      </div>}
      extra={
        (appliedUiSchemaOptions.showSortButtons ? (
          [<Button
            key="1"
            onClick={moveUp(path, index)}
            style={iconStyle}
            disabled={!enableMoveUp}
            aria-label={`Move up`}
          >
            Move up
          </Button>,
          <Button
            key="2"
            onClick={moveDown(path, index)}
            style={iconStyle}
            disabled={!enableMoveDown}
            aria-label={`Move down`}
          >
            Move down
          </Button>]
        ) :
          []
        ).concat(<Button
          key="3"
          onClick={removeItems(path, [index])}
          style={iconStyle}
          aria-label={`Delete`}
        >
          Delete
        </Button>)
      }
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
  props:  ExpandPanelProps) => {
    const ctx = useJsonForms()
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
    withContextToExpandPanelProps(Component)

export default withJsonFormsExpandPanelProps(ExpandPanelRenderer);
