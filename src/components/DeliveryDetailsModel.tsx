import React, { useState, memo } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { scale } from "../utils/dimen";
import Blackscooty from "../../assets/svg/Blackscooty";
import DriveThrough from "../../assets/svg/DriveThrough";
import PickUp from "../../assets/svg/PickUp";
import RuningTime from "../../assets/svg/RuningTime";
import AddLocationLogo from "../../assets/svg/AddLocationLogo";
import MiniPointer from "../../assets/svg/MiniPointer";

interface DeliveryDetailsModalProps {
  visible: boolean;
  onClose: () => void;
}

const COLORS = {
  primary: "#007A3D",
  textDark: "#2c2b2bff",
  textLight: "#676666ff",
  border: "#E0E0E0",
  background: "#fff",
  disabled: "#ccc",
};

const DeliveryDetailsModal: React.FC<DeliveryDetailsModalProps> = ({
  visible,
  onClose,
}) => {
  const [selectedTab, setSelectedTab] = useState<"door" | "drive" | "pickup">(
    "door"
  );

  // ✅ Default selection per tab
  const defaultSelections = {
    door: "Add a new location",
    drive: "drive-branch",
    pickup: "pickup-point",
  } as const;

  const [selectedAddress, setSelectedAddress] = useState<string>(
    defaultSelections.door
  );

  // ✅ Reset selected radio when tab changes
  const handleTabChange = (tab: "door" | "drive" | "pickup") => {
    setSelectedTab(tab);
    setSelectedAddress(defaultSelections[tab]);
  };

  const AddLocationRow = memo(
    ({ text, subtext }: { text: string; subtext: string }) => (
      <View style={styles.addLocationRow}>
        <View style={styles.addLocationLeft}>
          <AddLocationLogo width={scale(24)} height={scale(24)} />
          <View>
            <Text style={styles.addLocationText}>{text}</Text>
            <Text style={styles.addLocationSubtext}>{subtext}</Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => setSelectedAddress(text)}
          activeOpacity={0.7}
        >
          <View
            style={[
              styles.radioOuter,
              selectedAddress === text && styles.radioOuterActive,
            ]}
          >
            {selectedAddress === text && <View style={styles.radioInner} />}
          </View>
        </TouchableOpacity>
      </View>
    )
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      statusBarTranslucent
      presentationStyle="overFullScreen"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Delivery Details</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>

          {/* Tabs */}
          <View style={styles.tabContainer}>
            {[
              { key: "door", label: "Delivery", Icon: Blackscooty },
              { key: "drive", label: "Drive Through", Icon: DriveThrough },
              { key: "pickup", label: "Pickup", Icon: PickUp },
            ].map(({ key, label, Icon }) => (
              <TouchableOpacity
                key={key}
                style={[styles.tab, selectedTab === key && styles.tabActive]}
                onPress={() => handleTabChange(key as any)} // ✅ updated
              >
                <View style={styles.tabInner}>
                  <Icon
                    width={scale(22)}
                    height={scale(22)}
                    color={selectedTab === key ? COLORS.primary : "#888"}
                  />
                  <Text
                    numberOfLines={1}
                    style={[
                      styles.tabText,
                      selectedTab === key && styles.tabTextActive,
                    ]}
                  >
                    {label}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
          </View>

          {/* Content */}
          <ScrollView style={styles.content}>
            <Text style={styles.sectionTitle}>Choose Delivery Location</Text>

            {/* Door Delivery */}
            {selectedTab === "door" && (
              <>
                <AddLocationRow
                  text="Add a new location"
                  subtext="Choose location on the map"
                />
                <Text style={styles.deliveryTimeLabel}>
                  Choose Delivery Time
                </Text>
                <TouchableOpacity style={styles.deliverNowButton}>
                  <View style={styles.buttonRow}>
                    <RuningTime />
                    <Text style={styles.deliverNowText}>Deliver Now</Text>
                  </View>
                </TouchableOpacity>
              </>
            )}

            {/* Drive Through */}
            {selectedTab === "drive" && (
              <>
                <View style={styles.branchRow}>
                  <MiniPointer size={scale(26)} color={COLORS.primary} />
                  <View style={styles.branchDetails}>
                    <Text style={styles.pointerText}>FireGrill Drive-Thru</Text>
                    <Text style={styles.addressText}>
                      7791 Northern Ring Vr Rd, Almasiaf, Riyadh 12467,{"\n"}
                      Saudi Arabia
                    </Text>
                    <Text style={styles.timeText}>11:00 AM - 01:00 AM</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => setSelectedAddress("drive-branch")}
                    activeOpacity={0.7}
                  >
                    <View
                      style={[
                        styles.radioOuter,
                        selectedAddress === "drive-branch" &&
                          styles.radioOuterActive,
                      ]}
                    >
                      {selectedAddress === "drive-branch" && (
                        <View style={styles.radioInner} />
                      )}
                    </View>
                  </TouchableOpacity>
                </View>

                <AddLocationRow
                  text="Choose a different branch"
                  subtext="Choose location from the list"
                />
                <Text style={styles.deliveryTimeLabel}>Choose Pickup Time</Text>
                <TouchableOpacity style={styles.deliverNowButton}>
                  <View style={styles.buttonRow}>
                    <RuningTime />
                    <Text style={styles.deliverNowText}>Pickup Now</Text>
                  </View>
                </TouchableOpacity>
              </>
            )}

            {/* Self Pickup */}
            {selectedTab === "pickup" && (
              <>
                <View style={styles.branchRow}>
                  <MiniPointer size={scale(26)} color={COLORS.primary} />
                  <View style={styles.branchDetails}>
                    <Text style={styles.pointerText}>Al-Khobar</Text>
                    <Text style={styles.addressTextArabic}>
                      فؤاد سنتر ،، Prince Turkey Street, Al Khobar Al{"\n"}
                      Shamalia, Al Khobar 34414
                    </Text>
                    <Text style={styles.timeText}>11:00 AM - 01:00 AM</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => setSelectedAddress("pickup-point")}
                    activeOpacity={0.7}
                  >
                    <View
                      style={[
                        styles.radioOuter,
                        selectedAddress === "pickup-point" &&
                          styles.radioOuterActive,
                      ]}
                    >
                      {selectedAddress === "pickup-point" && (
                        <View style={styles.radioInner} />
                      )}
                    </View>
                  </TouchableOpacity>
                </View>

                <AddLocationRow
                  text="Choose a different branch"
                  subtext="Choose location from the list"
                />
                <Text style={styles.deliveryTimeLabel}>Choose Pickup Time</Text>
                <TouchableOpacity style={styles.deliverNowButton}>
                  <View style={styles.buttonRow}>
                    <RuningTime />
                    <Text style={styles.deliverNowText}>Pickup Now</Text>
                  </View>
                </TouchableOpacity>
              </>
            )}
          </ScrollView>

          {/* Confirm Button */}
          <View style={styles.footer}>
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityLabel="Confirm delivery details"
              style={[
                styles.confirmButton,
                !selectedAddress && styles.confirmDisabled,
              ]}
              disabled={!selectedAddress}
              onPress={onClose}
            >
              <Text style={styles.confirmText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DeliveryDetailsModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: "75%",
    overflow: "hidden",
    paddingBottom: scale(24),
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  headerTitle: {
    fontSize: 18,
    color: COLORS.textDark,
    fontFamily: "Rubik-SemiBold",
  },
  closeButton: { padding: 4 },
  closeButtonText: {
    fontSize: scale(16),
    fontFamily: "Rubik-SemiBold",
    color: COLORS.primary,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginVertical: 12,
    gap: scale(10),
  },
  dividerContainer: { paddingHorizontal: scale(16) },
  divider: {
    borderBottomWidth: 0.5,
    color: "#888",
    marginBottom: scale(16),
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: scale(12),
    paddingVertical: scale(14),
  },
  tabActive: { borderColor: COLORS.primary },
  tabInner: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: scale(10),
    gap: scale(6),
  },
  tabText: {
    color: "#888",
    fontSize: scale(14),
    fontFamily: "Poppins-Regular",
  },
  tabTextActive: { color: COLORS.primary },
  content: { paddingHorizontal: 16 },
  sectionTitle: {
    color: COLORS.textDark,
    fontWeight: "300",
    fontSize: scale(15),
    fontFamily: "Poppins-Regular",
  },
  deliveryTimeLabel: {
    marginTop: scale(10),
    color: COLORS.textDark,
    fontWeight: "600",
    fontSize: scale(16),
    fontFamily: "Rubik-Regular",
  },
  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: scale(10),
  },
  deliverNowButton: {
    width: "100%",
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 10,
    paddingVertical: 20,
    alignItems: "center",
    marginTop: 10,
  },
  deliverNowText: {
    color: COLORS.primary,
    fontFamily: "Rubik-Medium",
  },
  addLocationRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: scale(12),
    marginTop: scale(6),
  },
  addLocationLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(10),
  },
  addLocationText: {
    color: COLORS.textDark,
    fontWeight: "400",
    fontSize: scale(15),
    fontFamily: "Rubik-Regular",
  },
  addLocationSubtext: {
    color: COLORS.textLight,
    fontWeight: "400",
    fontSize: scale(12),
    fontFamily: "Rubik-Regular",
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  radioOuterActive: { borderColor: COLORS.primary },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },
  branchRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: scale(12),
  },
  branchDetails: {
    flex: 1,
    marginLeft: scale(10),
    justifyContent: "center",
  },
  pointerText: {
    color: COLORS.textDark,
    fontFamily: "Rubik-Regular",
    fontSize: scale(15),
  },
  addressText: {
    marginTop: scale(5),
    color: COLORS.textLight,
    fontSize: scale(12),
    fontFamily: "Rubik-Regular",
  },
  addressTextArabic: {
    marginTop: scale(5),
    color: COLORS.textLight,
    fontSize: scale(12),
    fontFamily: "Rubik-Regular",
    writingDirection: "ltr",
    textAlign: "left",
  },
  timeText: {
    marginTop: scale(5),
    color: COLORS.textLight,
    fontSize: scale(12),
    fontFamily: "Rubik-Regular",
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  confirmButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  confirmDisabled: { backgroundColor: COLORS.disabled },
  confirmText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Rubik-SemiBold",
  },
});
