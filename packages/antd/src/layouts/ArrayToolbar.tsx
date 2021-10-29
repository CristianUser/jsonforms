import { Button, Col, PageHeader, Row, Tooltip, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Labels } from '@jsonforms/core';
import React from 'react';
import ValidationIcon from '../complex/ValidationIcon';
export interface ArrayLayoutToolbarProps {
  label: string;
  errors: string;
  path: string;
  addItem(path: string, data: any): () => void;
  createDefault(): any;
}

const { Title } = Typography;

const renderTitle = (label: string | Labels, errors: string) =>
(
  <Row>
    <Col key="col_1">
      <Title level={3} >{label}</Title>
    </Col>
    <Col key="col_2" style={{ padding: '0 10px' }}>
      <ValidationIcon id='tooltip-validation' errorMessages={errors} />
    </Col>
  </Row>
);

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
        title={renderTitle(label, errors)}
        extra={
          <Tooltip key='1' title={`Add to ${label}`}>
            <Button type='primary' onClick={addItem(path, createDefault())} shape='circle' icon={<PlusOutlined />} />
          </Tooltip>
        }
      />
    );
  }
);
