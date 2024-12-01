import React from "react";
import { Modal, Button, Typography, List } from "antd";
import { EntityType } from "../interfaces/entities";

const { Text, Title } = Typography;

export interface RelatedEntity {
  type: EntityType;
  items: { name: string }[];
}

interface AlertModalProps {
  isVisible: boolean;
  title: string;
  content: string;
  entityName: string;
  relatedEntities?: RelatedEntity[];
  onConfirm: () => void;
  onCancel: () => void;
}

const AlertModal: React.FC<AlertModalProps> = ({
  isVisible,
  title,
  content,
  entityName,
  relatedEntities,
  onConfirm,
  onCancel,
}) => {
  const canDelete = !relatedEntities || relatedEntities.length === 0;

  return (
    <Modal
      title={<Title level={4}>{title}</Title>}
      open={isVisible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button
          key="confirm"
          type="primary"
          danger
          onClick={onConfirm}
          disabled={!canDelete}
        >
          Confirm
        </Button>,
      ]}
    >
      {canDelete ? (
        <Text>{content}</Text>
      ) : (
        <>
          <Text
            type="danger"
            strong
            style={{ display: "block", marginTop: 16 }}
          >
            You cannot delete this {entityName.toLowerCase()}. The following
            entities are associated with it:
          </Text>
          {relatedEntities?.map((entity) => (
            <List
              key={entity.type}
              size="small"
              header={
                <Text strong>
                  {entity.type.charAt(0).toUpperCase() + entity.type.slice(1)}
                </Text>
              }
              dataSource={entity.items}
              renderItem={(item) => <List.Item>{item.name}</List.Item>}
            />
          ))}
        </>
      )}
    </Modal>
  );
};

export default AlertModal;
