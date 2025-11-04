import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";

interface DeliveryDetailsModalProps {
  visible: boolean;
  onClose: () => void;
  deliveryData?: {
    orderId?: string;
    customerName?: string;
    address?: string;
    phone?: string;
    items?: Array<{ name: string; quantity: number }>;
    totalAmount?: number;
    status?: string;
  };
}

const DeliveryDetailsModal: React.FC<DeliveryDetailsModalProps> = ({
  visible,
  onClose,
  deliveryData,
}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>{/* Header */}</View>
      </View>
    </Modal>
  );
};

export default DeliveryDetailsModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "80%",
    paddingBottom: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  closeButton: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: 24,
    color: "#666",
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: "#666",
    marginBottom: 6,
    fontWeight: "500",
  },
  value: {
    fontSize: 16,
    color: "#333",
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
  },
  itemName: {
    fontSize: 15,
    color: "#333",
    flex: 1,
  },
  itemQuantity: {
    fontSize: 15,
    color: "#666",
    fontWeight: "600",
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2ecc71",
  },
  statusBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: "#e0e0e0",
  },
  statusDelivered: {
    backgroundColor: "#d4edda",
  },
  statusInProgress: {
    backgroundColor: "#fff3cd",
  },
  statusPending: {
    backgroundColor: "#f8d7da",
  },
  statusText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  actions: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  actionButton: {
    backgroundColor: "#007AFF",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
