import { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Space, message } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { BffEntity, EntityType, Position } from "../interfaces/entities";
import { useItemsForm } from "../hooks/useItemsForm";
import { FormColumns } from "../interfaces/form";
import { getDataForEntity, setFormValues } from "../helpers/formHelpers";
import { useEditEntity } from "../hooks/react-query/useEditEntity";
import { useCreateEntity } from "../hooks/react-query/useCreateEntity";
import { useDeleteEntity } from "../hooks/react-query/useDeleteEntity";
import AlertModal, { RelatedEntity } from "./AlertModal";
import Title from "antd/es/typography/Title";

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
        <Button
          icon={<DeleteOutlined />}
          onClick={() => handleDelete(record._id ?? "")}
          danger
        />
      </Space>
    ),
  };

  //Dont render Head of Department or CEO as they are not editable/deletable
  if (entityType === "positions") {
    let itemsFiltered = items as Position[];
    itemsFiltered = itemsFiltered?.filter(
      (item) => item.title !== "Head Of Department" && item.title !== "CEO"
    );
    items = itemsFiltered;
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Title level={3}>{title}</Title>
        <Button
          color="primary"
          variant="solid"
          icon={<PlusOutlined />}
          onClick={() => showModal()}
          style={{ marginBottom: 16 }}
        >
          Add {title}
        </Button>
      </div>
      <Table
        columns={[...columns, actionColumn]}
        dataSource={items}
        rowKey="_id"
        pagination={{ pageSize: 5 }}
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
