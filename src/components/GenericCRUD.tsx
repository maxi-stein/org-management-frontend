import { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Space, message } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { BffEntity, EntityType } from "../interfaces/entities";
import { useItemsForm } from "../hooks/useItemsForm";
import { FormColumns } from "../interfaces/form";
import { getDataForEntity, setFormValues } from "../helpers/formHelpers";
import { useEditEntity } from "../hooks/useEditEntity";
import { useCreateEntity } from "../hooks/useCreateEntity";
import { useDeleteEntity } from "../hooks/useDeleteEntity";
import AlertModal, { RelatedEntity } from "./AlertModal";

interface GenericCRUDProps {
  title: string;
  items: BffEntity[] | undefined;
  columns: FormColumns[];
  entityType: EntityType;
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
  refetchData: () => void;
  relatedEntities: RelatedEntity[];
}

const GenericCRUD = ({
  title,
  items,
  columns,
  entityType,
  selectedId,
  setSelectedId,
  refetchData,
  relatedEntities,
}: GenericCRUDProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAlertModalVisible, setIsAlertModalVisible] = useState(false);
  const [form] = Form.useForm();
  const { renderFormItems } = useItemsForm(entityType, selectedId);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (selectedId) {
      setIsEditing(true);
    } else {
      setIsEditing(false);
    }
  }, [selectedId]);

  const { editEntity } = useEditEntity(entityType);
  const { createEntity } = useCreateEntity(entityType);
  const { deleteEntity } = useDeleteEntity(entityType);

  const showModal = (id: string | null = null) => {
    setIsModalVisible(true);
    setSelectedId(id);
    if (id) {
      //Find the entity to edit
      const entity = items?.find((item) => item._id === id);

      if (entity) {
        // Set the id to be edited
        setFormValues(form, entityType, entity);
      }
    }
  };

  const handleDelete = (deleteingId: string) => {
    setSelectedId(deleteingId);
    setIsAlertModalVisible(true);
  };
  const confirmDelete = async () => {
    if (selectedId) {
      try {
        await deleteEntity(selectedId);
        refetchData();
      } catch (error) {
        console.error("Error deleting entity:", error);
        throw new Error("Error deleting entity");
      }
    }
    setIsAlertModalVisible(false);
    setSelectedId(null);
  };

  const cancelDelete = () => {
    setIsAlertModalVisible(false);
    setSelectedId(null);
  };

  const handleSubmit = async () => {
    try {
      const isValid = await form.validateFields().then(
        () => true,
        () => false
      );

      if (!isValid) return;

      const values = form.getFieldsValue();

      console.log(values);

      if (selectedId) {
        // If we are editing, call the mutation to update the entity
        await editEntity({
          id: selectedId,
          data: getDataForEntity(entityType, values),
        });
        message.success("Update successful");
      } else {
        await createEntity({
          data: getDataForEntity(entityType, values),
        });
        message.success("Creation successful");
      }
      setIsModalVisible(false);
      form.resetFields(); // Reset fields after successful submission
      refetchData();
    } catch (error) {
      message.error(
        "There was an issue submitting the form. Please try again later"
      );
    }
  };

  const actionColumn = {
    title: "Action",
    key: "action",
    render: (record: BffEntity) => (
      <Space size="middle">
        <Button icon={<EditOutlined />} onClick={() => showModal(record._id)} />
        {entityType != "users" && (
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record._id ?? "")}
            danger
          />
        )}
      </Space>
    ),
  };
  return (
    <div>
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
        rowKey="_id"
      />
      <Modal
        title={
          selectedId === null
            ? `Add ${title.slice(0, -1)}`
            : `Edit ${title.slice(0, -1)}`
        }
        open={isModalVisible}
        onOk={handleSubmit}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
        }}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          {renderFormItems(columns, isEditing)}
        </Form>
      </Modal>
      <AlertModal
        isVisible={isAlertModalVisible}
        title={`Delete ${title.slice(0, -1)}`}
        content={`Are you sure you want to delete this ${title
          .toLowerCase()
          .slice(0, -1)}?`}
        entityName={title.slice(0, -1)}
        relatedEntities={relatedEntities}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
};

export default GenericCRUD;
