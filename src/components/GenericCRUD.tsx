import { useState } from "react";
import { Table, Button, Modal, Form, Input, Space, message } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import LoadingSpinner from "./LoadingSpinner";
import { BffEntity, EntityType } from "../interfaces/entities";
import { useItemsForm } from "../hooks/useItemsForm";
import { AdditionalData, FormColumns } from "../interfaces/form";

interface GenericCRUDProps {
  title: string;
  items: BffEntity[];
  columns: FormColumns[];
  isLoading: boolean;
  entityType: EntityType;
  additionalData: AdditionalData;
}

const GenericCRUD = ({
  title,
  items,
  columns,
  isLoading,
  entityType,
  additionalData,
}: GenericCRUDProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<string | null>(null);
  const { renderFormItems } = useItemsForm(
    entityType,
    editingId,
    additionalData
  );

  const showModal = (id: string | null = null) => {
    //TODO: handle show create/edit
    setIsModalVisible(true);
  };

  const handleDelete = (id: string) => {
    //TODO: handle delete
  };

  const handleSubmit = async (values: any) => {
    try {
      if (editingId) {
        //TODO: submit edit
      } else {
        // TODO: submit create
      }
      form.submit();
      message.success("Form sent successfully");
      setIsModalVisible(false);
      form.resetFields(); // Reset fields after submiting
    } catch (error) {
      message.error(
        "There was an issue submitting the form. Please try again later"
      );
    }
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
        color="primary"
        variant="solid"
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
        onOk={handleSubmit}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          {renderFormItems(columns)}
        </Form>
      </Modal>
    </div>
  );
};

export default GenericCRUD;
