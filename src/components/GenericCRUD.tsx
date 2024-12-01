import { useState } from "react";
import { Table, Button, Modal, Form, Input, Space, message } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import LoadingSpinner from "./LoadingSpinner";
import { Area, BffEntity, EntityType } from "../interfaces/entities";
import { useItemsForm } from "../hooks/useItemsForm";
import { AdditionalData, FormColumns } from "../interfaces/form";
import { setFormValues } from "../helpers/formValues";
import { updateArea } from "../apiServices/areas/areasService";
import { useEditEntity } from "../hooks/useEditEntity";

interface GenericCRUDProps {
  title: string;
  items: BffEntity[];
  columns: FormColumns[];
  isLoading: boolean;
  entityType: EntityType;
  additionalData: AdditionalData;
  refetchData: () => void;
}

const GenericCRUD = ({
  title,
  items,
  columns,
  isLoading,
  entityType,
  additionalData,
}: //refetchData,
GenericCRUDProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<string | null>(null);
  const { renderFormItems } = useItemsForm(
    entityType,
    editingId,
    additionalData
  );

  const { mutateAsync: editEntity, isPending: isMutating } =
    useEditEntity(entityType);

  const showModal = (id: string | null = null) => {
    setIsModalVisible(true);
    setEditingId(id);
    if (id) {
      //Find the entity to edit
      const entity = items.find((item) => item._id === id);

      if (entity) {
        // Set the id to be edited
        setFormValues(form, entityType, entity);
      }
    }
  };

  const handleDelete = (id: string) => {
    //TODO: handle delete
  };

  const handleSubmit = async () => {
    try {
      const values = form.getFieldsValue();

      if (editingId) {
        // If we are editing, call the mutation to update the entity
        await editEntity({
          id: editingId,
          data: {
            name: values.name,
            departments: values.departments,
          },
        });
        message.success("Update successful");
      } else {
        //TODO: create new entity
        message.success("Creation successful");
      }
      setIsModalVisible(false);
      form.resetFields(); // Reset fields after successful submission
      //refetchData();
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
      <LoadingSpinner isLoading={isLoading || isMutating} />
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
