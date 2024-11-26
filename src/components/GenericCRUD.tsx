import { useState } from "react";
import { Table, Button, Modal, Form, Input, Space } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import LoadingSpinner from "./LoadingSpinner";
import { BffEntity } from "../interfaces/entities";

interface GenericCRUDProps {
  title: string;
  items: BffEntity[];
  columns: { title: string; dataIndex: string; key: string }[];
  isLoading: boolean;
}

const GenericCRUD = ({
  title,
  items,
  columns,
  isLoading,
}: GenericCRUDProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<string | null>(null);

  const showModal = (id: string | null = null) => {
    //TODO: handle show edit/delete
    setIsModalVisible(true);
  };

  const handleOk = () => {
    //TODO: handle save
    setIsModalVisible(false);
  };

  const handleDelete = (id: string) => {
    //TODO: handle delete
  };

  const actionColumn = {
    title: "Action",
    key: "action",
    render: (_: any, record: BffEntity) => (
      <Space size="middle">
        <Button icon={<EditOutlined />} onClick={() => showModal(record._id)} />
        <Button
          icon={<DeleteOutlined />}
          onClick={() => handleDelete(record._id)}
          danger
        />
      </Space>
    ),
  };
  return (
    <div>
      <LoadingSpinner isLoading={isLoading} />
      <h2>{title}</h2>
      <Button
        icon={<PlusOutlined />}
        onClick={() => showModal()}
        style={{ marginBottom: 16 }}
      >
        Add {title}
      </Button>
      <Table
        columns={[...columns, actionColumn]}
        dataSource={items}
        rowKey="id"
      />
      <Modal
        title={editingId === null ? `Add ${title}` : `Edit ${title}`}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          {columns.map((column) => (
            <Form.Item
              key={column.key}
              name={column.dataIndex}
              label={column.title}
              rules={[
                { required: true, message: `Please input ${column.title}!` },
              ]}
            >
              <Input />
            </Form.Item>
          ))}
        </Form>
      </Modal>
    </div>
  );
};

export default GenericCRUD;
