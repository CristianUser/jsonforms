import { Button, PageHeader, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons'
import React from 'react';
export interface ArrayLayoutToolbarProps {
  label: string;
  errors: string;
  path: string;
  addItem(path: string, data: any): () => void;
  createDefault(): any;
}
export const ArrayLayoutToolbar = React.memo(
  ({
    label,
    errors,
    addItem,
    path,
    createDefault
  }: ArrayLayoutToolbarProps) => {
    return (
      <PageHeader
        ghost={false}
        title={label}
        subTitle={errors.length ? errors : ''}
        extra={[
          <Tooltip key="1" title={`Add to ${label}`}>
            <Button type="primary" onClick={addItem(path, createDefault())} shape="circle" icon={<PlusOutlined />} />
          </Tooltip>
        ]}
      />
    );
  }
);
